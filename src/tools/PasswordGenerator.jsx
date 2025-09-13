import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [hoverRefresh, setHoverRefresh] = useState(false);
    const { t } = useTranslation();
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });

    const [generatedOptions, setGeneratedOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });

    const generatePassword = () => {
        setError(false);
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let allowedChars = "";
        if (options.uppercase) allowedChars += uppercaseChars;
        if (options.lowercase) allowedChars += lowercaseChars;
        if (options.numbers) allowedChars += numberChars;
        if (options.symbols) allowedChars += symbolChars;

        setGeneratedOptions({
            uppercase: options.uppercase,
            lowercase: options.lowercase,
            numbers: options.numbers,
            symbols: options.symbols
        })

        if (allowedChars.length === 0) {
            setPassword(t("SelecioneUmaOpcao"));
            setError(true);
            return;
        }

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            newPassword += allowedChars[randomIndex];
        }

        setPassword(newPassword);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const toggleOption = (option) => {
        setOptions({
            ...options,
            [option]: !options[option]
        });
    };

    const sortPassword = () => {
        const { uppercase, lowercase, numbers, symbols } = generatedOptions;
        const length = password.length;

        const characterTypes = [uppercase, lowercase, numbers, symbols].filter(Boolean).length;

        const isObviousSequence = /(123+|abc+|qwert+|asdf+)/i.test(password);
        const isRepetition = /(.)\1{3,}/.test(password);
        if (length < 8 || characterTypes === 1) {
            return t("Fraca");
        }

        if (isObviousSequence || isRepetition) {
            return t("MuitoFraca");
        }

        if (length >= 8 && length <= 11 && characterTypes === 2) {
            return t("Media");
        }

        if ((length >= 12 && length <= 15 && characterTypes >= 2) ||
            (length >= 8 && length <= 11 && characterTypes >= 3)) {
            return t("Boa");
        }

        if (length >= 16 && length <= 20 && characterTypes >= 3) {
            return t("Forte");
        }

        if ((length >= 20 && characterTypes === 4) ||
            (length >= 16 && characterTypes >= 3 && symbols && numbers)) {
            return t("MuitoForte");
        }

        return t("Erro");
    };

    useEffect(() => {
        generatePassword();
    }, []);

    return (
        <div className="p-4 flex flex-col items-center gap-6 w-full">
            <div className="flex gap-2">
                <div className="relative group">
                    <button
                        onClick={copyPassword}
                        className={`default-button px-4 py-2 rounded flex items-center justify-center`}
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
                        {t("Copiar")}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>

                <div className="relative group">
                    <button
                        onClick={generatePassword}
                        onMouseEnter={() => setHoverRefresh(true)}
                        onMouseLeave={() => setHoverRefresh(false)}
                        className={`default-button px-4 py-2 rounded`}
                    >
                        <svg
                            className={`w-6 h-6 ${hoverRefresh ? 'animate-spin' : ''}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {t("Recarregar")}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            </div>
            {password && (
                <p
                    className={` text-center ${error
                        ? "generated-number-error text-1xl sm:text-1xl md:text-2xl lg:text-2xl"
                        : "generated-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                        }`}>
                    {password}
                </p>
            )}

            <div className="w-full max-w-md">

                <input
                    type="range"
                    min="6"
                    max="30"
                    id="large-range"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-purple-600"
                />
                <div className="flex justify-between text-default text-sm mt-1">
                    <span>6</span>
                    <label className="block text-default mb-2">
                        {t("Comprimento")}: {length}
                    </label>
                    <span>30</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className=" flex items-center">
                    <label className="w-full relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="uppercase">
                        <input
                            id="uppercase"
                            type="checkbox"
                            checked={options.uppercase}
                            onChange={() => toggleOption("uppercase")}
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-purple-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-600 checked:bg-purple-600 hover:before:opacity-10"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/11 -translate-y-2/4 -translate-x-2/3 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <span className="ml-3 text-default font-medium">
                            {t("LetrasMaiusculas")}
                        </span>
                    </label>
                </div>
                <div className="flex items-center">
                    <label className="w-full relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="lowercase">
                        <input
                            id="lowercase"
                            type="checkbox"
                            checked={options.lowercase}
                            onChange={() => toggleOption("lowercase")}
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-purple-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-600 checked:bg-purple-600 hover:before:opacity-10"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/11 -translate-y-2/4 -translate-x-2/3 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <span className="ml-3 text-default font-medium">
                            {t("LetrasMinusculas")}
                        </span>
                    </label>
                </div>
                <div className="flex items-center">
                    <label className="w-full relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="numbers">
                        <input
                            id="numbers"
                            type="checkbox"
                            checked={options.numbers}
                            onChange={() => toggleOption("numbers")}
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-purple-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-600 checked:bg-purple-600 hover:before:opacity-10"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/11 -translate-y-2/4 -translate-x-2/3 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <span className="ml-3 text-default font-medium">
                            {t("Numeros")}
                        </span>
                    </label>
                </div>
                <div className="flex items-center">
                    <label className="w-full relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="symbols">
                        <input
                            id="symbols"
                            type="checkbox"
                            checked={options.symbols}
                            onChange={() => toggleOption("symbols")}
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-purple-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-600 checked:bg-purple-600 hover:before:opacity-10"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-1/11 -translate-y-2/4 -translate-x-2/3 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <span className="ml-3 text-default font-medium">
                            {t("Simbolos")}
                        </span>
                    </label>
                </div>
            </div>

            <div className="w-full max-w-md mt-2">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-default text-sm">{t("ForcaSenha")}</span>
                    <span className="text-default text-sm font-medium">
                        {sortPassword()}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${sortPassword() === t("MuitoForte") ? "bg-pink-600 w-full" : sortPassword() === t("Forte") ? "bg-green-500 w-full" :
                            sortPassword() === t("Boa") ? "bg-purple-500 w-3/4" :
                                sortPassword() === t("Média") ? "bg-yellow-500 w-2/4" :
                                    sortPassword() === t("Fraca") ? "bg-red-400 w-1/4" :
                                        sortPassword() === t("MuitoFraca") ? "bg-red-500 w-1/4" : ""
                            }`}
                    ></div>
                </div>
            </div>
        </div>
    );
}