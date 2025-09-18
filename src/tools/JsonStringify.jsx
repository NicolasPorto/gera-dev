import { useState } from "react";
import { useTheme } from "../components/UseTheme"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';

export default function JsonStringify() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState(false);
    const [outputOn, setOutputOn] = useState(false);
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState("auto");
    const { t } = useTranslation();

    const theme = useTheme();

    function process() {
        try {
            let detectedMode = mode;

            if (mode === "auto") {
                detectedMode = detectAutoMode(input);
            }

            if (detectedMode === "format") {
                let processedInput = input.trim();
                if (processedInput.startsWith('"') && processedInput.endsWith('"')) {
                    processedInput = JSON.parse(processedInput);
                }

                const parsed = JSON.parse(processedInput);
                const jsonPretty = JSON.stringify(parsed, null, 2);
                setOutput(jsonPretty);
            } else {
                const parsed = JSON.parse(input);
                const jsonString = JSON.stringify(parsed);
                setOutput(JSON.stringify(jsonString));
            }
            setOutputOn(true);
            setError(false);
        } catch (e) {
            setError(true);
            setOutputOn(false);
            setOutput("");
        }
    }

    function detectAutoMode(text) {
        const trimmed = text.trim();

        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
            return "format";
        }

        if ((trimmed.startsWith('[') && trimmed.endsWith(']')) ||
            (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
            return "stringify";
        }

        return "format";
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setInput(value);

        if (!outputOn && value.trim().length > 0) {
            const detectedMode = detectAutoMode(value);
            setMode("auto");
        }

        setError(false);
    }

    function handleNew() {
        setOutputOn(false);
        setOutput("");
        setInput("");
        setError(false);
    }

    function handleCopy() {
        let textToCopy = output;
        if (mode === "stringify" && output.startsWith('"') && output.endsWith('"')) {
            textToCopy = JSON.parse(output);
        }

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    function setManualMode(newMode) {
        setMode(newMode);
        setOutputOn(false);
        setOutput("");
        setError(false);
    }

    const isButtonDisabled = input.trim() === "";

    const getSyntaxStyle = () => {
        return theme === 'white' ? prismStyles.coldarkLight : prismStyles.coldarkDark;
    };

    const modeDetected = detectAutoMode(input);
    const displayMode = mode === "auto" ? modeDetected : mode;
    const placeholderFormat = String.raw`"{\"name\":\"John\",\"age\":30}"`;
    const placeholderStringify = '{\n  "name": "John",\n  "age": 30\n}';
    const placeholderKeyValue = String.raw`"{\"chave\":\"valor"}"`;

    function getMessage() {
        if (mode === "auto")
            return t("AutoStringify")

        if (displayMode === "format")
            return `${t("StringifyFormatUm")} ${placeholderKeyValue}${t("StringifyFormatDois")}`

        if (displayMode === "stringify")
            return t("Stringify")
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
            <div className="w-full flex flex-col items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center justify-center w-full mb-1 gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setManualMode("stringify")}
                                className={`px-3 py-1 rounded-lg font-medium ${mode === "stringify" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                            >
                                Stringify
                            </button>
                            <button
                                onClick={() => setManualMode("format")}
                                className={`px-3 py-1 rounded-lg font-medium ${mode === "format" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                            >
                                Decode Stringify
                            </button>
                            <button
                                onClick={() => setManualMode("auto")}
                                className={`px-3 py-1 rounded-lg font-medium ${mode === "auto" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                            >
                                Auto
                            </button>
                        </div>
                    </div>
                </div>

                <div className="info-card w-full">
                    <p className="info-text">
                        {`💡 ${getMessage()}`}
                    </p>
                </div>

                {!outputOn && (
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder={displayMode === "format" ? placeholderFormat : placeholderStringify}
                        className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme ${error
                            ? "border-red-500 bg-purple-200/10 focus:border-red-600"
                            : "border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                            }`}
                        rows={12}
                    ></textarea>
                )}

                {outputOn && (
                    <>
                        <div className="w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-sm overflow-y-auto resize-none whitespace-pre-wrap break-all custom-scrollbar textarea-white-theme h-100">
                            <SyntaxHighlighter
                                language="json"
                                style={getSyntaxStyle()}
                                customStyle={{
                                    background: 'transparent',
                                    padding: '0.6rem',
                                    margin: 0,
                                    fontSize: '0.775rem'
                                }}
                                codeTagProps={{
                                    style: {
                                        fontFamily: 'monospace'
                                    }
                                }}
                            >
                                {output}
                            </SyntaxHighlighter>
                        </div>
                    </>
                )}

                <div className="p-4 flex flex-col items-center gap-6">
                    <div className="flex gap-4 flex-wrap justify-center">
                        {!outputOn && (
                            <div className="relative group">
                                <button
                                    onClick={process}
                                    disabled={isButtonDisabled}
                                    className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                                        ? "default-button-inactive opacity-50 cursor-not-allowed"
                                        : "default-button-active hover:scale-105 transition-transform"
                                        }`}
                                >
                                    {displayMode === "format" ?
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.83892 12.4543s1.24988-3.08822-.21626-5.29004C8.15656 4.96245 4.58671 4.10885 4.39794 4.2436c-.18877.13476-1.11807 3.32546.34803 5.52727 1.4661 2.20183 5.09295 2.68343 5.09295 2.68343Zm0 0C10.3389 13.4543 12 15 12 18v2c0-2-.4304-3.4188 2.0696-5.9188m0 0s-.4894-2.7888 1.1206-4.35788c1.6101-1.56907 4.4903-1.54682 4.6701-1.28428.1798.26254.4317 2.84376-1.0809 4.31786-1.61 1.5691-4.7098 1.3243-4.7098 1.3243Z" />
                                        </svg>
                                        :
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M10.9715 12.2168c-.0118.0406-.0234.0795-.0347.1166.0391.0574.0819.1192.1278.1855.3277.473.812 1.172 1.2141 2.0892.2147-.2864.4616-.5799.7447-.8832l-.0024-.0317c-.0236-.3254-.0361-.7783.0091-1.2905.0882-.9978.4095-2.3695 1.4623-3.39555 1.0079-.98229 2.3556-1.42385 3.4044-1.59916.5344-.08932 1.0323-.11665 1.4296-.09869.1954.00883.3932.02974.5707.07034.0872.01996.1979.05097.3114.10232.0867.03927.3102.14854.4769.39195.1453.21217.1993.45929.22.55586.0321.14963.0559.32134.0712.50398.0307.36676.0311.82807-.0291 1.32915-.1181.9828-.4871 2.2522-1.47 3.2102-1.0357 1.0093-2.4736 1.3803-3.5197 1.5249-.542.0749-1.0253.0952-1.3736.0969-.036.0002-.0706.0002-.1037 0-.931.9987-1.2688 1.7317-1.4072 2.3512-.0345.1545-.0581.303-.0739.451.0004.0342.0006.0685.0006.1029v2c0 .5523-.4477 1-1 1s-1-.4477-1-1c0-.1991-.0064-.4114-.0131-.6334-.0142-.4713-.0298-.9868.0117-1.5138-.0358-1.8786-.7555-2.9405-1.40123-3.8932-.13809-.2037-.2728-.4025-.39671-.6032-.05186-.0105-.10709-.0222-.16538-.035-.39471-.0865-.93803-.2268-1.53416-.4432-1.15636-.4197-2.67587-1.1841-3.58743-2.5531-.90552-1.35993-1.03979-2.96316-.96002-4.15955.04066-.60984.13916-1.15131.24451-1.56046.05234-.20327.10977-.38715.16845-.53804.02865-.07367.06419-.15663.10713-.23658.02132-.03968.0522-.09319.0933-.15021.03213-.04456.11389-.15344.24994-.25057.18341-.13093.36351-.16755.42749-.17932.0854-.01572.16019-.01941.21059-.02024.1023-.0017.20235.00733.28493.0176.17089.02126.37298.06155.58906.11526.43651.1085.99747.2886 1.59668.54576 1.16944.50188 2.63819 1.3629 3.52935 2.70126.9248 1.38891.9601 2.99601.818 4.14739-.0726.589-.1962 1.0975-.3016 1.4594Z" />
                                        </svg>

                                    }
                                </button>

                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    {displayMode === "format" ? "Decode" : "Stringify"}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </div>
                        )}

                        {outputOn && (
                            <>
                                <div className="relative group">
                                    <button
                                        onClick={() => {
                                            handleCopy();
                                        }}
                                        disabled={isButtonDisabled}
                                        className={`px-8 py-3 rounded-lg font-medium default-button ${isButtonDisabled
                                            ? "default-button-inactive opacity-50 cursor-not-allowed"
                                            : "default-button-active hover:scale-105 transition-transform"
                                            }`}
                                    >
                                        {copied ? (
                                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>

                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        {copied ? t("Copiado") : t("Copiar")}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <button
                                        onClick={() => {
                                            setOutputOn(false);
                                        }}
                                        className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
                                    >
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.020.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        {t("Editar")}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <button
                                        onClick={handleNew}
                                        className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
                                    >
                                        <i className="fa-solid fa-eraser fa-lg"></i>
                                    </button>

                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        {t("Limpar")}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}