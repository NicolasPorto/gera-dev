# GeraDev

O GeraDev é uma plataforma completa que oferece ferramentas essenciais para desenvolvedores e estudantes, facilitando a geração, formatação e manipulação de dados em seus projetos e ambientes de teste.

*Desenvolvida por Nicolas Porto e Luis Venturini.*

Acesso: 🌐 https://geradev.com.br

Grátis, sem cadastro e 100% no navegador — nenhum dado que você digita é enviado para servidores. Em português e inglês, e funciona offline (PWA).

## Ferramentas (37)

### 🇧🇷 Brasil
- [Gerador de CPF](https://geradev.com.br/gerador-de-cpf) — CPFs válidos para testes, com máscara e em lote
- [Gerador de CNPJ](https://geradev.com.br/gerador-de-cnpj) — numérico e o novo CNPJ alfanumérico
- [Validar CPF e CNPJ](https://geradev.com.br/validar-cpf-cnpj) — um por linha, explicando o motivo quando é inválido
- [Gerador de PIX](https://geradev.com.br/gerador-pix) — QR Code e PIX copia e cola (padrão BR Code do Banco Central)
- [Gerar Documentos](https://geradev.com.br/gerar-documentos) — CPF, CNPJ e RG em um só lugar
- [Gerar Pessoa](https://geradev.com.br/gerar-pessoa) — perfis fictícios coerentes (cidade, DDD e CEP do mesmo estado)
- [Cálculo de Hora Extra](https://geradev.com.br/calculo-hora-extra)

### ✨ Geradores
[QR Code](https://geradev.com.br/gerar-qrcode) ·
[Senha](https://geradev.com.br/gerar-senha) ·
[Link de WhatsApp](https://geradev.com.br/link-whatsapp) ·
[Cartão de crédito para testes (Luhn)](https://geradev.com.br/gerador-cartao-de-credito) ·
[Hash MD5/SHA](https://geradev.com.br/gerar-hash) ·
[GUID/UUID](https://geradev.com.br/guid-generator) ·
[Lorem Ipsum](https://geradev.com.br/lorem-ipsum)

### 🧹 Formatadores
[JSON](https://geradev.com.br/formatar-json) ·
[XML](https://geradev.com.br/formatar-xml) ·
[SQL](https://geradev.com.br/formatar-sql)

### 🔁 Conversores
[JSON ↔ C#](https://geradev.com.br/conversor-json-class) ·
[XML ↔ JSON](https://geradev.com.br/conversor-xml-json) ·
[CSV ↔ JSON](https://geradev.com.br/conversor-csv-json) ·
[JSON ↔ YAML](https://geradev.com.br/conversor-json-yaml) ·
[JSON ↔ String](https://geradev.com.br/json-stringify) ·
[Base64 ↔ Arquivo](https://geradev.com.br/conversor-base64-arquivo) ·
[Timestamp Unix](https://geradev.com.br/timestamp-converter) ·
[Cores HEX/RGB/HSL](https://geradev.com.br/conversor-cores) ·
[Bases numéricas](https://geradev.com.br/conversor-base-numerica)

### 🔐 Encode/Decode
[URL](https://geradev.com.br/url-encode-decode) ·
[Base64](https://geradev.com.br/base64-encode-decode) ·
[JWT](https://geradev.com.br/jwt-encode-decode)

### 🧰 Utilidades
[Contador de caracteres](https://geradev.com.br/contador-de-caracteres) ·
[Testador de Regex](https://geradev.com.br/testador-regex) ·
[Comparar textos (diff)](https://geradev.com.br/comparar-textos) ·
[Explicador de Cron](https://geradev.com.br/explicador-cron) ·
[Preview de Markdown](https://geradev.com.br/preview-markdown) ·
[Visualizar HTML](https://geradev.com.br/visualizar-html) ·
[Padronizador de texto](https://geradev.com.br/string-utilities) ·
[Meu IP](https://geradev.com.br/meu-ip)

## Tecnologias Utilizadas

- **React + Vite** — interface, com code-splitting por ferramenta
- **Pré-renderização (SSG)** — cada ferramenta tem HTML estático próprio em PT e EN
- **Vitest** — testes da lógica (`npm test`)
- **Vercel** — deploy e hospedagem

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local
npm test         # testes
npm run build    # build + pré-renderização
npm run gen:og   # regenera as imagens de compartilhamento (rode ao criar/renomear ferramenta)
```

Para adicionar uma ferramenta: crie o componente em `src/tools/`, registre em `src/config/tools.js` e `src/config/toolPaths.js`, adicione os textos em `src/i18n.js` e `src/config/toolContent.js` e rode `npm run gen:og`. O teste `registry.test.js` aponta o que estiver faltando.

## Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## Importante

### ⚠️ Avisos
- Estas ferramentas são destinadas exclusivamente para fins educacionais, de desenvolvimento e teste.
- Os documentos gerados (CPF, CNPJ, RG) são fictícios e não devem ser utilizados para atividades ilegais ou fraudes.
- O uso inadequado das ferramentas é de total responsabilidade do usuário.
- Recomendamos seguir todas as leis e regulamentações locais ao utilizar esta plataforma.

### 📄 Licença
Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.
