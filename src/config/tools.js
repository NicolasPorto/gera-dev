import {
  FileText,
  QrCode,
  KeyRound,
  MessageCircle,
  UserRound,
  Hash,
  Fingerprint,
  Braces,
  FileCode2,
  Database,
  Quote,
  FileUp,
  Link2,
  Binary,
  ShieldCheck,
  Globe,
  Eye,
  Clock,
  CaseSensitive,
  CalendarClock,
  AlignLeft,
  Palette,
  ArrowLeftRight,
  Table,
  FileCog,
  Regex,
  GitCompare,
  Timer,
  FileType,
  IdCard,
  Building2,
  BadgeCheck,
  Banknote,
  CreditCard,
  LetterText,
  Flag,
  WandSparkles,
  Wrench,
} from "lucide-react";

import { lazy } from "react";

const load = (name) => lazy(() => import(`../tools/${name}.jsx`));

import { TOOL_PATHS } from "./toolPaths.js";

export const CATEGORIES = [
  { id: "brazil", labelKey: "Brasil", icon: Flag },
  { id: "generators", labelKey: "Geradores", icon: WandSparkles },
  { id: "formatters", labelKey: "Formatadores", icon: Braces },
  { id: "converters", labelKey: "Conversores", icon: ArrowLeftRight },
  { id: "encoders", labelKey: "Encode/Decode", icon: Binary },
  { id: "network", labelKey: "Rede", icon: Globe },
  { id: "utilities", labelKey: "Utilidades", icon: Wrench },
];

export const TOOLS = [
  // ── Brasil ──────────────────────────────────────────────────
  {
    id: "documents",
    path: TOOL_PATHS["documents"],
    category: "brazil",
    icon: FileText,
    labelKey: "GerarDocumentos",
    titleKey: "DescGerarDocumentos",
    descKey: "DescToolDocumentos",
    keywords: ["cpf", "cnpj", "rg", "documento", "document", "alfanumerico"],
    disclaimer: true,
    related: ["cpf", "cnpj", "doc-validator", "person"],
    Component: load("DocsGenerator"),
  },
  {
    id: "cpf",
    path: TOOL_PATHS["cpf"],
    category: "brazil",
    icon: IdCard,
    labelKey: "GerarCPF",
    titleKey: "GerarCPF",
    descKey: "DescToolCPF",
    keywords: ["cpf", "gerador", "gerar", "documento", "teste", "valido"],
    disclaimer: true,
    related: ["doc-validator", "cnpj", "person", "documents"],
    props: { initialType: "cpf" },
    Component: load("DocsGenerator"),
  },
  {
    id: "cnpj",
    path: TOOL_PATHS["cnpj"],
    category: "brazil",
    icon: Building2,
    labelKey: "GerarCNPJ",
    titleKey: "GerarCNPJ",
    descKey: "DescToolCNPJ",
    keywords: ["cnpj", "gerador", "gerar", "empresa", "alfanumerico", "teste"],
    disclaimer: true,
    related: ["doc-validator", "cpf", "pix", "documents"],
    props: { initialType: "cnpj" },
    Component: load("DocsGenerator"),
  },
  {
    id: "doc-validator",
    path: TOOL_PATHS["doc-validator"],
    category: "brazil",
    icon: BadgeCheck,
    labelKey: "ValidadorDocumentos",
    titleKey: "ValidadorDocumentos",
    descKey: "DescToolValidador",
    keywords: ["validar", "validador", "cpf", "cnpj", "verificar", "validate", "alfanumerico"],
    related: ["cpf", "cnpj", "card", "regex"],
    Component: load("DocValidator"),
  },
  {
    id: "pix",
    path: TOOL_PATHS["pix"],
    category: "brazil",
    icon: Banknote,
    labelKey: "GeradorPix",
    titleKey: "GeradorPix",
    descKey: "DescToolPix",
    keywords: ["pix", "qr", "qrcode", "copia e cola", "pagamento", "cobranca", "brcode"],
    related: ["qrcode", "whatsapp", "cnpj", "card"],
    Component: load("PixGenerator"),
  },
  {
    id: "person",
    path: TOOL_PATHS["person"],
    category: "brazil",
    icon: UserRound,
    labelKey: "GerarPessoa",
    titleKey: "DescGerarPessoa",
    descKey: "DescToolPessoa",
    keywords: ["pessoa", "person", "fake", "dados", "mock"],
    disclaimer: true,
    related: ["cpf", "documents", "card", "lorem"],
    Component: load("PersonGenerator"),
  },

  // ── Geradores ───────────────────────────────────────────────
  {
    id: "qrcode",
    path: TOOL_PATHS["qrcode"],
    category: "generators",
    icon: QrCode,
    labelKey: "GerarQRCode",
    titleKey: "DescGerarQRCode",
    descKey: "DescToolQRCode",
    keywords: ["qr", "qrcode", "codigo", "link"],
    Component: load("QRCodeGenerator"),
  },
  {
    id: "password",
    path: TOOL_PATHS["password"],
    category: "generators",
    icon: KeyRound,
    labelKey: "GerarSenha",
    titleKey: "DescGerarSenha",
    descKey: "DescToolSenha",
    keywords: ["senha", "password", "seguranca", "secure"],
    Component: load("PasswordGenerator"),
  },
  {
    id: "whatsapp",
    path: TOOL_PATHS["whatsapp"],
    category: "generators",
    icon: MessageCircle,
    labelKey: "GerarLinkWhatsApp",
    titleKey: "DescGerarLinkWhatsApp",
    descKey: "DescToolWhatsApp",
    keywords: ["whatsapp", "zap", "mensagem", "message", "link"],
    Component: load("WhatsappLinkGenerator"),
  },
  {
    id: "card",
    path: TOOL_PATHS["card"],
    category: "generators",
    icon: CreditCard,
    labelKey: "CartaoTeste",
    titleKey: "CartaoTeste",
    descKey: "DescToolCartao",
    keywords: ["cartao", "cartão", "credito", "credit", "card", "luhn", "teste", "visa", "mastercard", "elo"],
    disclaimer: true,
    related: ["person", "cpf", "doc-validator", "pix"],
    Component: load("CardGenerator"),
  },
  {
    id: "hash",
    path: TOOL_PATHS["hash"],
    category: "generators",
    icon: Hash,
    labelKey: "GerarHash",
    titleKey: "GerarHash",
    descKey: "DescToolHash",
    keywords: ["hash", "md5", "sha1", "sha256", "criptografia"],
    Component: load("HashGenerator"),
  },
  {
    id: "guid",
    path: TOOL_PATHS["guid"],
    category: "generators",
    icon: Fingerprint,
    labelKey: "GerarGuid",
    titleKey: "GerarGuid",
    descKey: "DescToolGuid",
    keywords: ["guid", "uuid", "identificador", "id"],
    Component: load("GuidGenerator"),
  },
  {
    id: "lorem",
    path: TOOL_PATHS["lorem"],
    category: "generators",
    icon: AlignLeft,
    labelKey: "LoremIpsum",
    titleKey: "LoremIpsum",
    descKey: "DescToolLorem",
    keywords: ["lorem", "ipsum", "texto", "placeholder", "dummy"],
    Component: load("LoremIpsumGenerator"),
  },

  // ── Formatadores ────────────────────────────────────────────
  {
    id: "json",
    path: TOOL_PATHS["json"],
    category: "formatters",
    icon: Braces,
    labelKey: "FormatarJSON",
    titleKey: "DescFormatarJSON",
    descKey: "DescToolJSON",
    keywords: ["json", "formatar", "format", "beautify", "validar"],
    Component: load("JSONFormatter"),
  },
  {
    id: "xml",
    path: TOOL_PATHS["xml"],
    category: "formatters",
    icon: FileCode2,
    labelKey: "FormatarXML",
    titleKey: "DescFormatarXML",
    descKey: "DescToolXML",
    keywords: ["xml", "formatar", "format", "beautify"],
    Component: load("XMLFormatter"),
  },
  {
    id: "sql",
    path: TOOL_PATHS["sql"],
    category: "formatters",
    icon: Database,
    labelKey: "FormatarSQL",
    titleKey: "FormatarSQL",
    descKey: "DescToolSQL",
    keywords: ["sql", "query", "formatar", "format", "banco", "database"],
    Component: load("SQLFormatter"),
  },

  // ── Conversores ─────────────────────────────────────────────
  {
    id: "json-class",
    path: TOOL_PATHS["json-class"],
    category: "converters",
    icon: FileCode2,
    labelKey: "JsonClass",
    titleKey: "JsonClass",
    descKey: "DescToolJsonClass",
    keywords: ["json", "csharp", "c#", "class", "classe", "converter"],
    Component: load("JsonToClassConverter"),
  },
  {
    id: "xml-json",
    path: TOOL_PATHS["xml-json"],
    category: "converters",
    icon: ArrowLeftRight,
    labelKey: "XmlJson",
    titleKey: "XmlJson",
    descKey: "DescToolXmlJson",
    keywords: ["xml", "json", "converter", "convert", "parse"],
    Component: load("XmlJsonConverter"),
  },
  {
    id: "csv-json",
    path: TOOL_PATHS["csv-json"],
    category: "converters",
    icon: Table,
    labelKey: "CsvJson",
    titleKey: "CsvJson",
    descKey: "DescToolCsvJson",
    keywords: ["csv", "json", "converter", "convert", "planilha", "spreadsheet"],
    Component: load("CsvJsonConverter"),
  },
  {
    id: "json-yaml",
    path: TOOL_PATHS["json-yaml"],
    category: "converters",
    icon: FileCog,
    labelKey: "JsonYaml",
    titleKey: "JsonYaml",
    descKey: "DescToolJsonYaml",
    keywords: ["json", "yaml", "yml", "converter", "convert", "config"],
    Component: load("JsonYamlConverter"),
  },
  {
    id: "json-stringify",
    path: TOOL_PATHS["json-stringify"],
    category: "converters",
    icon: Quote,
    labelKey: "JsonString",
    titleKey: "JsonString",
    descKey: "DescToolJsonString",
    keywords: ["json", "string", "stringify", "escape", "converter"],
    Component: load("JsonStringify"),
  },
  {
    id: "base64-file",
    path: TOOL_PATHS["base64-file"],
    category: "converters",
    icon: FileUp,
    labelKey: "Base64Arquivo",
    titleKey: "Base64Arquivo",
    descKey: "DescToolBase64Arquivo",
    keywords: ["base64", "arquivo", "file", "converter", "upload"],
    Component: load("Base64FileConverter"),
  },
  {
    id: "timestamp",
    path: TOOL_PATHS["timestamp"],
    category: "converters",
    icon: CalendarClock,
    labelKey: "TimestampConverter",
    titleKey: "TimestampConverter",
    descKey: "DescToolTimestamp",
    keywords: ["timestamp", "epoch", "unix", "data", "date", "hora"],
    Component: load("TimestampConverter"),
  },
  {
    id: "color",
    path: TOOL_PATHS["color"],
    category: "converters",
    icon: Palette,
    labelKey: "ConversorCores",
    titleKey: "ConversorCores",
    descKey: "DescToolCores",
    keywords: ["cor", "color", "hex", "rgb", "hsl", "converter"],
    Component: load("ColorConverter"),
  },

  // ── Encode / Decode ─────────────────────────────────────────
  {
    id: "url",
    path: TOOL_PATHS["url"],
    category: "encoders",
    icon: Link2,
    labelKey: "DecodificarCodificar",
    titleKey: "DecodificarCodificar",
    descKey: "DescToolUrl",
    keywords: ["url", "encode", "decode", "codificar", "decodificar"],
    Component: load("URLEncodeDecode"),
  },
  {
    id: "base64",
    path: TOOL_PATHS["base64"],
    category: "encoders",
    icon: Binary,
    labelKey: "Base64EncodeDecode",
    titleKey: "Base64EncodeDecode",
    descKey: "DescToolBase64",
    keywords: ["base64", "encode", "decode", "codificar", "decodificar"],
    Component: load("Base64EncodeDecode"),
  },
  {
    id: "jwt",
    path: TOOL_PATHS["jwt"],
    category: "encoders",
    icon: ShieldCheck,
    labelKey: "JWTEncodeDecode",
    titleKey: "JWTEncodeDecode",
    descKey: "DescToolJWT",
    keywords: ["jwt", "token", "decode", "auth", "bearer"],
    Component: load("JWTDecoderEncoder"),
  },

  // ── Rede ────────────────────────────────────────────────────
  {
    id: "ip",
    path: TOOL_PATHS["ip"],
    category: "network",
    icon: Globe,
    labelKey: "MeuIP",
    titleKey: "DescMeuIP",
    descKey: "DescToolIP",
    keywords: ["ip", "rede", "network", "endereco", "address"],
    Component: load("MyIPVisualizer"),
  },

  // ── Utilidades ──────────────────────────────────────────────
  {
    id: "html",
    path: TOOL_PATHS["html"],
    category: "utilities",
    icon: Eye,
    labelKey: "VisualizarHTML",
    titleKey: "DescVisualizarHTML",
    descKey: "DescToolHTML",
    keywords: ["html", "preview", "visualizar", "render"],
    Component: load("HTMLVisualizer"),
  },
  {
    id: "overtime",
    path: TOOL_PATHS["overtime"],
    category: "brazil",
    icon: Clock,
    labelKey: "CalculoHoraExtra",
    titleKey: "CalculoHoraExtra",
    descKey: "DescToolHoraExtra",
    keywords: ["hora", "extra", "overtime", "calcular", "salario"],
    Component: load("OvertimeCalculator"),
  },
  {
    id: "string-utils",
    path: TOOL_PATHS["string-utils"],
    category: "utilities",
    icon: CaseSensitive,
    labelKey: "PadronizadorTexto",
    titleKey: "PadronizadorTexto",
    descKey: "DescToolStringUtils",
    keywords: ["texto", "string", "maiuscula", "minuscula", "case", "shuffle"],
    Component: load("StringUtilities"),
  },
  {
    id: "regex",
    path: TOOL_PATHS["regex"],
    category: "utilities",
    icon: Regex,
    labelKey: "RegexTester",
    titleKey: "RegexTester",
    descKey: "DescToolRegex",
    keywords: ["regex", "regexp", "expressão", "regular", "match", "pattern"],
    Component: load("RegexTester"),
  },
  {
    id: "diff",
    path: TOOL_PATHS["diff"],
    category: "utilities",
    icon: GitCompare,
    labelKey: "DiffTexto",
    titleKey: "DiffTexto",
    descKey: "DescToolDiff",
    keywords: ["diff", "comparar", "compare", "diferença", "texto", "merge"],
    Component: load("DiffTool"),
  },
  {
    id: "numbase",
    path: TOOL_PATHS["numbase"],
    category: "converters",
    icon: Binary,
    labelKey: "BaseNumerica",
    titleKey: "BaseNumerica",
    descKey: "DescToolBase",
    keywords: ["base", "binário", "binary", "hex", "octal", "decimal", "número"],
    Component: load("NumberBaseConverter"),
  },
  {
    id: "cron",
    path: TOOL_PATHS["cron"],
    category: "utilities",
    icon: Timer,
    labelKey: "CronExplainer",
    titleKey: "CronExplainer",
    descKey: "DescToolCron",
    keywords: ["cron", "crontab", "agendar", "schedule", "expressão"],
    Component: load("CronExplainer"),
  },
  {
    id: "markdown",
    path: TOOL_PATHS["markdown"],
    category: "utilities",
    icon: FileType,
    labelKey: "MarkdownPreview",
    titleKey: "MarkdownPreview",
    descKey: "DescToolMarkdown",
    keywords: ["markdown", "md", "preview", "readme", "render"],
    Component: load("MarkdownPreview"),
  },
  {
    id: "text-counter",
    path: TOOL_PATHS["text-counter"],
    category: "utilities",
    icon: LetterText,
    labelKey: "ContadorTexto",
    titleKey: "ContadorTexto",
    descKey: "DescToolContador",
    keywords: ["contador", "caracteres", "palavras", "count", "characters", "words", "texto", "seo"],
    related: ["string-utils", "lorem", "diff", "markdown"],
    Component: load("TextCounter"),
  },
];

/** Vitrine da Home ("Populares") — curadoria manual dos mais buscados. */
export const POPULAR_IDS = ["cpf", "json", "password", "pix", "cnpj", "qrcode", "text-counter", "jwt"];

/** Mapa rápido path -> ferramenta. */
export const TOOLS_BY_PATH = Object.fromEntries(
  TOOLS.map((tool) => [tool.path, tool]),
);

/** Mapa rápido id -> ferramenta. */
export const TOOLS_BY_ID = Object.fromEntries(
  TOOLS.map((tool) => [tool.id, tool]),
);

/** Resolve uma lista de ids para ferramentas (ignorando ids inexistentes). */
export function toolsFromIds(ids) {
  return ids.map((id) => TOOLS_BY_ID[id]).filter(Boolean);
}

/**
 * Ferramentas relacionadas: primeiro as declaradas em `related`, depois as
 * da mesma categoria, sem repetir e sem incluir a própria.
 */
export function getRelatedTools(tool, limit = 4) {
  if (!tool) return [];
  const sameCategory = TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id,
  );
  const picked = [...toolsFromIds(tool.related || []), ...sameCategory];
  const seen = new Set([tool.id]);
  return picked
    .filter((t) => !seen.has(t.id) && seen.add(t.id))
    .slice(0, limit);
}

/** Ferramentas agrupadas na ordem de CATEGORIES. */
export function getToolsByCategory() {
  return CATEGORIES.map((category) => ({
    ...category,
    tools: TOOLS.filter((tool) => tool.category === category.id),
  })).filter((category) => category.tools.length > 0);
}

/**
 * Filtra ferramentas por um termo de busca, comparando contra o nome
 * traduzido e as keywords. `translate` é a função `t` do i18next.
 */
export function searchTools(query, translate) {
  const term = query.trim().toLowerCase();
  if (!term) return TOOLS;

  return TOOLS.filter((tool) => {
    const haystack = [
      translate(tool.labelKey),
      translate(tool.descKey),
      ...(tool.keywords || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(term);
  });
}
