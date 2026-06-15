import { SyntaxHighlighter, coldarkLight, coldarkDark } from "./prism";
import { useTheme } from "./UseTheme";

const BOX =
  "w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100";

const HIGHLIGHTABLE = new Set(["json", "xml", "markup", "sql", "csharp"]);

export function CodeOutput({ value, language }) {
  const theme = useTheme();
  const style = theme === "white" ? coldarkLight : coldarkDark;

  if (!language || !HIGHLIGHTABLE.has(language)) {
    return (
      <div className={BOX}>
        <pre className="m-0 p-3 whitespace-pre-wrap break-all">{value}</pre>
      </div>
    );
  }

  return (
    <div className={BOX}>
      <SyntaxHighlighter
        language={language}
        style={style}
        customStyle={{
          background: "transparent",
          padding: "0.6rem",
          margin: 0,
          fontSize: "0.775rem",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap",
        }}
        codeTagProps={{
          style: {
            fontFamily: "monospace",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
          },
        }}
        wrapLongLines={true}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
