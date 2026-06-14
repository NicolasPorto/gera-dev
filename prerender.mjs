import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { TOOL_PATHS, PAGE_PATHS } from "./src/config/toolPaths.js";

const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
  url: "http://localhost/",
});
globalThis.document = dom.window.document;
globalThis.localStorage = dom.window.localStorage;

const { render } = await import("./dist-ssr/entry-server.js");

const template = fs.readFileSync("dist/index.html", "utf8");
const logicalRoutes = [
  "/",
  ...Object.values(TOOL_PATHS),
  ...Object.values(PAGE_PATHS),
];
const enUrl = (p) => (p === "/" ? "/en" : `/en${p}`);

function injectHead(html, helmet) {
  const head = (
    helmet.title.toString() +
    helmet.meta.toString() +
    helmet.link.toString() +
    helmet.script.toString()
  ).replace(/hrefLang=/g, "hreflang="); // Helmet emite hrefLang no SSR; normaliza
  return html
    .replace(/<html[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`)
    .replace("</head>", `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${helmet.appHtml}</div>`);
}

let count = 0;
for (const lp of logicalRoutes) {
  for (const locale of ["pt", "en"]) {
    const url = locale === "en" ? enUrl(lp) : lp;
    const { html, helmet } = await render(url, locale);
    helmet.appHtml = html;
    const page = injectHead(template, helmet);

    const outPath = url === "/" ? "dist/index.html" : `dist${url}/index.html`;
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, page);
    count++;
  }
}

// Limpa o bundle SSR temporário
fs.rmSync("dist-ssr", { recursive: true, force: true });

console.log(`Prerender: ${count} rotas geradas.`);
