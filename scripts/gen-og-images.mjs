// Gera public/og/<locale>/<id>.png (1200x630) para cada ferramenta: é a
// imagem que aparece ao compartilhar o link no WhatsApp, LinkedIn, X etc.
//
// Rode localmente com `npm run gen:og` sempre que adicionar/renomear uma
// ferramenta e faça commit dos PNGs (o build da Vercel não tem as fontes do
// sistema, então as imagens não são geradas lá).

import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Resvg } from "@resvg/resvg-js";

const OUT = path.resolve("public/og");

// O registro importa componentes lazy; o vite resolve isso sem executar nada.
const vite = await createServer({
  configFile: false,
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});

const { TOOLS, CATEGORIES } = await vite.ssrLoadModule("/src/config/tools.js");
const { resources } = await vite.ssrLoadModule("/src/i18n.js");
await vite.close();

const escapeXml = (s) =>
  String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]);

/** Quebra o texto em linhas de até `max` caracteres (sem cortar palavras). */
function wrap(text, max, maxLines) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if ((line + " " + word).trim().length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + " " + word).trim();
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…";
  }
  return lines;
}

function iconSvg(Icon) {
  return renderToStaticMarkup(
    createElement(Icon, { size: 72, color: "#ffffff", strokeWidth: 1.75 }),
  );
}

// Cores chapadas (sem gradiente) para o PNG comprimir bem (~30 KB cada).
function ogSvg({ title, description, category, Icon, domain }) {
  const long = title.length > 22;
  const titleSize = long ? 64 : 76;
  const titleLines = wrap(title, long ? 28 : 22, 2);
  const descLines = wrap(description, 54, 2);
  const titleY = 385;
  const descY = titleY + (titleLines.length - 1) * (titleSize + 6) + 62;
  const font = `font-family="Segoe UI, Arial, sans-serif"`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1e003e"/>
  <circle cx="1130" cy="40" r="330" fill="#2a0a52"/>
  <circle cx="1130" cy="40" r="210" fill="#36106a"/>
  <rect x="0" y="618" width="1200" height="12" fill="#ff6b35"/>

  <text x="80" y="100" ${font} font-weight="700" font-size="42" fill="#ffffff">Gera<tspan fill="#ff6b35">Dev</tspan></text>

  <rect x="80" y="160" width="120" height="120" rx="28" fill="#6a0dad"/>
  <g transform="translate(104 184)">${iconSvg(Icon)}</g>
  <rect x="228" y="198" width="${Math.round(category.length * 14.5) + 44}" height="44" rx="22" fill="#ffffff" fill-opacity="0.1"/>
  <text x="250" y="228" ${font} font-weight="600" font-size="24" fill="#e9d5ff">${escapeXml(category)}</text>

  ${titleLines
    .map(
      (l, i) =>
        `<text x="80" y="${titleY + i * (titleSize + 6)}" ${font} font-weight="800" font-size="${titleSize}" fill="#ffffff">${escapeXml(l)}</text>`,
    )
    .join("\n  ")}
  ${descLines
    .map(
      (l, i) =>
        `<text x="80" y="${descY + i * 44}" ${font} font-size="34" fill="#c9aef0">${escapeXml(l)}</text>`,
    )
    .join("\n  ")}

  <text x="1120" y="100" text-anchor="end" ${font} font-weight="600" font-size="26" fill="#ff6b35">${domain}</text>
</svg>`;
}

const render = (svg) =>
  new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true, defaultFontFamily: "Segoe UI" },
  })
    .render()
    .asPng();

let count = 0;
for (const locale of ["pt", "en"]) {
  const t = (key) => resources[locale].translation[key] ?? key;
  const dir = path.join(OUT, locale);
  fs.mkdirSync(dir, { recursive: true });

  for (const tool of TOOLS) {
    const category = CATEGORIES.find((c) => c.id === tool.category);
    const svg = ogSvg({
      title: t(tool.labelKey),
      description: t(tool.descKey),
      category: t(category.labelKey),
      Icon: tool.icon,
      domain: "geradev.com.br",
    });
    fs.writeFileSync(path.join(dir, `${tool.id}.png`), render(svg));
    count++;
  }
}

console.log(`OG images: ${count} PNGs em public/og/`);
