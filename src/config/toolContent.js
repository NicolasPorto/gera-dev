// Conteúdo rico por ferramenta (intro + como usar + FAQ), em PT e EN.
// Usado pelo ToolAbout e pelo FAQPage (JSON-LD) no Seo. Ferramentas ausentes
// daqui caem no texto "About_<id>" do i18n (fallback), permitindo rollout gradual.

export const TOOL_CONTENT = {
  regex: {
    pt: {
      intro: [
        "Expressões regulares (regex) são padrões usados para encontrar, validar e extrair trechos de texto. Este testador executa o padrão sobre o seu texto em tempo real, destaca todas as correspondências e lista os grupos de captura.",
        "É ideal para validar formatos como e-mails, telefones e documentos, extrair dados de logs ou ajustar uma expressão antes de usá-la no seu código. Todo o processamento acontece no seu navegador — nada é enviado para servidores.",
      ],
      howTo: [
        "Digite a expressão regular no campo de padrão (sem as barras /).",
        "Ative as flags desejadas: g (global), i (ignorar maiúsculas), m (multilinha) e s (dotall).",
        "Cole o texto de teste; as correspondências aparecem destacadas automaticamente.",
        "Confira os grupos de captura abaixo e use Compartilhar para enviar o teste a alguém.",
      ],
      faq: [
        { q: "Qual sintaxe de regex é usada?", a: "A mesma do JavaScript (motor RegExp do navegador), compatível com a maioria das linguagens para padrões comuns." },
        { q: "Meu texto é enviado para algum servidor?", a: "Não. Todo o processamento acontece localmente no seu navegador." },
        { q: "Por que minha expressão não encontra nada?", a: "Verifique as flags (g para várias ocorrências, i para ignorar maiúsculas) e se os caracteres especiais estão escapados corretamente." },
      ],
    },
    en: {
      intro: [
        "Regular expressions (regex) are patterns used to find, validate and extract pieces of text. This tester runs your pattern against the text in real time, highlights every match and lists capture groups.",
        "It's perfect for validating formats like emails, phone numbers and IDs, extracting data from logs, or refining an expression before using it in your code. All processing happens in your browser — nothing is sent to a server.",
      ],
      howTo: [
        "Type the regular expression in the pattern field (without the / delimiters).",
        "Toggle the flags you need: g (global), i (ignore case), m (multiline) and s (dotall).",
        "Paste your test string; matches are highlighted automatically.",
        "Check the capture groups below and use Share to send the test to someone.",
      ],
      faq: [
        { q: "Which regex syntax is used?", a: "The same as JavaScript (the browser's RegExp engine), compatible with most languages for common patterns." },
        { q: "Is my text sent to a server?", a: "No. All processing happens locally in your browser." },
        { q: "Why doesn't my expression match anything?", a: "Check the flags (g for multiple matches, i to ignore case) and make sure special characters are escaped correctly." },
      ],
    },
  },

  diff: {
    pt: {
      intro: [
        "A ferramenta de diff compara dois textos e mostra as diferenças linha a linha: linhas adicionadas aparecem em verde e removidas em vermelho. É útil para revisar alterações de código, comparar versões de configuração e conferir logs ou documentos.",
        "A comparação usa o algoritmo de maior subsequência comum (LCS), o mesmo princípio de ferramentas de controle de versão. Tudo é processado no navegador, sem enviar nada para fora.",
      ],
      howTo: [
        "Cole o texto original no campo da esquerda.",
        "Cole o texto modificado no campo da direita.",
        "O resultado aparece abaixo, com um resumo de quantas linhas foram adicionadas e removidas.",
        "Use Compartilhar para gerar um link com os dois textos já preenchidos.",
      ],
      faq: [
        { q: "A comparação é por linha ou por caractere?", a: "Por linha. Cada linha é classificada como igual, adicionada ou removida." },
        { q: "Dá para comparar textos grandes?", a: "Sim, mas textos muito grandes podem demorar mais, pois o custo cresce com o tamanho dos dois lados." },
        { q: "Os textos ficam salvos?", a: "Ficam apenas no seu navegador, para você não perder o trabalho ao recarregar a página." },
      ],
    },
    en: {
      intro: [
        "The diff tool compares two texts and shows the differences line by line: added lines appear in green and removed lines in red. It's useful for reviewing code changes, comparing config versions and checking logs or documents.",
        "The comparison uses the Longest Common Subsequence (LCS) algorithm, the same principle behind version-control tools. Everything is processed in the browser, with nothing sent elsewhere.",
      ],
      howTo: [
        "Paste the original text in the left field.",
        "Paste the modified text in the right field.",
        "The result appears below, with a summary of how many lines were added and removed.",
        "Use Share to generate a link with both texts pre-filled.",
      ],
      faq: [
        { q: "Is the comparison line-based or character-based?", a: "Line-based. Each line is classified as equal, added or removed." },
        { q: "Can I compare large texts?", a: "Yes, but very large texts may take longer, since the cost grows with the size of both sides." },
        { q: "Are the texts saved?", a: "They're kept only in your browser, so you don't lose your work when reloading the page." },
      ],
    },
  },

  "csv-json": {
    pt: {
      intro: [
        "Converta dados entre CSV e JSON nas duas direções. No modo CSV → JSON, a primeira linha vira as chaves e cada linha seguinte vira um objeto. No modo JSON → CSV, um array de objetos vira uma tabela com cabeçalho.",
        "O conversor lida com os casos difíceis do CSV: campos entre aspas, vírgulas e quebras de linha dentro de valores e aspas escapadas. Útil para migrar dados de planilhas para APIs e vice-versa.",
      ],
      howTo: [
        "Escolha a direção (CSV → JSON ou JSON → CSV).",
        "Cole seus dados na área de texto.",
        "Clique em Converter para ver o resultado formatado.",
        "Copie a saída ou compartilhe um link com o conteúdo.",
      ],
      faq: [
        { q: "Qual separador é usado?", a: "A vírgula, separador padrão do formato CSV." },
        { q: "E se os objetos tiverem chaves diferentes?", a: "No modo JSON → CSV o cabeçalho é a união de todas as chaves encontradas nos objetos." },
        { q: "Campos com vírgula quebram a conversão?", a: "Não. Campos com vírgulas, aspas ou quebras de linha são tratados corretamente quando estão entre aspas." },
      ],
    },
    en: {
      intro: [
        "Convert data between CSV and JSON in both directions. In CSV → JSON mode, the first row becomes the keys and each following row becomes an object. In JSON → CSV mode, an array of objects becomes a table with a header.",
        "The converter handles the tricky parts of CSV: quoted fields, commas and line breaks inside values, and escaped quotes. Useful for migrating spreadsheet data to and from APIs.",
      ],
      howTo: [
        "Choose the direction (CSV → JSON or JSON → CSV).",
        "Paste your data into the text area.",
        "Click Convert to see the formatted result.",
        "Copy the output or share a link with the content.",
      ],
      faq: [
        { q: "Which delimiter is used?", a: "The comma, the standard CSV separator." },
        { q: "What if objects have different keys?", a: "In JSON → CSV mode the header is the union of all keys found across the objects." },
        { q: "Do fields with commas break the conversion?", a: "No. Fields with commas, quotes or line breaks are handled correctly when wrapped in quotes." },
      ],
    },
  },

  "json-yaml": {
    pt: {
      intro: [
        "Converta entre JSON e YAML instantaneamente. YAML é muito usado em arquivos de configuração (GitHub Actions, Docker Compose, Kubernetes e pipelines de CI/CD), enquanto JSON é o formato padrão de APIs e aplicações.",
        "Em vez de reescrever a estrutura na mão, cole o conteúdo e troque de formato preservando objetos, listas e tipos de dados.",
      ],
      howTo: [
        "Escolha a direção (JSON → YAML ou YAML → JSON).",
        "Cole o conteúdo na área de texto.",
        "Clique em Converter.",
        "Copie ou compartilhe o resultado.",
      ],
      faq: [
        { q: "O YAML gerado mantém a indentação correta?", a: "Sim, com indentação de 2 espaços, padrão na maioria dos projetos." },
        { q: "Suporta listas e objetos aninhados?", a: "Sim, estruturas aninhadas são preservadas nas duas direções." },
        { q: "Comentários do YAML são mantidos?", a: "Não. JSON não tem comentários, então eles se perdem ao converter para JSON." },
      ],
    },
    en: {
      intro: [
        "Convert between JSON and YAML instantly. YAML is widely used in configuration files (GitHub Actions, Docker Compose, Kubernetes and CI/CD pipelines), while JSON is the standard format for APIs and applications.",
        "Instead of rewriting the structure by hand, paste the content and switch formats while preserving objects, lists and data types.",
      ],
      howTo: [
        "Choose the direction (JSON → YAML or YAML → JSON).",
        "Paste the content into the text area.",
        "Click Convert.",
        "Copy or share the result.",
      ],
      faq: [
        { q: "Does the generated YAML keep proper indentation?", a: "Yes, with 2-space indentation, the standard in most projects." },
        { q: "Does it support nested lists and objects?", a: "Yes, nested structures are preserved in both directions." },
        { q: "Are YAML comments kept?", a: "No. JSON has no comments, so they are lost when converting to JSON." },
      ],
    },
  },

  numbase: {
    pt: {
      intro: [
        "Converta números entre as bases mais usadas em programação: binário (2), octal (8), decimal (10) e hexadecimal (16). Escolha a base de origem, digite o número e veja as quatro representações ao mesmo tempo.",
        "A conversão usa BigInt, então funciona até com números muito grandes sem perda de precisão — útil para máscaras de bits, cores, endereços de memória e valores de baixo nível.",
      ],
      howTo: [
        "Selecione a base de origem (Bin, Oct, Dec ou Hex).",
        "Digite o número naquela base.",
        "Veja as conversões para todas as bases aparecerem na hora.",
        "Use o botão de copiar ao lado de cada resultado.",
      ],
      faq: [
        { q: "Suporta números negativos?", a: "Sim, basta incluir o sinal de menos antes do número." },
        { q: "Há limite de tamanho do número?", a: "Não há limite prático: usamos BigInt para manter a precisão de números grandes." },
        { q: "Posso usar letras no hexadecimal?", a: "Sim, use de a a f (maiúsculas ou minúsculas) para os dígitos de 10 a 15." },
      ],
    },
    en: {
      intro: [
        "Convert numbers between the bases most used in programming: binary (2), octal (8), decimal (10) and hexadecimal (16). Pick the source base, type the number and see all four representations at once.",
        "The conversion uses BigInt, so it works even with very large numbers without losing precision — handy for bit masks, colors, memory addresses and low-level values.",
      ],
      howTo: [
        "Select the source base (Bin, Oct, Dec or Hex).",
        "Type the number in that base.",
        "Watch the conversions to every base appear instantly.",
        "Use the copy button next to each result.",
      ],
      faq: [
        { q: "Does it support negative numbers?", a: "Yes, just include the minus sign before the number." },
        { q: "Is there a size limit?", a: "There's no practical limit: we use BigInt to keep precision for large numbers." },
        { q: "Can I use letters in hexadecimal?", a: "Yes, use a to f (upper or lower case) for the digits 10 to 15." },
      ],
    },
  },

  cron: {
    pt: {
      intro: [
        "Expressões cron definem quando tarefas agendadas devem rodar, mas a sintaxe de cinco campos é difícil de ler. Este explicador decompõe a expressão e mostra o que cada campo significa: minuto, hora, dia do mês, mês e dia da semana.",
        "Suporta os operadores mais comuns: * (qualquer valor), */n (a cada n), intervalos (a-b) e listas (a,b,c). Ótimo para conferir um agendamento antes de colocá-lo em produção.",
      ],
      howTo: [
        "Digite a expressão cron de 5 campos (ex.: */5 * * * *).",
        "Veja cada campo explicado em uma linha separada.",
        "Ajuste a expressão até que a descrição corresponda ao agendamento desejado.",
      ],
      faq: [
        { q: "Quantos campos a expressão tem?", a: "Cinco: minuto, hora, dia do mês, mês e dia da semana." },
        { q: "Suporta segundos (6 campos)?", a: "Não; usamos o padrão de 5 campos do cron do Unix/Linux." },
        { q: "O que significa */15 no campo de minutos?", a: "A cada 15 minutos." },
      ],
    },
    en: {
      intro: [
        "Cron expressions define when scheduled tasks should run, but the five-field syntax is hard to read. This explainer breaks the expression down and shows what each field means: minute, hour, day of month, month and day of week.",
        "It supports the most common operators: * (any value), */n (every n), ranges (a-b) and lists (a,b,c). Great for double-checking a schedule before putting it into production.",
      ],
      howTo: [
        "Type a 5-field cron expression (e.g. */5 * * * *).",
        "See each field explained on its own line.",
        "Adjust the expression until the description matches the schedule you want.",
      ],
      faq: [
        { q: "How many fields does the expression have?", a: "Five: minute, hour, day of month, month and day of week." },
        { q: "Does it support seconds (6 fields)?", a: "No; we use the 5-field Unix/Linux cron standard." },
        { q: "What does */15 mean in the minutes field?", a: "Every 15 minutes." },
      ],
    },
  },

  markdown: {
    pt: {
      intro: [
        "Escreva Markdown e veja o resultado renderizado em tempo real, lado a lado. Markdown é a linguagem de marcação usada em READMEs, documentação, issues do GitHub e muitos blogs.",
        "O HTML gerado é sanitizado antes de ser exibido, então é seguro colar conteúdo de qualquer origem sem risco de scripts maliciosos.",
      ],
      howTo: [
        "Escreva ou cole seu Markdown no editor à esquerda.",
        "Veja a pré-visualização renderizada à direita, atualizada a cada tecla.",
        "Use títulos (#), listas (-), negrito (**), links e blocos de código com crases.",
      ],
      faq: [
        { q: "Qual dialeto de Markdown é suportado?", a: "GitHub Flavored Markdown (GFM), incluindo tabelas e quebras de linha." },
        { q: "É seguro colar conteúdo de terceiros?", a: "Sim. O HTML é sanitizado para remover scripts e atributos perigosos." },
        { q: "Meu texto fica salvo?", a: "Sim, no seu navegador, para você continuar de onde parou." },
      ],
    },
    en: {
      intro: [
        "Write Markdown and see the rendered result in real time, side by side. Markdown is the markup language used in READMEs, documentation, GitHub issues and many blogs.",
        "The generated HTML is sanitized before being displayed, so it's safe to paste content from any source without risk of malicious scripts.",
      ],
      howTo: [
        "Write or paste your Markdown in the editor on the left.",
        "See the rendered preview on the right, updated on every keystroke.",
        "Use headings (#), lists (-), bold (**), links and fenced code blocks.",
      ],
      faq: [
        { q: "Which Markdown flavor is supported?", a: "GitHub Flavored Markdown (GFM), including tables and line breaks." },
        { q: "Is it safe to paste third-party content?", a: "Yes. The HTML is sanitized to remove scripts and dangerous attributes." },
        { q: "Is my text saved?", a: "Yes, in your browser, so you can pick up where you left off." },
      ],
    },
  },

  json: {
    pt: {
      intro: [
        "Formate e valide JSON em segundos. Cole um JSON minificado ou desorganizado e receba uma versão identada e colorida, fácil de ler. Se algo estiver errado, a ferramenta indica que o JSON é inválido.",
        "É ideal para inspecionar respostas de API, revisar arquivos de configuração e preparar dados para documentação. O processamento é feito no seu navegador, sem enviar nada para servidores.",
      ],
      howTo: [
        "Cole o seu JSON na área de texto.",
        "Clique no botão para formatar e validar.",
        "Copie o resultado ou volte a editar para ajustar.",
      ],
      faq: [
        { q: "Meu JSON é enviado para um servidor?", a: "Não. A formatação e a validação acontecem localmente no seu navegador." },
        { q: "O que acontece se o JSON estiver inválido?", a: "A ferramenta avisa que há um erro para você corrigir antes de formatar." },
        { q: "Qual indentação é usada?", a: "Dois espaços, o padrão mais comum e legível para JSON." },
      ],
    },
    en: {
      intro: [
        "Format and validate JSON in seconds. Paste minified or messy JSON and get an indented, colored version that's easy to read. If something is wrong, the tool flags the JSON as invalid.",
        "It's ideal for inspecting API responses, reviewing config files and preparing data for documentation. Processing happens in your browser, with nothing sent to a server.",
      ],
      howTo: [
        "Paste your JSON into the text area.",
        "Click the button to format and validate.",
        "Copy the result or go back to edit and adjust.",
      ],
      faq: [
        { q: "Is my JSON sent to a server?", a: "No. Formatting and validation happen locally in your browser." },
        { q: "What happens if the JSON is invalid?", a: "The tool warns you about the error so you can fix it before formatting." },
        { q: "Which indentation is used?", a: "Two spaces, the most common and readable standard for JSON." },
      ],
    },
  },

  xml: {
    pt: {
      intro: [
        "Formate e identa documentos XML para deixá-los legíveis. Cole um XML em uma linha só ou mal formatado e receba a versão organizada, com hierarquia clara e destaque de sintaxe.",
        "Útil para inspecionar respostas SOAP, feeds RSS, arquivos de configuração e qualquer dado em XML. Tudo é processado no navegador.",
      ],
      howTo: [
        "Cole o XML na área de texto.",
        "Clique para formatar e identar.",
        "Copie o resultado formatado.",
      ],
      faq: [
        { q: "O XML é enviado para servidores?", a: "Não, a formatação é feita localmente no seu navegador." },
        { q: "E se o XML estiver malformado?", a: "A ferramenta indica que o XML é inválido para você corrigir." },
        { q: "Serve para HTML também?", a: "Para HTML, use a ferramenta de visualizar HTML; esta é otimizada para XML." },
      ],
    },
    en: {
      intro: [
        "Format and indent XML documents to make them readable. Paste a single-line or badly formatted XML and get an organized version with a clear hierarchy and syntax highlighting.",
        "Useful for inspecting SOAP responses, RSS feeds, config files and any XML data. Everything is processed in the browser.",
      ],
      howTo: [
        "Paste the XML into the text area.",
        "Click to format and indent.",
        "Copy the formatted result.",
      ],
      faq: [
        { q: "Is the XML sent to servers?", a: "No, formatting is done locally in your browser." },
        { q: "What if the XML is malformed?", a: "The tool flags the XML as invalid so you can fix it." },
        { q: "Does it work for HTML too?", a: "For HTML, use the HTML viewer; this one is optimized for XML." },
      ],
    },
  },

  sql: {
    pt: {
      intro: [
        "Formate consultas SQL para deixá-las padronizadas e fáceis de ler. Cole uma query longa em uma linha e receba uma versão identada, com as cláusulas (SELECT, FROM, WHERE, JOIN) bem organizadas.",
        "Ajuda a revisar queries complexas, padronizar o estilo do time e entender consultas herdadas. O processamento ocorre no navegador.",
      ],
      howTo: [
        "Cole a sua query SQL na área de texto.",
        "Clique para formatar.",
        "Copie a versão organizada.",
      ],
      faq: [
        { q: "Quais dialetos de SQL são suportados?", a: "A formatação cobre a sintaxe SQL padrão, adequada para a maioria dos bancos de dados." },
        { q: "A query é executada?", a: "Não. A ferramenta apenas formata o texto; nada é executado nem enviado." },
        { q: "Muda o resultado da query?", a: "Não, apenas a aparência (espaçamento e quebras). A lógica permanece a mesma." },
      ],
    },
    en: {
      intro: [
        "Format SQL queries to make them standardized and easy to read. Paste a long single-line query and get an indented version with clauses (SELECT, FROM, WHERE, JOIN) neatly organized.",
        "It helps review complex queries, standardize your team's style and understand legacy queries. Processing happens in the browser.",
      ],
      howTo: [
        "Paste your SQL query into the text area.",
        "Click to format.",
        "Copy the organized version.",
      ],
      faq: [
        { q: "Which SQL dialects are supported?", a: "Formatting covers standard SQL syntax, suitable for most databases." },
        { q: "Is the query executed?", a: "No. The tool only formats the text; nothing is run or sent." },
        { q: "Does it change the query result?", a: "No, only the appearance (spacing and line breaks). The logic stays the same." },
      ],
    },
  },

  "json-class": {
    pt: {
      intro: [
        "Gere classes C# a partir de um JSON e vice-versa. Cole um objeto JSON e receba as classes correspondentes, com as propriedades tipadas, prontas para usar em projetos .NET.",
        "Economiza o trabalho manual de criar DTOs e modelos a partir de respostas de API. O processamento é local, no navegador.",
      ],
      howTo: [
        "Escolha a direção (JSON para classe ou classe para JSON).",
        "Cole o conteúdo na área de texto.",
        "Converta e copie o resultado.",
      ],
      faq: [
        { q: "Os tipos são inferidos automaticamente?", a: "Sim, a partir dos valores do JSON (texto, número, booleano, listas e objetos aninhados)." },
        { q: "Funciona com objetos aninhados?", a: "Sim, classes adicionais são geradas para as estruturas aninhadas." },
        { q: "Os dados são enviados para fora?", a: "Não, tudo é processado no seu navegador." },
      ],
    },
    en: {
      intro: [
        "Generate C# classes from JSON and vice versa. Paste a JSON object and get the matching classes with typed properties, ready to use in .NET projects.",
        "It saves the manual work of creating DTOs and models from API responses. Processing is local, in the browser.",
      ],
      howTo: [
        "Choose the direction (JSON to class or class to JSON).",
        "Paste the content into the text area.",
        "Convert and copy the result.",
      ],
      faq: [
        { q: "Are types inferred automatically?", a: "Yes, from the JSON values (string, number, boolean, lists and nested objects)." },
        { q: "Does it work with nested objects?", a: "Yes, additional classes are generated for nested structures." },
        { q: "Is the data sent anywhere?", a: "No, everything is processed in your browser." },
      ],
    },
  },

  "xml-json": {
    pt: {
      intro: [
        "Converta entre XML e JSON nas duas direções. Atributos viram chaves com @, nós de texto viram #text e elementos repetidos viram arrays, mantendo a estrutura dos dados.",
        "Útil para integrar sistemas que falam formatos diferentes, inspecionar feeds e migrar dados. Tudo acontece no navegador.",
      ],
      howTo: [
        "Escolha a direção (XML → JSON ou JSON → XML).",
        "Cole o conteúdo na área de texto.",
        "Converta e copie ou compartilhe o resultado.",
      ],
      faq: [
        { q: "Como os atributos do XML são representados?", a: "Como chaves prefixadas com @ no JSON (por exemplo, @id)." },
        { q: "Elementos repetidos viram o quê?", a: "Arrays no JSON, preservando a ordem em que aparecem." },
        { q: "A conversão é reversível?", a: "Na maioria dos casos sim; a convenção de @ e #text permite voltar ao formato original." },
      ],
    },
    en: {
      intro: [
        "Convert between XML and JSON in both directions. Attributes become keys with @, text nodes become #text and repeated elements become arrays, preserving the data structure.",
        "Useful for integrating systems that speak different formats, inspecting feeds and migrating data. Everything happens in the browser.",
      ],
      howTo: [
        "Choose the direction (XML → JSON or JSON → XML).",
        "Paste the content into the text area.",
        "Convert and copy or share the result.",
      ],
      faq: [
        { q: "How are XML attributes represented?", a: "As keys prefixed with @ in JSON (for example, @id)." },
        { q: "What do repeated elements become?", a: "Arrays in JSON, preserving the order they appear in." },
        { q: "Is the conversion reversible?", a: "In most cases yes; the @ and #text convention lets you return to the original format." },
      ],
    },
  },

  "json-stringify": {
    pt: {
      intro: [
        "Transforme um JSON em uma string escapada (com aspas e barras invertidas) e faça o caminho inverso. Útil quando você precisa embutir um JSON dentro de outro JSON, em um código ou em um campo de texto.",
        "Em vez de escapar aspas na mão, cole o conteúdo e troque entre as duas formas. O processamento é feito no navegador.",
      ],
      howTo: [
        "Escolha a direção (JSON para string ou string para JSON).",
        "Cole o conteúdo na área de texto.",
        "Converta e copie o resultado.",
      ],
      faq: [
        { q: "Para que serve escapar um JSON?", a: "Para incluí-lo como valor de texto dentro de outro JSON, em logs ou em código, sem quebrar a sintaxe." },
        { q: "Os dados saem do navegador?", a: "Não, tudo é processado localmente." },
        { q: "A ferramenta valida o JSON?", a: "Sim, a conversão falha se o JSON de entrada for inválido." },
      ],
    },
    en: {
      intro: [
        "Turn a JSON into an escaped string (with quotes and backslashes) and back again. Useful when you need to embed a JSON inside another JSON, in code or in a text field.",
        "Instead of escaping quotes by hand, paste the content and switch between the two forms. Processing happens in the browser.",
      ],
      howTo: [
        "Choose the direction (JSON to string or string to JSON).",
        "Paste the content into the text area.",
        "Convert and copy the result.",
      ],
      faq: [
        { q: "Why escape a JSON?", a: "To include it as a text value inside another JSON, in logs or in code, without breaking the syntax." },
        { q: "Does the data leave the browser?", a: "No, everything is processed locally." },
        { q: "Does the tool validate the JSON?", a: "Yes, the conversion fails if the input JSON is invalid." },
      ],
    },
  },

  html: {
    pt: {
      intro: [
        "Visualize HTML renderizado na hora. Cole um trecho de HTML e veja como ele aparece no navegador, sem precisar criar um arquivo ou abrir um editor.",
        "Bom para testar snippets, e-mails em HTML e pequenos protótipos rapidamente. O conteúdo é renderizado localmente no seu navegador.",
      ],
      howTo: [
        "Cole o seu HTML na área de texto.",
        "Ative a pré-visualização para ver o resultado renderizado.",
        "Volte a editar para ajustar o código.",
      ],
      faq: [
        { q: "O HTML é enviado para algum servidor?", a: "Não, ele é renderizado localmente no seu navegador." },
        { q: "Posso usar CSS embutido?", a: "Sim, estilos inline e tags <style> funcionam na pré-visualização." },
        { q: "Scripts são executados?", a: "A ferramenta foca na visualização do conteúdo e do layout; evite depender de scripts." },
      ],
    },
    en: {
      intro: [
        "Preview rendered HTML instantly. Paste a snippet of HTML and see how it looks in the browser, without creating a file or opening an editor.",
        "Great for quickly testing snippets, HTML emails and small prototypes. The content is rendered locally in your browser.",
      ],
      howTo: [
        "Paste your HTML into the text area.",
        "Turn on the preview to see the rendered result.",
        "Go back to edit to adjust the code.",
      ],
      faq: [
        { q: "Is the HTML sent to a server?", a: "No, it's rendered locally in your browser." },
        { q: "Can I use embedded CSS?", a: "Yes, inline styles and <style> tags work in the preview." },
        { q: "Are scripts executed?", a: "The tool focuses on previewing content and layout; avoid relying on scripts." },
      ],
    },
  },

  "base64-file": {
    pt: {
      intro: [
        "Converta arquivos para Base64 e Base64 de volta para arquivo. É útil para embutir imagens e arquivos diretamente em HTML, CSS, JSON ou e-mails, sem precisar de um link externo.",
        "Selecione um arquivo para gerar a string Base64, ou cole uma string para baixar o arquivo correspondente. O processamento é feito no navegador.",
      ],
      howTo: [
        "Selecione um arquivo para convertê-lo em Base64, ou cole uma string Base64.",
        "Copie a string gerada ou baixe o arquivo resultante.",
      ],
      faq: [
        { q: "Que tipos de arquivo funcionam?", a: "Qualquer arquivo: imagens, PDFs, fontes e outros binários." },
        { q: "Os arquivos são enviados para servidores?", a: "Não, a conversão é feita localmente no seu navegador." },
        { q: "Base64 aumenta o tamanho?", a: "Sim, cerca de 33% maior que o original; é o custo de representar binário como texto." },
      ],
    },
    en: {
      intro: [
        "Convert files to Base64 and Base64 back to a file. It's useful for embedding images and files directly in HTML, CSS, JSON or emails, without needing an external link.",
        "Pick a file to generate the Base64 string, or paste a string to download the matching file. Processing happens in the browser.",
      ],
      howTo: [
        "Select a file to convert it to Base64, or paste a Base64 string.",
        "Copy the generated string or download the resulting file.",
      ],
      faq: [
        { q: "Which file types work?", a: "Any file: images, PDFs, fonts and other binaries." },
        { q: "Are files sent to servers?", a: "No, the conversion is done locally in your browser." },
        { q: "Does Base64 increase the size?", a: "Yes, about 33% larger than the original; that's the cost of representing binary as text." },
      ],
    },
  },

  timestamp: {
    pt: {
      intro: [
        "Converta timestamps Unix (epoch) em datas legíveis e vice-versa. Informe um timestamp em segundos ou milissegundos para ver a data correspondente, ou escolha uma data para obter o timestamp.",
        "Útil para depurar logs, APIs e bancos de dados que armazenam datas como números. O cálculo é feito no navegador.",
      ],
      howTo: [
        "Informe um timestamp Unix ou uma data.",
        "Veja a conversão correspondente na hora.",
        "Copie o resultado.",
      ],
      faq: [
        { q: "O que é um timestamp Unix?", a: "O número de segundos desde 1º de janeiro de 1970 (UTC), muito usado em sistemas." },
        { q: "Suporta milissegundos?", a: "Sim, além de segundos, o formato em milissegundos também é reconhecido." },
        { q: "Em qual fuso a data aparece?", a: "No fuso horário do seu navegador, com referência a UTC quando aplicável." },
      ],
    },
    en: {
      intro: [
        "Convert Unix timestamps (epoch) into readable dates and vice versa. Enter a timestamp in seconds or milliseconds to see the matching date, or pick a date to get the timestamp.",
        "Useful for debugging logs, APIs and databases that store dates as numbers. The calculation is done in the browser.",
      ],
      howTo: [
        "Enter a Unix timestamp or a date.",
        "See the matching conversion instantly.",
        "Copy the result.",
      ],
      faq: [
        { q: "What is a Unix timestamp?", a: "The number of seconds since January 1, 1970 (UTC), widely used in systems." },
        { q: "Does it support milliseconds?", a: "Yes, besides seconds, the milliseconds format is also recognized." },
        { q: "Which timezone is the date shown in?", a: "Your browser's timezone, with a reference to UTC where applicable." },
      ],
    },
  },

  color: {
    pt: {
      intro: [
        "Converta cores entre os formatos mais usados na web: HEX, RGB e HSL. Informe uma cor em um formato e veja as equivalências, com uma amostra visual da cor.",
        "Útil para ajustar paletas, copiar valores para o CSS e converter cores de design para código. Tudo no navegador.",
      ],
      howTo: [
        "Informe a cor em HEX, RGB ou HSL.",
        "Veja as conversões e a amostra da cor.",
        "Copie o valor no formato desejado.",
      ],
      faq: [
        { q: "Quais formatos são suportados?", a: "HEX, RGB e HSL, os mais usados em CSS e design." },
        { q: "Para que serve converter cores?", a: "Para reaproveitar um valor em diferentes contextos — por exemplo, pegar o HEX de um design e usar como RGB no CSS." },
        { q: "A cor é enviada para algum servidor?", a: "Não, a conversão é feita localmente no navegador." },
      ],
    },
    en: {
      intro: [
        "Convert colors between the most used web formats: HEX, RGB and HSL. Enter a color in one format and see the equivalents, with a visual swatch of the color.",
        "Useful for adjusting palettes, copying values into CSS and converting design colors to code. All in the browser.",
      ],
      howTo: [
        "Enter the color in HEX, RGB or HSL.",
        "See the conversions and the color swatch.",
        "Copy the value in the format you need.",
      ],
      faq: [
        { q: "Which formats are supported?", a: "HEX, RGB and HSL, the most common in CSS and design." },
        { q: "Why convert colors?", a: "To reuse a value across contexts — for example, taking the HEX from a design and using it as RGB in CSS." },
        { q: "Is the color sent to a server?", a: "No, the conversion is done locally in the browser." },
      ],
    },
  },

  url: {
    pt: {
      intro: [
        "Codifique e decodifique texto para uso seguro em URLs. A codificação transforma caracteres especiais (espaços, acentos, &, ?) em sequências percent-encoded, e a decodificação faz o caminho inverso.",
        "Útil para montar query strings, depurar links e tratar parâmetros de API. O processamento é local, no navegador.",
      ],
      howTo: [
        "Escolha entre codificar ou decodificar.",
        "Cole o texto ou a URL na área de texto.",
        "Copie o resultado.",
      ],
      faq: [
        { q: "Qual a diferença entre codificar e decodificar?", a: "Codificar transforma caracteres especiais em %XX; decodificar reverte para o texto original." },
        { q: "Quando preciso codificar uma URL?", a: "Ao incluir espaços, acentos ou símbolos em parâmetros de query, por exemplo." },
        { q: "Os dados saem do navegador?", a: "Não, tudo é processado localmente." },
      ],
    },
    en: {
      intro: [
        "Encode and decode text for safe use in URLs. Encoding turns special characters (spaces, accents, &, ?) into percent-encoded sequences, and decoding does the reverse.",
        "Useful for building query strings, debugging links and handling API parameters. Processing is local, in the browser.",
      ],
      howTo: [
        "Choose between encode or decode.",
        "Paste the text or URL into the text area.",
        "Copy the result.",
      ],
      faq: [
        { q: "What's the difference between encode and decode?", a: "Encoding turns special characters into %XX; decoding reverts to the original text." },
        { q: "When do I need to URL-encode?", a: "When including spaces, accents or symbols in query parameters, for example." },
        { q: "Does the data leave the browser?", a: "No, everything is processed locally." },
      ],
    },
  },

  base64: {
    pt: {
      intro: [
        "Codifique e decodifique texto em Base64. O Base64 representa dados em um conjunto seguro de caracteres ASCII, muito usado para transportar texto e binário em e-mails, tokens e APIs.",
        "Cole um texto para obter o Base64, ou cole um Base64 para recuperar o texto. O processamento é feito no navegador.",
      ],
      howTo: [
        "Escolha entre codificar ou decodificar.",
        "Cole o texto ou a string Base64.",
        "Copie o resultado.",
      ],
      faq: [
        { q: "Base64 é criptografia?", a: "Não. É apenas uma codificação reversível; não protege os dados, só os representa em texto." },
        { q: "Suporta acentos e emojis?", a: "Sim, o texto é tratado como UTF-8 antes de codificar." },
        { q: "Os dados são enviados para fora?", a: "Não, tudo acontece localmente no navegador." },
      ],
    },
    en: {
      intro: [
        "Encode and decode text in Base64. Base64 represents data using a safe set of ASCII characters, widely used to carry text and binary in emails, tokens and APIs.",
        "Paste text to get the Base64, or paste Base64 to recover the text. Processing happens in the browser.",
      ],
      howTo: [
        "Choose between encode or decode.",
        "Paste the text or Base64 string.",
        "Copy the result.",
      ],
      faq: [
        { q: "Is Base64 encryption?", a: "No. It's just a reversible encoding; it doesn't protect data, only represents it as text." },
        { q: "Does it support accents and emojis?", a: "Yes, the text is handled as UTF-8 before encoding." },
        { q: "Is the data sent anywhere?", a: "No, everything happens locally in the browser." },
      ],
    },
  },

  jwt: {
    pt: {
      intro: [
        "Decodifique tokens JWT (JSON Web Token) para inspecionar o cabeçalho e o payload sem precisar de ferramentas externas. Cole o token e veja as informações decodificadas na hora.",
        "Útil para depurar autenticação, conferir claims (exp, iss, sub) e entender o conteúdo de um token. A decodificação é feita no navegador.",
      ],
      howTo: [
        "Cole o token JWT na área de texto.",
        "Veja o cabeçalho e o payload decodificados.",
        "Copie as partes que precisar.",
      ],
      faq: [
        { q: "O JWT é validado/assinado aqui?", a: "A ferramenta decodifica e exibe o conteúdo; a verificação da assinatura depende da chave secreta do emissor." },
        { q: "É seguro colar meu token?", a: "A decodificação acontece localmente no seu navegador; ainda assim, evite compartilhar tokens de produção." },
        { q: "O que há dentro de um JWT?", a: "Três partes: cabeçalho, payload (claims) e assinatura, separadas por pontos." },
      ],
    },
    en: {
      intro: [
        "Decode JWT (JSON Web Token) tokens to inspect the header and payload without external tools. Paste the token and see the decoded information instantly.",
        "Useful for debugging authentication, checking claims (exp, iss, sub) and understanding a token's contents. Decoding is done in the browser.",
      ],
      howTo: [
        "Paste the JWT token into the text area.",
        "See the decoded header and payload.",
        "Copy the parts you need.",
      ],
      faq: [
        { q: "Is the JWT validated/signed here?", a: "The tool decodes and shows the contents; signature verification depends on the issuer's secret key." },
        { q: "Is it safe to paste my token?", a: "Decoding happens locally in your browser; even so, avoid sharing production tokens." },
        { q: "What's inside a JWT?", a: "Three parts: header, payload (claims) and signature, separated by dots." },
      ],
    },
  },

  documents: {
    pt: {
      intro: [
        "Gere números de documentos brasileiros válidos para testes: CPF, CNPJ, RG e outros. Os números seguem as regras de cálculo dos dígitos verificadores, então passam em validações de formato.",
        "São ideais para preencher formulários em desenvolvimento e homologação. Importante: os documentos são fictícios e devem ser usados apenas para testes.",
      ],
      howTo: [
        "Escolha o tipo de documento.",
        "Gere um número válido com um clique.",
        "Copie o número para usar nos seus testes.",
      ],
      faq: [
        { q: "Os documentos são reais?", a: "Não. São números fictícios, válidos apenas quanto ao formato e aos dígitos verificadores." },
        { q: "Posso usar em produção ou em fraudes?", a: "Não. Servem exclusivamente para testes e desenvolvimento." },
        { q: "Por que gerar documentos válidos?", a: "Para testar formulários e validações sem usar dados de pessoas reais." },
      ],
    },
    en: {
      intro: [
        "Generate valid Brazilian document numbers for testing: CPF, CNPJ, RG and others. The numbers follow the check-digit rules, so they pass format validations.",
        "They're ideal for filling forms in development and staging. Important: the documents are fictitious and should be used for testing only.",
      ],
      howTo: [
        "Choose the document type.",
        "Generate a valid number with one click.",
        "Copy the number to use in your tests.",
      ],
      faq: [
        { q: "Are the documents real?", a: "No. They are fictitious numbers, valid only in terms of format and check digits." },
        { q: "Can I use them in production or fraud?", a: "No. They are strictly for testing and development." },
        { q: "Why generate valid documents?", a: "To test forms and validations without using real people's data." },
      ],
    },
  },

  qrcode: {
    pt: {
      intro: [
        "Gere QR codes a partir de qualquer texto ou link. Digite o conteúdo e baixe o QR code pronto para usar em materiais, sites, cardápios e cartões.",
        "O QR code é gerado no seu navegador, sem enviar o conteúdo para servidores.",
      ],
      howTo: [
        "Digite o texto ou a URL.",
        "Veja o QR code gerado na hora.",
        "Baixe a imagem para usar onde quiser.",
      ],
      faq: [
        { q: "Posso colocar um link?", a: "Sim, links são o uso mais comum; ao escanear, o QR abre a URL." },
        { q: "Há limite de tamanho do texto?", a: "Textos muito longos geram QR codes mais densos e difíceis de ler; prefira conteúdo curto." },
        { q: "O conteúdo é enviado para algum servidor?", a: "Não, o QR code é gerado localmente." },
      ],
    },
    en: {
      intro: [
        "Generate QR codes from any text or link. Type the content and download the QR code ready to use in print, websites, menus and cards.",
        "The QR code is generated in your browser, without sending the content to a server.",
      ],
      howTo: [
        "Type the text or URL.",
        "See the QR code generated instantly.",
        "Download the image to use anywhere.",
      ],
      faq: [
        { q: "Can I put a link?", a: "Yes, links are the most common use; when scanned, the QR opens the URL." },
        { q: "Is there a text size limit?", a: "Very long text creates denser QR codes that are harder to scan; prefer short content." },
        { q: "Is the content sent to a server?", a: "No, the QR code is generated locally." },
      ],
    },
  },

  password: {
    pt: {
      intro: [
        "Gere senhas fortes e aleatórias com o tamanho e os tipos de caractere que você escolher: maiúsculas, minúsculas, números e símbolos.",
        "Senhas longas e variadas são muito mais difíceis de quebrar. A geração é feita no seu navegador, sem registrar nada.",
      ],
      howTo: [
        "Defina o tamanho e os tipos de caractere.",
        "Gere a senha.",
        "Copie e guarde em um gerenciador de senhas.",
      ],
      faq: [
        { q: "As senhas são salvas?", a: "Não. São geradas localmente e não ficam registradas em lugar nenhum." },
        { q: "Qual o tamanho ideal?", a: "Quanto maior, melhor; 16 caracteres ou mais é uma boa referência para contas importantes." },
        { q: "Devo usar símbolos?", a: "Sim, misturar tipos de caractere aumenta bastante a força da senha." },
      ],
    },
    en: {
      intro: [
        "Generate strong, random passwords with the length and character types you choose: uppercase, lowercase, numbers and symbols.",
        "Long, varied passwords are much harder to crack. Generation happens in your browser, with nothing recorded.",
      ],
      howTo: [
        "Set the length and character types.",
        "Generate the password.",
        "Copy and store it in a password manager.",
      ],
      faq: [
        { q: "Are the passwords saved?", a: "No. They are generated locally and never recorded anywhere." },
        { q: "What's the ideal length?", a: "The longer the better; 16 characters or more is a good reference for important accounts." },
        { q: "Should I use symbols?", a: "Yes, mixing character types significantly increases password strength." },
      ],
    },
  },

  whatsapp: {
    pt: {
      intro: [
        "Gere um link direto de conversa no WhatsApp (wa.me) a partir de um número e, opcionalmente, uma mensagem pronta. Quem clicar abre o chat já preenchido.",
        "É ótimo para botões de atendimento, bio de redes sociais e campanhas. O link é montado no seu navegador.",
      ],
      howTo: [
        "Informe o número com DDI e DDD.",
        "Opcional: escreva uma mensagem padrão.",
        "Copie o link gerado e use onde quiser.",
      ],
      faq: [
        { q: "Preciso do código do país?", a: "Sim, inclua o DDI (ex.: 55 para o Brasil) e o DDD para o link funcionar." },
        { q: "Dá para incluir uma mensagem?", a: "Sim, a mensagem aparece pré-preenchida quando a pessoa abre o chat." },
        { q: "Funciona no WhatsApp Web e no celular?", a: "Sim, o link wa.me abre no aplicativo ou na versão web." },
      ],
    },
    en: {
      intro: [
        "Generate a direct WhatsApp chat link (wa.me) from a number and, optionally, a ready-made message. Whoever clicks opens the chat pre-filled.",
        "Great for support buttons, social media bios and campaigns. The link is built in your browser.",
      ],
      howTo: [
        "Enter the number with country and area code.",
        "Optional: write a default message.",
        "Copy the generated link and use it anywhere.",
      ],
      faq: [
        { q: "Do I need the country code?", a: "Yes, include the country code (e.g. 55 for Brazil) and area code for the link to work." },
        { q: "Can I include a message?", a: "Yes, the message appears pre-filled when the person opens the chat." },
        { q: "Does it work on WhatsApp Web and mobile?", a: "Yes, the wa.me link opens in the app or the web version." },
      ],
    },
  },

  person: {
    pt: {
      intro: [
        "Gere dados de pessoas fictícias para testes: nome, CPF, e-mail, telefone, endereço e mais. Útil para popular bancos de dados e testar cadastros sem usar dados reais.",
        "Todos os dados são gerados aleatoriamente no seu navegador e não correspondem a pessoas reais.",
      ],
      howTo: [
        "Gere uma pessoa fictícia com um clique.",
        "Use os campos exibidos nos seus testes.",
        "Gere novamente para obter novos dados.",
      ],
      faq: [
        { q: "Os dados são de pessoas reais?", a: "Não, são totalmente fictícios e aleatórios." },
        { q: "Posso usar para testar cadastros?", a: "Sim, é exatamente para isso: desenvolvimento e homologação." },
        { q: "Os dados são salvos?", a: "Não, são gerados localmente e não ficam registrados." },
      ],
    },
    en: {
      intro: [
        "Generate fictitious people data for testing: name, ID, email, phone, address and more. Useful for seeding databases and testing sign-up forms without real data.",
        "All data is generated randomly in your browser and does not correspond to real people.",
      ],
      howTo: [
        "Generate a fictitious person with one click.",
        "Use the displayed fields in your tests.",
        "Generate again to get new data.",
      ],
      faq: [
        { q: "Is the data from real people?", a: "No, it's entirely fictitious and random." },
        { q: "Can I use it to test sign-up forms?", a: "Yes, that's exactly the purpose: development and staging." },
        { q: "Is the data saved?", a: "No, it's generated locally and never recorded." },
      ],
    },
  },

  hash: {
    pt: {
      intro: [
        "Gere hashes de um texto usando algoritmos como MD5, SHA-1, SHA-256 e outros. Hashes transformam qualquer entrada em uma sequência de tamanho fixo, muito usada para verificar integridade.",
        "Cole o texto e veja os hashes correspondentes. O cálculo é feito no seu navegador.",
      ],
      howTo: [
        "Cole o texto que deseja transformar.",
        "Veja os hashes gerados.",
        "Copie o hash do algoritmo desejado.",
      ],
      faq: [
        { q: "Hash é o mesmo que criptografia?", a: "Não. O hash é de mão única: não dá para recuperar o texto original a partir dele." },
        { q: "Para que serve um hash?", a: "Para verificar integridade de dados, comparar conteúdos e armazenar referências sem o dado original." },
        { q: "MD5 é seguro?", a: "Para integridade simples sim, mas para segurança use SHA-256 ou superior; MD5 e SHA-1 são considerados fracos." },
      ],
    },
    en: {
      intro: [
        "Generate hashes of a text using algorithms like MD5, SHA-1, SHA-256 and others. Hashes turn any input into a fixed-length sequence, widely used to verify integrity.",
        "Paste the text and see the matching hashes. The calculation is done in your browser.",
      ],
      howTo: [
        "Paste the text you want to transform.",
        "See the generated hashes.",
        "Copy the hash for the algorithm you need.",
      ],
      faq: [
        { q: "Is a hash the same as encryption?", a: "No. A hash is one-way: you can't recover the original text from it." },
        { q: "What is a hash for?", a: "To verify data integrity, compare contents and store references without the original data." },
        { q: "Is MD5 secure?", a: "For simple integrity yes, but for security use SHA-256 or higher; MD5 and SHA-1 are considered weak." },
      ],
    },
  },

  guid: {
    pt: {
      intro: [
        "Gere GUIDs/UUIDs (identificadores únicos universais) com um clique. São usados como chaves em bancos de dados, mensagens e sistemas distribuídos, onde a chance de colisão é praticamente nula.",
        "Gere um ou vários de uma vez. Os identificadores são criados no seu navegador.",
      ],
      howTo: [
        "Gere um GUID com um clique.",
        "Copie o valor gerado.",
        "Gere novamente quantas vezes precisar.",
      ],
      faq: [
        { q: "Qual a diferença entre GUID e UUID?", a: "São praticamente sinônimos; UUID é o termo padrão e GUID é o nome usado pela Microsoft." },
        { q: "Dois GUIDs podem se repetir?", a: "A probabilidade é tão baixa que, na prática, são considerados únicos." },
        { q: "São gerados no servidor?", a: "Não, são criados localmente no seu navegador." },
      ],
    },
    en: {
      intro: [
        "Generate GUIDs/UUIDs (universally unique identifiers) with one click. They are used as keys in databases, messages and distributed systems, where the chance of collision is practically zero.",
        "Generate one or several at once. The identifiers are created in your browser.",
      ],
      howTo: [
        "Generate a GUID with one click.",
        "Copy the generated value.",
        "Generate again as many times as you need.",
      ],
      faq: [
        { q: "What's the difference between GUID and UUID?", a: "They are practically synonyms; UUID is the standard term and GUID is the name used by Microsoft." },
        { q: "Can two GUIDs repeat?", a: "The probability is so low that, in practice, they are considered unique." },
        { q: "Are they generated on the server?", a: "No, they are created locally in your browser." },
      ],
    },
  },

  lorem: {
    pt: {
      intro: [
        "Gere texto de preenchimento (Lorem Ipsum) em parágrafos, frases ou palavras. É o texto-padrão usado em layouts para visualizar a tipografia e o espaçamento antes do conteúdo real.",
        "Escolha a quantidade e copie o texto gerado. Tudo acontece no navegador.",
      ],
      howTo: [
        "Escolha entre parágrafos, frases ou palavras.",
        "Defina a quantidade.",
        "Copie o texto gerado para o seu layout.",
      ],
      faq: [
        { q: "O que é Lorem Ipsum?", a: "Um texto fictício em latim aproximado, usado há séculos como preenchimento em design e tipografia." },
        { q: "Por que não usar texto real?", a: "O Lorem Ipsum evita que o conteúdo distraia da avaliação do layout." },
        { q: "Posso escolher a quantidade?", a: "Sim, em parágrafos, frases ou palavras." },
      ],
    },
    en: {
      intro: [
        "Generate placeholder text (Lorem Ipsum) in paragraphs, sentences or words. It's the standard text used in layouts to preview typography and spacing before the real content.",
        "Choose the amount and copy the generated text. Everything happens in the browser.",
      ],
      howTo: [
        "Choose between paragraphs, sentences or words.",
        "Set the amount.",
        "Copy the generated text into your layout.",
      ],
      faq: [
        { q: "What is Lorem Ipsum?", a: "A fictitious near-Latin text, used for centuries as filler in design and typography." },
        { q: "Why not use real text?", a: "Lorem Ipsum keeps the content from distracting you while evaluating the layout." },
        { q: "Can I choose the amount?", a: "Yes, in paragraphs, sentences or words." },
      ],
    },
  },

  ip: {
    pt: {
      intro: [
        "Descubra o seu endereço IP público — o número que identifica a sua conexão na internet. Útil para configurar acessos remotos, liberar IPs em firewalls e diagnosticar problemas de rede.",
        "A ferramenta exibe o IP detectado a partir da sua conexão.",
      ],
      howTo: [
        "Abra a ferramenta para ver o seu IP público.",
        "Copie o endereço se precisar usá-lo.",
      ],
      faq: [
        { q: "Qual a diferença entre IP público e privado?", a: "O público identifica sua rede na internet; o privado é usado dentro da sua rede local." },
        { q: "Meu IP muda?", a: "Em muitas conexões residenciais sim, ele é dinâmico e pode mudar com o tempo." },
        { q: "O IP revela minha localização exata?", a: "Não exatamente; costuma indicar a região aproximada do provedor, não o seu endereço." },
      ],
    },
    en: {
      intro: [
        "Find your public IP address — the number that identifies your connection on the internet. Useful for setting up remote access, allowlisting IPs in firewalls and diagnosing network issues.",
        "The tool shows the IP detected from your connection.",
      ],
      howTo: [
        "Open the tool to see your public IP.",
        "Copy the address if you need to use it.",
      ],
      faq: [
        { q: "What's the difference between public and private IP?", a: "The public one identifies your network on the internet; the private one is used within your local network." },
        { q: "Does my IP change?", a: "On many home connections yes, it's dynamic and may change over time." },
        { q: "Does the IP reveal my exact location?", a: "Not exactly; it usually indicates the provider's approximate region, not your address." },
      ],
    },
  },

  overtime: {
    pt: {
      intro: [
        "Calcule o valor de horas extras a partir do salário e da jornada. A ferramenta aplica o adicional sobre o valor da hora normal para estimar quanto você deve receber pelas horas extras.",
        "É uma estimativa para conferência; valores oficiais podem variar conforme acordos e convenções coletivas.",
      ],
      howTo: [
        "Informe o salário e a jornada.",
        "Informe as horas extras e o adicional (%).",
        "Veja o valor estimado.",
      ],
      faq: [
        { q: "O cálculo considera convenções coletivas?", a: "É uma estimativa baseada no adicional informado; acordos específicos podem alterar o valor." },
        { q: "Serve como documento oficial?", a: "Não, é apenas uma ferramenta de apoio para conferência." },
        { q: "Os dados são enviados para algum lugar?", a: "Não, o cálculo é feito no seu navegador." },
      ],
    },
    en: {
      intro: [
        "Calculate overtime pay from salary and working hours. The tool applies the surcharge over the normal hourly rate to estimate how much you should receive for overtime.",
        "It's an estimate for double-checking; official figures may vary according to agreements and labor conventions.",
      ],
      howTo: [
        "Enter the salary and working hours.",
        "Enter the overtime hours and the surcharge (%).",
        "See the estimated amount.",
      ],
      faq: [
        { q: "Does the calculation consider labor agreements?", a: "It's an estimate based on the surcharge you enter; specific agreements may change the value." },
        { q: "Is it an official document?", a: "No, it's just a support tool for checking." },
        { q: "Is the data sent anywhere?", a: "No, the calculation is done in your browser." },
      ],
    },
  },

  "string-utils": {
    pt: {
      intro: [
        "Transforme e padronize textos rapidamente: mudar para maiúsculas ou minúsculas, capitalizar, remover espaços extras, embaralhar e outras operações comuns do dia a dia.",
        "Cole o texto, escolha a operação e copie o resultado. Tudo no navegador.",
      ],
      howTo: [
        "Cole o texto na área de texto.",
        "Escolha a transformação desejada.",
        "Copie o resultado.",
      ],
      faq: [
        { q: "Quais transformações estão disponíveis?", a: "Maiúsculas, minúsculas, capitalização e outras operações de padronização de texto." },
        { q: "O texto é enviado para fora?", a: "Não, tudo é processado localmente no navegador." },
        { q: "Serve para normalizar dados?", a: "Sim, ajuda a padronizar entradas antes de salvar ou comparar." },
      ],
    },
    en: {
      intro: [
        "Transform and standardize text quickly: switch to uppercase or lowercase, capitalize, remove extra spaces, shuffle and other common everyday operations.",
        "Paste the text, choose the operation and copy the result. All in the browser.",
      ],
      howTo: [
        "Paste the text into the text area.",
        "Choose the transformation you want.",
        "Copy the result.",
      ],
      faq: [
        { q: "Which transformations are available?", a: "Uppercase, lowercase, capitalization and other text-standardization operations." },
        { q: "Is the text sent anywhere?", a: "No, everything is processed locally in the browser." },
        { q: "Is it good for normalizing data?", a: "Yes, it helps standardize inputs before saving or comparing." },
      ],
    },
  },
};
