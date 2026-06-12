const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const digits = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

/** Remove acentos e deixa só [a-z0-9] (para e-mails). */
function slug(text) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

const STREETS = [
  "Rua das Flores", "Avenida Brasil", "Rua São Paulo", "Avenida Paulista",
  "Rua Rio de Janeiro", "Avenida das Nações", "Rua dos Andradas", "Avenida Getúlio Vargas",
  "Rua da Paz", "Avenida Central", "Rua das Palmeiras", "Avenida dos Imigrantes",
  "Rua XV de Novembro", "Avenida Beira-Mar", "Rua do Comércio", "Avenida das Américas",
  "Rua da Praia", "Avenida Presidente Vargas", "Rua do Sol", "Avenida Rio Branco",
  "Rua das Acácias", "Avenida Nossa Senhora de Fátima", "Rua das Orquídeas", "Avenida das Rosas",
  "Rua dos Ipês", "Avenida dos Estados", "Rua da Liberdade", "Avenida da Saudade",
  "Rua dos Jasmins", "Avenida das Mangueiras", "Rua das Violetas", "Avenida dos Lírios",
  "Rua dos Coqueiros", "Avenida dos Pinheiros", "Rua dos Cajueiros", "Avenida das Azaleias",
  "Rua dos Girassóis", "Avenida das Hortênsias", "Rua dos Bem-te-vis", "Avenida dos Sabiás",
];

/**
 * Dataset por estado, garantindo coerência geográfica:
 * - cities: cidades reais daquele estado (inclui a capital)
 * - ddd: códigos de área válidos do estado
 * - cep: prefixo de 2 dígitos dentro da faixa de CEP do estado (região correta)
 */
export const STATES = [
  { uf: "SP", cep: "01", ddd: ["11", "12", "13", "14", "15", "16", "17", "18", "19"], cities: ["São Paulo", "Campinas", "Santos", "Sorocaba", "Ribeirão Preto", "São José dos Campos", "Bauru"] },
  { uf: "RJ", cep: "20", ddd: ["21", "22", "24"], cities: ["Rio de Janeiro", "Niterói", "Petrópolis", "Búzios", "Campos dos Goytacazes", "Volta Redonda"] },
  { uf: "ES", cep: "29", ddd: ["27", "28"], cities: ["Vitória", "Vila Velha", "Serra", "Cariacica"] },
  { uf: "MG", cep: "30", ddd: ["31", "32", "33", "34", "35", "37", "38"], cities: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem", "Ouro Preto", "Montes Claros"] },
  { uf: "BA", cep: "40", ddd: ["71", "73", "74", "75", "77"], cities: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Ilhéus", "Camaçari"] },
  { uf: "SE", cep: "49", ddd: ["79"], cities: ["Aracaju", "Lagarto", "Itabaiana"] },
  { uf: "PE", cep: "50", ddd: ["81", "87"], cities: ["Recife", "Olinda", "Caruaru", "Petrolina", "Jaboatão dos Guararapes"] },
  { uf: "AL", cep: "57", ddd: ["82"], cities: ["Maceió", "Arapiraca"] },
  { uf: "PB", cep: "58", ddd: ["83"], cities: ["João Pessoa", "Campina Grande"] },
  { uf: "RN", cep: "59", ddd: ["84"], cities: ["Natal", "Mossoró", "Parnamirim"] },
  { uf: "CE", cep: "60", ddd: ["85", "88"], cities: ["Fortaleza", "Juazeiro do Norte", "Sobral"] },
  { uf: "PI", cep: "64", ddd: ["86", "89"], cities: ["Teresina", "Parnaíba"] },
  { uf: "MA", cep: "65", ddd: ["98", "99"], cities: ["São Luís", "Imperatriz", "Caxias"] },
  { uf: "PA", cep: "66", ddd: ["91", "93", "94"], cities: ["Belém", "Santarém", "Marabá", "Ananindeua"] },
  { uf: "AP", cep: "68", ddd: ["96"], cities: ["Macapá", "Santana"] },
  { uf: "AM", cep: "69", ddd: ["92", "97"], cities: ["Manaus", "Parintins", "Itacoatiara"] },
  { uf: "AC", cep: "69", ddd: ["68"], cities: ["Rio Branco", "Cruzeiro do Sul"] },
  { uf: "RR", cep: "69", ddd: ["95"], cities: ["Boa Vista"] },
  { uf: "DF", cep: "70", ddd: ["61"], cities: ["Brasília", "Taguatinga", "Ceilândia"] },
  { uf: "GO", cep: "74", ddd: ["62", "64"], cities: ["Goiânia", "Anápolis", "Aparecida de Goiânia", "Rio Verde"] },
  { uf: "TO", cep: "77", ddd: ["63"], cities: ["Palmas", "Araguaína", "Gurupi"] },
  { uf: "MT", cep: "78", ddd: ["65", "66"], cities: ["Cuiabá", "Várzea Grande", "Rondonópolis"] },
  { uf: "RO", cep: "76", ddd: ["69"], cities: ["Porto Velho", "Ji-Paraná"] },
  { uf: "MS", cep: "79", ddd: ["67"], cities: ["Campo Grande", "Dourados", "Três Lagoas"] },
  { uf: "PR", cep: "80", ddd: ["41", "42", "43", "44", "45", "46"], cities: ["Curitiba", "Londrina", "Maringá", "Foz do Iguaçu", "Ponta Grossa"] },
  { uf: "SC", cep: "88", ddd: ["47", "48", "49"], cities: ["Florianópolis", "Joinville", "Blumenau", "Balneário Camboriú", "Chapecó"] },
  { uf: "RS", cep: "90", ddd: ["51", "53", "54", "55"], cities: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria", "Gramado"] },
];

const MALE_NAMES = [
  "João", "Pedro", "Lucas", "Gabriel", "Mateus", "Felipe", "Rafael", "Daniel",
  "Marcos", "Bruno", "Carlos", "Eduardo", "Thiago", "Leonardo", "André", "Gustavo",
  "Diego", "Alexandre", "Vinícius", "Ricardo", "Paulo", "Roberto", "Antônio", "José",
  "Francisco", "Sérgio", "Renato", "Fernando", "Rodrigo", "Maurício", "Vitor", "Igor",
  "Jorge", "Luiz", "Marcelo", "Caio", "Arthur", "Davi", "Samuel", "Benjamin",
  "Heitor", "Enzo", "Lorenzo", "Miguel", "Guilherme", "Nicolas", "Henrique", "Murilo",
];

const FEMALE_NAMES = [
  "Maria", "Ana", "Julia", "Laura", "Isabella", "Beatriz", "Camila", "Sofia",
  "Carolina", "Amanda", "Letícia", "Larissa", "Mariana", "Patrícia", "Cláudia", "Fernanda",
  "Adriana", "Vanessa", "Daniela", "Natália", "Olívia", "Paula", "Raquel", "Sandra",
  "Yasmin", "Alice", "Helena", "Valentina", "Lorena", "Lívia", "Manuela", "Gabriela",
  "Cecília", "Clara", "Esther", "Rebeca", "Melissa", "Vitória", "Aline", "Bianca",
  "Débora", "Elisa", "Flávia", "Giovanna", "Kelly", "Luciana", "Isabela", "Jéssica",
];

const SURNAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
  "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida",
  "Nascimento", "Barbosa", "Rocha", "Dias", "Moreira", "Cunha", "Cardoso", "Teixeira",
  "Mendes", "Freitas", "Araújo", "Correia", "Reis", "Neves", "Monteiro", "Machado",
  "Melo", "Nunes", "Ramos", "Pinto", "Farias", "Barros", "Vieira", "Borges",
  "Lopes", "Andrade", "Batista", "Campos", "Marques", "Miranda", "Moraes", "Nogueira",
];

/**
 * Gera nome com partes (para derivar e-mail coerente).
 * Retorna { gender, firstName, surnames: [s1, s2], fullName }.
 */
export function generateName(gender = null) {
  const chosen = gender || (Math.random() > 0.5 ? "M" : "F");
  const firstName = pick(chosen === "M" ? MALE_NAMES : FEMALE_NAMES);

  // Dois sobrenomes distintos
  const surname1 = pick(SURNAMES);
  let surname2 = pick(SURNAMES);
  while (surname2 === surname1) surname2 = pick(SURNAMES);

  return {
    gender: chosen,
    firstName,
    surnames: [surname1, surname2],
    fullName: `${firstName} ${surname1} ${surname2}`,
  };
}

export function generateAge(min = 18, max = 80) {
  return randInt(min, max);
}

/**
 * E-mail realista a partir do nome: sem acentos, minúsculo, usando primeiro
 * nome + um sobrenome em formatos comuns (às vezes com número).
 */
export function generateEmail(name) {
  const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com.br", "icloud.com"];
  const first = slug(name.firstName);
  const last = slug(name.surnames[0]);

  const local = pick([
    `${first}.${last}`,
    `${first}${last}`,
    `${first}_${last}`,
    `${first}.${last}${randInt(1, 99)}`,
    `${first}${randInt(1, 9999)}`,
    `${first}.${slug(name.surnames[1])}`,
  ]);

  return `${local}@${pick(domains)}`;
}

/**
 * Localização coerente: escolhe um estado e, dentro dele, uma cidade real,
 * um DDD válido e um CEP da região correta. Também devolve o `ddd` para
 * o telefone ficar consistente com o endereço.
 */
export function generateLocation() {
  const state = pick(STATES);
  const cep = `${state.cep}${digits(3)}-${digits(3)}`;

  return {
    street: `${pick(STREETS)}, ${randInt(1, 2000)}`,
    city: pick(state.cities),
    state: state.uf,
    zipCode: cep,
    ddd: pick(state.ddd),
  };
}

/**
 * Telefone celular válido: (DD) 9XXXX-XXXX. Usa o DDD informado (coerente
 * com o endereço) ou sorteia um genérico.
 */
export function generatePhone(ddd) {
  const area = ddd || pick(["11", "21", "31", "41", "51", "61", "71", "81", "85"]);
  const number = `9${digits(8)}`;
  return `(${area}) ${number.substring(0, 5)}-${number.substring(5)}`;
}
