import { useLocale } from "../hooks/useLocale";

const DEVS = [
  { name: "Nicolas Porto", url: "https://github.com/NicolasPorto" },
  { name: "Luis Venturini", url: "https://github.com/LuisQuintino" },
];

const CONTENT = {
  pt: {
    title: "Contato",
    intro:
      "Tem uma sugestão, encontrou um problema ou quer pedir uma ferramenta nova? Adoramos receber feedback — boa parte do GeraDev nasce de pedidos de quem usa.",
    devsTitle: "Fale com os desenvolvedores",
    devsText:
      "A melhor forma de entrar em contato é pelo GitHub dos desenvolvedores, onde você pode abrir uma issue ou enviar uma sugestão:",
    suggestTitle: "Sugira uma ferramenta",
    suggestText:
      "Sentiu falta de alguma ferramenta no seu dia a dia de desenvolvimento? Conte pra gente: avaliamos cada pedido e priorizamos as ideias mais úteis para a comunidade.",
  },
  en: {
    title: "Contact",
    intro:
      "Have a suggestion, found an issue or want to request a new tool? We love feedback — much of GeraDev comes from requests by the people who use it.",
    devsTitle: "Reach the developers",
    devsText:
      "The best way to get in touch is through the developers' GitHub, where you can open an issue or send a suggestion:",
    suggestTitle: "Suggest a tool",
    suggestText:
      "Missing a tool in your daily development workflow? Let us know: we review every request and prioritize the ideas most useful to the community.",
  },
};

export default function ContactPage() {
  const { locale } = useLocale();
  const c = CONTENT[locale] || CONTENT.pt;

  return (
    <article className="w-full max-w-3xl mx-auto text-left text-default py-4">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{c.title}</h1>
      <p className="mt-6 opacity-90 leading-relaxed">{c.intro}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{c.devsTitle}</h2>
        <p className="mt-2 opacity-80 leading-relaxed">{c.devsText}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {DEVS.map((dev) => (
            <li key={dev.url}>
              <a
                href={dev.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline font-medium"
              >
                {dev.name} — {dev.url.replace("https://", "")}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">{c.suggestTitle}</h2>
        <p className="mt-2 opacity-80 leading-relaxed">{c.suggestText}</p>
      </section>
    </article>
  );
}
