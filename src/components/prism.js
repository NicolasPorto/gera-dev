import { PrismLight } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp";
import coldarkDark from "react-syntax-highlighter/dist/esm/styles/prism/coldark-dark";
import coldarkCold from "react-syntax-highlighter/dist/esm/styles/prism/coldark-cold";

PrismLight.registerLanguage("json", json);
PrismLight.registerLanguage("markup", markup);
PrismLight.registerLanguage("xml", markup);
PrismLight.registerLanguage("html", markup);
PrismLight.registerLanguage("sql", sql);
PrismLight.registerLanguage("csharp", csharp);

export const SyntaxHighlighter = PrismLight;
export const coldarkLight = coldarkCold;
export { coldarkDark };
