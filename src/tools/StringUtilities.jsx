import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "../components/UseTheme"
import { format } from 'sql-formatter';
import { useTranslation } from 'react-i18next';

export default function SQLFormatter() {
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);
    const { t } = useTranslation();

    const theme = useTheme();

    function shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    function handleShuffleString() {
        let wordsList = input.split(" ");

        for (let i = 0; wordsList.length > i; i++) {
            let newWord = wordsList[i].toLowerCase().split('');
            shuffle(newWord)
            wordsList[i] = newWord.join('');
        }

        setInput(wordsList.join(" "));
    }

    function handleFirstWordLetterUpper() {
        let wordsList = input.split(" ");
        console.log(wordsList);

        for (let i = 0; wordsList.length > i; i++) {
            let newWord = wordsList[i].toLowerCase().split('');
            newWord[0] = newWord[0].toUpperCase();
            
            console.log(newWord);
            wordsList[i] = newWord.join('');
        }

        wordsList.forEach((x) => {

        });
        console.log(wordsList);
        setInput(wordsList.join(" "));
    }

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleCopy() {
        navigator.clipboard.writeText(input);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }


    return (
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-3xl mx-auto">
            <div className="w-full flex flex-col items-center gap-6">
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="SOU UMA STRING MASSA! | sou uma string massa! | Sou Uma String Massa!"
                    className={`custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none transition-all duration-300 ease-in-out h-100 textarea-text-color textarea-white-theme border-gray-300/20 bg-purple-200/10 focus:border-purple-400`}
                    rows={12}
                ></textarea>

                <div className="p-4 flex flex-col items-center gap-6">
                    <div className="flex gap-4 flex-wrap justify-center">
                        
                        <div className="relative group">
                            <button
                                onClick={() => setInput(input.toLowerCase())}
                                className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                            >
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                                    </svg>
                                </i>
                            </button>

                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {t("Letras Minúsculas")}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                onClick={() => setInput(input.toUpperCase())}
                                className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                            >
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
                                    </svg>
                                </i>
                            </button>

                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {t("Letras Maiúsculas")}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                onClick={handleFirstWordLetterUpper}
                                className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                            >
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </i>
                            </button>

                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {t("Primeira Letra Maíuscula")}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                onClick={handleShuffleString}
                                className={`px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform`}
                            >
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                    </svg>
                                </i>
                            </button>

                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {t("Embaralhar Palavra")}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                onClick={handleCopy}
                                className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
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
                    </div>
                </div>
            </div>
        </div>
    );
}