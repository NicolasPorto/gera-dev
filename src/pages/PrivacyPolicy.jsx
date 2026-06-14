import { useLocale } from "../hooks/useLocale";

const CONTENT = {
  pt: {
    title: "Política de Privacidade",
    updated: "Última atualização: 13 de junho de 2026",
    intro:
      "Esta Política de Privacidade descreve como o GeraDev (geradev.com.br) trata informações ao utilizar nossas ferramentas. Nosso compromisso é com a transparência: a maioria das ferramentas funciona inteiramente no seu navegador, sem enviar seus dados para servidores.",
    sections: [
      {
        h: "Informações que coletamos",
        p: [
          "O GeraDev não exige cadastro e não coleta dados pessoais identificáveis para o funcionamento das ferramentas. Os dados que você cola ou gera (JSON, XML, textos, senhas, etc.) são processados localmente no seu navegador e não são enviados nem armazenados por nós.",
          "Coletamos apenas estatísticas de uso agregadas e anônimas (páginas visitadas, idioma, tipo de dispositivo) para entender como o site é usado e melhorá-lo.",
        ],
      },
      {
        h: "Cookies e publicidade (Google AdSense)",
        p: [
          "Utilizamos o Google AdSense para exibir anúncios. Fornecedores terceiros, incluindo o Google, usam cookies para veicular anúncios com base em visitas anteriores do usuário a este e a outros sites.",
          "O cookie DART do Google permite veicular anúncios aos usuários com base nas visitas a este e a outros sites na internet.",
          "Você pode desativar a publicidade personalizada nas Configurações de anúncios do Google (google.com/settings/ads). Também é possível desativar os cookies de fornecedores terceiros em www.aboutads.info/choices.",
        ],
      },
      {
        h: "Análise de tráfego",
        p: [
          "Usamos o Simple Analytics, uma ferramenta de análise que respeita a privacidade e não utiliza cookies nem coleta dados pessoais. As métricas são agregadas e anônimas.",
        ],
      },
      {
        h: "Links para terceiros",
        p: [
          "Nosso site pode conter links para sites externos. Não somos responsáveis pelas práticas de privacidade desses sites e recomendamos a leitura das respectivas políticas.",
        ],
      },
      {
        h: "Privacidade de crianças",
        p: [
          "O GeraDev não é direcionado a menores de 13 anos e não coletamos intencionalmente informações de crianças.",
        ],
      },
      {
        h: "Alterações nesta política",
        p: [
          "Podemos atualizar esta política periodicamente. Alterações serão publicadas nesta página com a data de atualização revisada.",
        ],
      },
      {
        h: "Contato",
        p: [
          "Em caso de dúvidas sobre esta Política de Privacidade, entre em contato pelo perfil do desenvolvedor no GitHub: github.com/NicolasPorto.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: June 13, 2026",
    intro:
      "This Privacy Policy describes how GeraDev (geradev.com.br) handles information when you use our tools. We are committed to transparency: most tools run entirely in your browser and never send your data to any server.",
    sections: [
      {
        h: "Information we collect",
        p: [
          "GeraDev requires no sign-up and does not collect personally identifiable information to operate its tools. The data you paste or generate (JSON, XML, text, passwords, etc.) is processed locally in your browser and is neither sent to nor stored by us.",
          "We only collect aggregated, anonymous usage statistics (pages visited, language, device type) to understand how the site is used and to improve it.",
        ],
      },
      {
        h: "Cookies and advertising (Google AdSense)",
        p: [
          "We use Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this and other websites.",
          "Google's use of the DART cookie enables it to serve ads to users based on their visits to this and other sites on the Internet.",
          "You may opt out of personalized advertising through Google Ads Settings (google.com/settings/ads). You can also opt out of third-party vendors' use of cookies at www.aboutads.info/choices.",
        ],
      },
      {
        h: "Analytics",
        p: [
          "We use Simple Analytics, a privacy-friendly analytics tool that uses no cookies and collects no personal data. Metrics are aggregated and anonymous.",
        ],
      },
      {
        h: "Third-party links",
        p: [
          "Our site may contain links to external websites. We are not responsible for the privacy practices of those sites and encourage you to read their policies.",
        ],
      },
      {
        h: "Children's privacy",
        p: [
          "GeraDev is not directed to children under 13, and we do not knowingly collect information from children.",
        ],
      },
      {
        h: "Changes to this policy",
        p: [
          "We may update this policy from time to time. Changes will be posted on this page with a revised update date.",
        ],
      },
      {
        h: "Contact",
        p: [
          "If you have questions about this Privacy Policy, reach out via the developer's GitHub profile: github.com/NicolasPorto.",
        ],
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const { locale } = useLocale();
  const c = CONTENT[locale] || CONTENT.pt;

  return (
    <article className="w-full max-w-3xl mx-auto text-left text-default py-4">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{c.title}</h1>
      <p className="text-sm opacity-60 mt-1">{c.updated}</p>
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
