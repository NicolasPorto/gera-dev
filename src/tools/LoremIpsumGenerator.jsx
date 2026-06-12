import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy } from "lucide-react";
import { IconButton } from "../components/IconButton";
import { useCopy } from "../hooks/useCopy";

const WORDS =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(
    " ",
  );

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = () => WORDS[rand(0, WORDS.length - 1)];

function makeSentence() {
  const len = rand(6, 14);
  const words = Array.from({ length: len }, pick);
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function makeParagraph() {
  return Array.from({ length: rand(3, 6) }, makeSentence).join(" ");
}

function generate(kind, count) {
  if (kind === "words") return Array.from({ length: count }, pick).join(" ");
  if (kind === "sentences")
    return Array.from({ length: count }, makeSentence).join(" ");
  return Array.from({ length: count }, makeParagraph).join("\n\n");
}

export default function LoremIpsumGenerator() {
  const { t } = useTranslation();
  const { copy } = useCopy();
  const [kind, setKind] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(() => generate("paragraphs", 3));

  const run = (k = kind, c = count) => setOutput(generate(k, c));

  const kinds = [
    { id: "paragraphs", label: t("Paragrafos") },
    { id: "sentences", label: t("Sentencas") },
    { id: "words", label: t("Palavras") },
  ];

  return (
    <div className="p-4 w-full max-w-2xl flex flex-col items-center gap-6">
      <div className="info-card">
        <p className="info-text">📝 {t("InfoLorem")}</p>
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-3">
        <div className="flex gap-2">
          {kinds.map((k) => (
            <button
              key={k.id}
              onClick={() => {
                setKind(k.id);
                run(k.id, count);
              }}
              className={`px-3 py-1 rounded-lg font-medium ${
                kind === k.id
                  ? "default-button"
                  : "default-button-transparent border border-purple-600"
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-default opacity-70">
            {t("Quantidade")}
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => {
              const c = Math.min(50, Math.max(1, Number(e.target.value) || 1));
              setCount(c);
              run(kind, c);
            }}
            className="w-20 p-2 rounded-lg font-mono textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none focus:border-purple-400"
          />
        </div>

        <IconButton
          label={t("Gerar")}
          showLabel
          onClick={() => run()}
          className="px-4 py-2 rounded-lg font-medium"
        />
        <IconButton
          label={t("Copiar")}
          onClick={() => copy(output, t("Copiado"))}
          className="px-4 py-2 rounded-lg"
        >
          <Copy size={18} />
        </IconButton>
      </div>

      <textarea
        readOnly
        value={output}
        className="w-full h-72 p-4 rounded-lg font-sans text-sm leading-relaxed resize-none textarea-text-color textarea-white-theme bg-purple-200/10 border border-gray-300/20 text-default focus:outline-none custom-scrollbar whitespace-pre-wrap"
      />
    </div>
  );
}
