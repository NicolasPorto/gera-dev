import { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { IconButton } from "../components/IconButton";
import { generatePassword, poolSize, strengthLevel } from "../utils/password";

const LEVELS = {
  1: { key: "MuitoFraca", color: "bg-red-500" },
  2: { key: "Fraca", color: "bg-red-400" },
  3: { key: "Media", color: "bg-yellow-500" },
  4: { key: "Boa", color: "bg-purple-500" },
  5: { key: "Forte", color: "bg-green-500" },
  6: { key: "MuitoForte", color: "bg-pink-600" },
};

function buildResult(options, length) {
  const password = generatePassword(options, length);
  if (password === null) return { password: "", error: true, level: 0 };
  return { password, error: false, level: strengthLevel(length, poolSize(options)) };
}

export default function PasswordGenerator() {
  const { t } = useTranslation();
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);
  const [hoverRefresh, setHoverRefresh] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [result, setResult] = useState(() => buildResult(options, length));

  useEffect(() => {
    setResult(buildResult(options, length));
  }, [options, length]);

  const regenerate = useCallback(() => {
    setResult(buildResult(options, length));
  }, [options, length]);

  const copyPassword = () => {
    if (result.error || !result.password) return;
    navigator.clipboard.writeText(result.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (option) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const { password, error, level } = result;
  const display = error ? t("SelecioneUmaOpcao") : password;
  const strength = level > 0 ? LEVELS[level] : null;

  return (
    <div className="p-4 flex flex-col items-center gap-6 w-full">
      <div className="flex gap-2">
        <IconButton label={t("Copiar")} onClick={copyPassword}>
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
        </IconButton>

        <IconButton
          label={t("Recarregar")}
          onClick={regenerate}
          onMouseEnter={() => setHoverRefresh(true)}
          onMouseLeave={() => setHoverRefresh(false)}
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
        </IconButton>
      </div>

      {display && (
        <p
          className={`text-center break-all ${error
            ? "generated-number-error text-1xl sm:text-1xl md:text-2xl lg:text-2xl"
            : "generated-number text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            }`}>
          {display}
        </p>
      )}

      <div className="w-full max-w-md">
        <input
          type="range"
          min="6"
          max="64"
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
          <span>64</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md items-center justify-center">
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer" htmlFor="uppercase">
            <div className="relative h-5 w-5">
              <input
                id="uppercase"
                type="checkbox"
                checked={options.uppercase}
                onChange={() => toggleOption("uppercase")}
                className="peer h-5 w-5 appearance-none rounded-md border border-purple-600 checked:bg-purple-600 cursor-pointer"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-default font-medium">{t("LetrasMaiusculas")}</span>
          </label>
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer" htmlFor="lowercase">
            <div className="relative h-5 w-5">
              <input
                id="lowercase"
                type="checkbox"
                checked={options.lowercase}
                onChange={() => toggleOption("lowercase")}
                className="peer h-5 w-5 appearance-none rounded-md border border-purple-600 checked:bg-purple-600 cursor-pointer"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-default font-medium">{t("LetrasMinusculas")}</span>
          </label>
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer" htmlFor="numbers">
            <div className="relative h-5 w-5">
              <input
                id="numbers"
                type="checkbox"
                checked={options.numbers}
                onChange={() => toggleOption("numbers")}
                className="peer h-5 w-5 appearance-none rounded-md border border-purple-600 checked:bg-purple-600 cursor-pointer"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-default font-medium">{t("Numeros")}</span>
          </label>
        </div>
        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer" htmlFor="symbols">
            <div className="relative h-5 w-5">
              <input
                id="symbols"
                type="checkbox"
                checked={options.symbols}
                onChange={() => toggleOption("symbols")}
                className="peer h-5 w-5 appearance-none rounded-md border border-purple-600 checked:bg-purple-600 cursor-pointer"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-default font-medium">{t("Simbolos")}</span>
          </label>
        </div>
      </div>

      <div className="w-full max-w-md mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-default text-sm">{t("ForcaSenha")}</span>
          <span className="text-default text-sm font-medium">
            {strength ? t(strength.key) : ""}
          </span>
        </div>
        <div className="w-full bg-gray-200/40 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${strength ? strength.color : ""}`}
            style={{ width: strength ? `${(level / 6) * 100}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
