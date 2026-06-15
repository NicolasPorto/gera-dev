import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { diffLines } from "../utils/lineDiff";
import { useToolState } from "../hooks/useToolState";
import { ShareButton } from "../components/ShareButton";

const enc = (s) => btoa(unescape(encodeURIComponent(s)));

const ROW = {
  add: "bg-green-500/15 text-default",
  remove: "bg-red-500/15 text-default",
  equal: "text-default opacity-70",
};
const SIGN = { add: "+", remove: "−", equal: " " };

export default function DiffTool() {
  const { t } = useTranslation();
  const [left, setLeft] = useToolState("diff:a", "", { shareParam: "a" });
  const [right, setRight] = useToolState("diff:b", "", { shareParam: "b" });

  const diff = useMemo(() => diffLines(left, right), [left, right]);
  const added = diff.filter((d) => d.type === "add").length;
  const removed = diff.filter((d) => d.type === "remove").length;
  const hasInput = left !== "" || right !== "";

  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    if (left) url.searchParams.set("a", enc(left));
    else url.searchParams.delete("a");
    if (right) url.searchParams.set("b", enc(right));
    else url.searchParams.delete("b");
    return url.toString();
  };

  const pane = (label, value, setValue) => (
    <div className="w-full">
      <label className="block text-sm font-medium text-default opacity-80 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
        className="custom-scrollbar w-full p-3 border-2 rounded-lg font-mono text-sm focus:outline-none resize-none border-gray-300/20 bg-purple-200/10 focus:border-purple-400 textarea-text-color textarea-white-theme h-56"
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-4xl mx-auto gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {pane(t("TextoOriginal"), left, setLeft)}
        {pane(t("TextoModificado"), right, setRight)}
      </div>

      {hasInput && (
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-default opacity-80">
              <span className="text-green-400">+{added}</span>{" "}
              <span className="text-red-400">−{removed}</span>
            </span>
            <ShareButton
              getUrl={getShareUrl}
              className="px-4 py-1.5 rounded-lg text-sm font-medium default-button-active"
            />
          </div>
          <div className="custom-scrollbar w-full border-2 rounded-lg border-gray-300/20 bg-purple-200/10 font-mono text-xs overflow-auto textarea-white-theme max-h-96">
            {added + removed === 0 ? (
              <p className="p-3 opacity-50">{t("SemDiferencas")}</p>
            ) : (
              diff.map((line, i) => (
                <div
                  key={i}
                  className={`px-3 py-0.5 whitespace-pre-wrap break-all ${ROW[line.type]}`}
                >
                  <span className="opacity-50 select-none mr-2">
                    {SIGN[line.type]}
                  </span>
                  {line.value || " "}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
