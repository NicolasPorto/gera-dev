export function classToJson(input) {
    const rootMatch = /public\s+class\s+(\w+)/.exec(input);
    const rootClassName = rootMatch ? rootMatch[1] : undefined;

    const text = String(input || "");

    const enums = {};
    const enumRegex = /(?:public\s+)?enum\s+(\w+)\s*{([\s\S]*?)}/g;
    let enumMatch;
    while ((enumMatch = enumRegex.exec(text)) !== null) {
        const name = enumMatch[1];
        const raw = enumMatch[2];
        const values = raw
            .split(',')
            .map(s => s.trim())
            .filter(Boolean)
            .map(s => s.split('=')[0].trim());
        if (values.length) enums[name] = values;
    }

    const classes = {};
    const classHeaderRegex = /\b(?:public|internal|protected|private|sealed|partial|abstract|static)?\s*class\s+(\w+)/g;
    let headerMatch;
    while ((headerMatch = classHeaderRegex.exec(text)) !== null) {
        const className = headerMatch[1];
        const openIndex = text.indexOf('{', headerMatch.index);
        if (openIndex === -1) continue;
        let i = openIndex + 1;
        let depth = 1;
        while (i < text.length && depth > 0) {
            if (text[i] === '{') depth++;
            else if (text[i] === '}') depth--;
            i++;
        }
        const body = text.slice(openIndex + 1, i - 1);

        const cleaned = body
            .replace(/\[[^\]]*\]\s*/g, '')
            .replace(/\/\/.*$/mg, '')
            .replace(/\/\*[\s\S]*?\*\//g, '');

        const props = {};
        const propRegex = /(?:public|private|protected|internal)\s+(?:static\s+)?([\w<>\[\]\.?,\s]+?)\s+(\w+)\s*\{[\s\S]*?\}/g;
        let propMatch;
        while ((propMatch = propRegex.exec(cleaned)) !== null) {
            let type = propMatch[1].trim();
            const propName = propMatch[2].trim();
            type = type
                .replace(/\s*<\s*/g, '<')
                .replace(/\s*>\s*/g, '>')
                .replace(/\s*,\s*/g, ',')
                .replace(/\s+/g, ' ')
                .trim();
            type = type.replace(/=\s*[^\s]+$/, '').trim();
            props[propName] = type;
        }

        classes[className] = props;
    }

    function shortType(t) {
        return (t || '').split('.').pop();
    }

    function sampleValue(type, visited = new Set()) {
        if (!type) return null;
        let t = type.replace(/\s+/g, '');
        t = t.replace(/\?$/, '');

        const arrayMatch = t.match(/^(.*)\[\]$/);
        if (arrayMatch) return [sampleValue(arrayMatch[1], visited)];

        const dictMatch = t.match(/^(?:System\.)?(?:Collections\.Generic\.)?(?:Dictionary|IDictionary)<([^,>]+),([^>]+)>$/i);
        if (dictMatch) {
            const valueType = dictMatch[2].trim();
            return { "key": sampleValue(valueType, visited) };
        }

        const listMatch = t.match(/^(?:System\.)?(?:Collections\.Generic\.)?(?:List|IEnumerable|ICollection|IList|HashSet)<(.+)>$/i);
        if (listMatch) return [sampleValue(listMatch[1].trim(), visited)];

        const nullableMatch = t.match(/^Nullable<(.+)>$/i);
        if (nullableMatch) return sampleValue(nullableMatch[1], visited);

        const tShort = shortType(t);

        if (enums[tShort] && enums[tShort].length) return enums[tShort][0];

        const lower = tShort.toLowerCase();
        if (['string'].includes(lower)) return 'example';
        if (['int', 'long', 'short', 'byte', 'sbyte', 'uint', 'ulong', 'ushort'].includes(lower)) return 0;
        if (['double', 'float', 'decimal'].includes(lower)) return 0.0;
        if (['bool', 'boolean'].includes(lower)) return false;
        if (['datetime', 'datetimeoffset'].includes(lower)) return new Date().toISOString();
        if (lower === 'guid') return '00000000-0000-0000-0000-000000000000';

        if (classes[tShort]) return generateJson(tShort, visited);
        const nonGeneric = t.split('<')[0];
        if (classes[nonGeneric]) return generateJson(nonGeneric, visited);

        return 'example';
    }

    function generateJson(className, visited = new Set()) {
        if (!classes[className]) return {};
        if (visited.has(className)) return {};
        visited.add(className);
        const out = {};
        const props = classes[className];
        for (const [propName, type] of Object.entries(props)) {
            const key = propName.charAt(0).toLowerCase() + propName.slice(1);
            out[key] = sampleValue(type, visited);
        }
        visited.delete(className);
        return out;
    }

    let root = rootClassName;
    if (!root) {
        const keys = Object.keys(classes);
        root = keys.length ? keys[0] : null;
    }
    if (!root) return {};
    root = shortType(root);
    return generateJson(root);
}

export function jsonToCSharpTop(parsed, rootName = "Root") {
    const classes = {};
    let usesList = false;

    function uniqueClassName(base) {
        let name = base;
        let i = 1;
        while (classes[name]) {
            name = `${base}${i}`;
            i++;
        }
        return name;
    }

    function primitiveTypeFromValue(value) {
        if (typeof value === 'number') {
            return Number.isInteger(value) ? 'int' : 'double';
        }
        if (typeof value === 'boolean') return 'bool';
        return 'string';
    }

    function singularize(word) {
        if (!word) return 'Item';
        const w = word.toString();
        if (/ies$/i.test(w)) return capitalize(w.replace(/ies$/i, 'y'));
        if (/ses$/i.test(w)) return capitalize(w.replace(/ses$/i, 'se'));
        if (/s$/i.test(w) && !/ss$/i.test(w)) return capitalize(w.replace(/s$/i, ''));
        return capitalize(w + 'Item');
    }

    function capitalize(str) {
        if (!str || typeof str !== 'string') return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function gen(obj, className) {
        if (classes[className]) return;

        const props = [];

        for (const key in obj) {
            const value = obj[key];
            const propName = capitalize(key);
            let type = 'string';

            if (Array.isArray(value)) {
                usesList = true;
                const first = value.find(v => v !== null && v !== undefined);

                if (first === undefined) {
                    type = 'List<string>';

                } else if (Array.isArray(first)) {
                    type = 'List<List<string>>';

                } else if (typeof first === 'object') {
                    const candidate = singularize(key);
                    const uniq = uniqueClassName(candidate);
                    gen(first, uniq);
                    type = `List<${uniq}>`;

                } else {
                    const prim = primitiveTypeFromValue(first);
                    type = `List<${prim}>`;
                }
            } else if (typeof value === 'object' && value !== null) {
                const candidate = capitalize(key);
                const uniq = uniqueClassName(candidate);
                gen(value, uniq);
                type = uniq;
            } else {
                type = primitiveTypeFromValue(value);
            }

            props.push(`    public ${type} ${propName} { get; set; }`);
        }

        classes[className] = `public class ${className}\n{\n${props.join('\n')}\n}`;
    }

    if (Array.isArray(parsed)) {
        const first = parsed.find(v => v !== null && v !== undefined) || {};
        const itemClassName = uniqueClassName(singularize(rootName));
        gen(first, itemClassName);
        usesList = true;
        classes[rootName] = `public class ${rootName}\n{\n    public List<${itemClassName}> Items { get; set; }\n}`;
    } else {
        gen(parsed, rootName);
    }

    const ordered = [];
    if (classes[rootName]) ordered.push(classes[rootName]);
    for (const k in classes) {
        if (k === rootName) continue;
        ordered.push(classes[k]);
    }

    const usingLine = usesList ? 'using System.Collections.Generic;\n\n' : '';
    return usingLine + ordered.join('\n\n');
}
