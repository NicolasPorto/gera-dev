# Divulgação do GeraDev

Plano prático para atrair público depois do deploy desta versão. A ordem importa: primeiro garantir que o Google e o Bing enxerguem as páginas novas, depois divulgar.

---

## 1. Logo após o deploy (30 min)

- [ ] **Google Search Console** → Sitemaps → reenviar `https://geradev.com.br/sitemap.xml`.
- [ ] Search Console → Inspeção de URL → **Solicitar indexação** das páginas novas, começando pelas de maior busca:
  - `/gerador-de-cpf`, `/gerador-de-cnpj`, `/validar-cpf-cnpj`, `/gerador-pix`, `/contador-de-caracteres`, `/gerador-cartao-de-credito`
- [ ] **Bing Webmaster Tools** → importar o site direto do Search Console (1 clique). O índice do Bing também alimenta o DuckDuckGo e buscas feitas por assistentes de IA.
- [ ] Testar a prévia de link (imagem OG nova):
  - LinkedIn: <https://www.linkedin.com/post-inspector/> (também limpa o cache antigo)
  - WhatsApp: mandar o link para você mesmo
- [ ] No repositório do GitHub: adicionar descrição, o link do site e *topics* (`developer-tools`, `cpf`, `cnpj`, `pix`, `json-formatter`, `react`, `brasil`).

## 2. Onde postar (em ordem de retorno esperado)

| Canal | Público | Formato que funciona |
|---|---|---|
| **TabNews** | devs BR | Artigo técnico que ensina algo; a ferramenta aparece como "fiz isso aqui" no fim |
| **r/brdev** | devs BR | Post curto e honesto ("fiz", "aceito feedback") |
| **LinkedIn** | devs/QAs BR | Post pessoal com a imagem OG + 3 bullets |
| **dev.to** | devs gringos | Artigo em inglês sobre PIX/BR Code (assunto curioso lá fora) |
| **AlternativeTo** | quem busca alternativa | Cadastrar o GeraDev como alternativa ao 4Devs e ao "Gerador de CPF" |

Dica: não poste tudo no mesmo dia. Um canal por semana permite responder comentários e ajustar o texto.

## 3. Textos prontos

### TabNews — artigo (o de maior potencial)

> **Título:** CNPJ alfanumérico: o que muda no cálculo do dígito verificador (e como testar seu sistema)
>
> A IN RFB nº 2.229/2024 definiu que, a partir de julho de 2026, novos CNPJs podem ter letras nas 12 primeiras posições, tipo `12.ABC.345/01DE-35`. Se o seu sistema valida CNPJ com `\d{14}` ou converte pra número, ele vai quebrar.
>
> **O que muda no cálculo:** os pesos e o módulo 11 continuam iguais. A diferença é que cada caractere vira `código ASCII − 48`. Então `'0'..'9'` continuam valendo 0–9, e `'A'` vale 17, `'B'` 18 e assim por diante. Os dois dígitos verificadores continuam numéricos.
>
> ```js
> const valor = (c) => c.charCodeAt(0) - 48;
> const dv = (base, pesos) => {
>   const soma = [...base].reduce((acc, c, i) => acc + valor(c) * pesos[i], 0);
>   const resto = soma % 11;
>   return resto < 2 ? 0 : 11 - resto;
> };
> ```
>
> **Checklist pro seu sistema:** coluna do banco como `CHAR(14)` (não `BIGINT`), máscara de input aceitando letras, regex `^[A-Z0-9]{12}\d{2}$` e `toUpperCase()` antes de validar.
>
> Pra testar, coloquei no GeraDev um [gerador de CNPJ alfanumérico](https://geradev.com.br/gerador-de-cnpj) e um [validador](https://geradev.com.br/validar-cpf-cnpj) que explica por que um número é inválido (mostra até o DV esperado). É grátis, sem cadastro e roda tudo no navegador.

### r/brdev

> **Título:** Fiz um gerador de PIX copia e cola + QR Code que roda 100% no navegador
>
> Faz um tempo que mantenho o GeraDev (geradev.com.br), um site de ferramentas pra dev: gerador de CPF/CNPJ, formatador de JSON, JWT, regex etc. Nesta versão entraram:
>
> - Gerador de PIX (BR Code com CRC16, testado contra o exemplo do manual do BC)
> - Validador de CPF/CNPJ em lote, já com CNPJ alfanumérico
> - Cartão de teste por bandeira (Luhn), incluindo Elo e Hipercard
> - Contador de caracteres com limites de SEO/X/SMS
>
> Sem cadastro, sem backend, PT/EN, funciona offline. Aceito sugestões de ferramenta que vocês sentem falta no dia a dia.

### LinkedIn

> Lancei uma versão nova do GeraDev, o site de ferramentas pra dev que mantenho com o Luis Venturini. 🦦
>
> O que entrou:
> → Gerador de PIX (QR Code + copia e cola)
> → Validador de CPF e CNPJ, já no formato alfanumérico da Receita
> → Cartões de teste por bandeira (Luhn) pra testar checkout
>
> São 37 ferramentas, grátis, sem cadastro e tudo roda no seu navegador.
> 👉 geradev.com.br
>
> Qual ferramenta você usa toda semana e ainda não achou uma boa versão online?

### dev.to (inglês)

> **Title:** How Brazil's PIX QR codes work: building a BR Code generator in ~100 lines of JS
>
> Outline: (1) what PIX is and why everyone in Brazil uses it; (2) the EMV TLV format (ID + length + value) with a real payload broken down field by field; (3) the CRC16-CCITT checksum in 10 lines; (4) gotchas: ASCII-only names, 25/15-char limits, phone keys need +55; (5) link to the live tool (geradev.com.br/en/gerador-pix) and the source.

## 4. Conteúdo que gera busca orgânica contínua

Artigos curtos (TabNews, dev.to, ou uma futura seção de blog no próprio site) que respondem dúvidas reais e linkam a ferramenta certa:

- "Como validar CPF em JavaScript, C# e Python" → `/validar-cpf-cnpj`
- "Expressões cron mais usadas (a cada 5 min, todo dia às 3h...)" → `/explicador-cron`
- "Como decodificar um JWT sem biblioteca" → `/jwt-encode-decode`
- "Cartões de teste do Stripe, Mercado Pago e PagSeguro: lista e diferenças" → `/gerador-cartao-de-credito`

## 5. O que acompanhar

- **Search Console → Desempenho:** consultas e páginas com mais impressões. Uma página com muitas impressões e CTR baixo pede título ou descrição melhores.
- **Simple Analytics:** de onde vem o tráfego de cada post; repetir o que funcionou.
- Revisar a lista "Populares" da Home (`POPULAR_IDS` em `src/config/tools.js`) com os dados reais depois de 30 dias.
