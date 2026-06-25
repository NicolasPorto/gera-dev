import { useLocale } from "../hooks/useLocale";

const CONTENT = {
  pt: {
    title: "Sobre o GeraDev",
    intro:
      "O GeraDev é uma coleção gratuita de ferramentas online para desenvolvedores e estudantes de programação. Reúne geradores, formatadores, conversores e utilidades do dia a dia em um só lugar, disponível em português e inglês.",
    sections: [
      {
        h: "Por que criamos o GeraDev",
        p: [
          "O GeraDev nasceu de uma necessidade real: no dia a dia de desenvolvimento, a gente vivia pulando entre vários sites diferentes — um para formatar JSON, outro para gerar um hash, outro para testar uma regex. A ideia foi centralizar tudo em um só lugar.",
          "Por isso, as ferramentas daqui são as que nós mesmos usamos no nosso trabalho. Quando precisamos de algo novo com frequência, transformamos em uma ferramenta e adicionamos ao GeraDev — feito por desenvolvedores, para desenvolvedores.",
        ],
      },
      {
        h: "Nossa missão",
        p: [
          "Queremos economizar o tempo de quem programa, oferecendo ferramentas rápidas, sem cadastro e fáceis de usar. A maioria delas funciona inteiramente no seu navegador — os dados que você cola ou gera não são enviados para servidores.",
        ],
      },
      {
        h: "O que você encontra",
        p: [
          "Geradores: documentos (CPF, CNPJ), senhas seguras, QR codes, GUIDs, pessoas fictícias e Lorem Ipsum.",
          "Formatadores: JSON, XML e SQL com destaque de sintaxe.",
          "Conversores: CSV ↔ JSON, JSON ↔ YAML, JSON ↔ C#, base numérica (binário, octal, decimal, hexadecimal), timestamp e cores.",
          "Encode/Decode: Base64, URL e JWT.",
          "Utilidades: testador de regex, comparador de textos (diff), explicador de cron, preview de Markdown e padronizador de texto.",
        ],
      },
      {
        h: "Gratuito e em evolução",
        p: [
          "Todas as ferramentas são gratuitas. O projeto é mantido por desenvolvedores brasileiros e está em constante evolução — novas ferramentas e melhorias são adicionadas com frequência, muitas vezes a partir de sugestões de quem usa.",
        ],
      },
    ],
  },
  en: {
    title: "About GeraDev",
    intro:
      "GeraDev is a free collection of online tools for developers and programming students. It brings generators, formatters, converters and everyday utilities together in one place, available in Portuguese and English.",
    sections: [
      {
        h: "Why we built GeraDev",
        p: [
          "GeraDev was born from a real need: in our day-to-day development, we kept jumping between several different sites — one to format JSON, another to generate a hash, another to test a regex. The idea was to centralize everything in one place.",
          "That's why the tools here are the ones we use in our own work. Whenever we need something new often enough, we turn it into a tool and add it to GeraDev — built by developers, for developers.",
        ],
      },
      {
        h: "Our mission",
        p: [
          "We want to save time for people who code by offering fast, easy-to-use tools with no sign-up. Most of them run entirely in your browser — the data you paste or generate is never sent to a server.",
        ],
      },
      {
        h: "What you'll find",
        p: [
          "Generators: documents, secure passwords, QR codes, GUIDs, fake people and Lorem Ipsum.",
          "Formatters: JSON, XML and SQL with syntax highlighting.",
          "Converters: CSV ↔ JSON, JSON ↔ YAML, JSON ↔ C#, number base (binary, octal, decimal, hexadecimal), timestamp and colors.",
          "Encode/Decode: Base64, URL and JWT.",
          "Utilities: regex tester, text diff, cron explainer, Markdown preview and text formatter.",
        ],
      },
      {
        h: "Free and evolving",
        p: [
          "Every tool is free. The project is maintained by Brazilian developers and is constantly evolving — new tools and improvements are added often, frequently based on user suggestions.",
        ],
      },
    ],
  },
};

export default function AboutPage() {
  const { locale } = useLocale();
  const c = CONTENT[locale] || CONTENT.pt;

  return (
    <article className="w-full max-w-3xl mx-auto text-left text-default py-4">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{c.title}</h1>
      <p className="mt-6 opacity-90 leading-relaxed">{c.intro}</p>

      {c.sections.map((section) => (
        <section key={section.h} className="mt-8">
          <h2 className="text-xl font-semibold">{section.h}</h2>
          {section.p.map((paragraph, i) => (
            <p key={i} className="mt-2 opacity-80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
