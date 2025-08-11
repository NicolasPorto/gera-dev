import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  function formatarJSON() {
    try {
      const obj = JSON.parse(input);
      const jsonBonito = JSON.stringify(obj, null, 2);
      setOutput(jsonBonito);
      setError(false);
    } catch (e) {
      setError(true);
      setOutput("");
    }
  }

  const isButtonDisabled = input.trim() === "";

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-2xl mx-auto">
      <div className="w-full flex flex-col items-center gap-4">

        <button
          onClick={formatarJSON}
          disabled={isButtonDisabled}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isButtonDisabled
              ? "purple-white text-white cursor-not-allowed"
              : "purple-white hover:bg-purple-900 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          }`}
        >
          Formatar
        </button>

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder={"{}"}
          className={`w-full p-4 border-2 purple-white rounded-lg font-mono text-sm focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "text-default focus:text-default focus:text-default"
          }`}
          rows={8}
        ></textarea>

        {output && (
          <pre className="w-full mt-4 p-4 border background-default rounded-lg text-sm overflow-x-auto">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}