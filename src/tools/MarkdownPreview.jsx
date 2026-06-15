import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import { useToolState } from "../hooks/useToolState";
import { ShareButton } from "../components/ShareButton";

const SAMPLE = `# Título

Texto com **negrito**, *itálico* e [link](https://geradev.com.br).

- item 1
- item 2

\`\`\`js
const x = 1;
\`\`\`
`;

export default function MarkdownPreview() {
  const { t } = useTranslation();
  const [md, setMd, getShareUrl] = useToolState("markdown", SAMPLE, {
    shareParam: "s",
  });

  const html = useMemo(() => {
    const raw = marked.parse(md, { breaks: true, gfm: true });
    return DOMPurify.sanitize(typeof raw === "string" ? raw : "");
  }, [md]);

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-5xl mx-auto gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium text-default opacity-80 mb-1">
            Markdown
          </label>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            spellCheck={false}
            className="custom-scrollbar w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none border-gray-300/20 bg-purple-200/10 focus:border-purple-400 textarea-text-color textarea-white-theme h-[28rem]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-default opacity-80 mb-1">
            {t("Preview")}
          </label>
          <div
            className="markdown-body custom-scrollbar w-full p-4 border-2 rounded-lg border-gray-300/20 bg-purple-200/10 text-default overflow-y-auto h-[28rem]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
      <ShareButton getUrl={getShareUrl} />
    </div>
  );
}
