export function generateAddress() {
    const streets = [
        'Rua das Flores', 'Avenida Brasil', 'Rua São Paulo', 'Avenida Paulista',
        'Rua Rio de Janeiro', 'Avenida das Nações', 'Rua dos Andradas', 'Avenida Getúlio Vargas',
        'Rua da Paz', 'Avenida Central', 'Rua das Palmeiras', 'Avenida dos Imigrantes',
        'Rua XV de Novembro', 'Avenida Beira-Mar', 'Rua do Comércio', 'Avenida das Américas',
        'Rua da Praia', 'Avenida Presidente Vargas', 'Rua do Sol', 'Avenida Rio Branco',
        'Rua das Acácias', 'Avenida Nossa Senhora de Fátima', 'Rua das Orquídeas', 'Avenida das Rosas',
        'Rua dos Ipês', 'Avenida dos Estados', 'Rua da Liberdade', 'Avenida da Saudade',
        'Rua dos Jasmins', 'Avenida das Mangueiras', 'Rua das Violetas', 'Avenida dos Lírios',
        'Rua dos Coqueiros', 'Avenida dos Pinheiros', 'Rua dos Cajueiros', 'Avenida das Azaleias',
        'Rua dos Girassóis', 'Avenida das Hortênsias', 'Rua dos Bem-te-vis', 'Avenida dos Sabiás',
        'Rua dos Canários', 'Avenida dos Colibris', 'Rua dos Beija-flores', 'Avenida dos Pardais',
        'Rua dos Tico-ticos', 'Avenida dos Sanhaços', 'Rua dos Corruíras', 'Avenida dos Joões-de-barro',
        'Rua dos Sabiás-laranjeira', 'Avenida dos Bem-te-vis', 'Rua dos Curiós', 'Avenida dos Coleiros'
    ];

    const cities = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba',
        'Salvador', 'Recife', 'Fortaleza', 'Brasília', 'Goiânia', 'Manaus', 'Belém',
        'São Luís', 'Teresina', 'Natal', 'João Pessoa', 'Maceió', 'Aracaju', 'Campo Grande',
        'Cuiabá', 'Florianópolis', 'Vitória', 'São José dos Campos', 'Campinas', 'Santos',
        'Ribeirão Preto', 'Sorocaba', 'Osasco', 'São Bernardo do Campo', 'São José do Rio Preto',
        'Uberlândia', 'Londrina', 'Joinville', 'Niterói', 'Bauru', 'Feira de Santana',
        'Anápolis', 'Juiz de Fora', 'Maringá', 'Caxias do Sul', 'Pelotas', 'Canela', 'Gramado',
        'Petrópolis', 'Campos do Jordão', 'Ouro Preto', 'Tiradentes', 'Paraty', 'Búzios',
        'Balneário Camboriú', 'Foz do Iguaçu', 'Jericoacoara', 'Bonito', 'Chapada dos Veadeiros',
        'Lençóis Maranhenses', 'Fernando de Noronha', 'Porto de Galinhas', 'Garopaba', 'Trancoso'
    ];

    const states = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    const street = streets[Math.floor(Math.random() * streets.length)];
    const number = Math.floor(Math.random() * 1000) + 1;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zipCode = Math.floor(10000000 + Math.random() * 90000000);

    return {
        street: `${street}, ${number}`,
        city: city,
        state: state,
        zipCode: `${zipCode.toString().substring(0, 5)}-${zipCode.toString().substring(5)}`
    };
}

export function generateName(gender = null) {
    const maleNames = [
        'João', 'Pedro', 'Lucas', 'Gabriel', 'Mateus', 'Felipe', 'Rafael', 'Daniel',
        'Marcos', 'Bruno', 'Carlos', 'Eduardo', 'Thiago', 'Leonardo', 'André', 'Gustavo',
        'Diego', 'Alexandre', 'Vinícius', 'Ricardo', 'Paulo', 'Roberto', 'Antônio', 'José',
        'Francisco', 'Márcio', 'Sérgio', 'Renato', 'Fernando', 'Rodrigo', 'Maurício', 'Wagner',
        'Alex', 'Leandro', 'César', 'Vitor', 'Igor', 'Jorge', 'Luiz', 'Marcelo', 'Ronaldo',
        'Adriano', 'Julio', 'Mário', 'Wilson', 'Douglas', 'Raul', 'Hugo', 'Otávio', 'Caio',
        'Erick', 'Arthur', 'Davi', 'Samuel', 'Benjamin', 'Heitor', 'Enzo', 'Lorenzo', 'Miguel',
        'Guilherme', 'Nicolas', 'Henrique', 'Murilo', 'Eduardo', 'Vinicius', 'Ryan', 'Breno'
    ];

    const femaleNames = [
        'Maria', 'Ana', 'Julia', 'Laura', 'Isabella', 'Beatriz', 'Camila', 'Sofia',
        'Carolina', 'Amanda', 'Letícia', 'Larissa', 'Mariana', 'Patrícia', 'Claudia', 'Fernanda',
        'Adriana', 'Vanessa', 'Priscila', 'Tatiane', 'Cristina', 'Daniela', 'Elaine', 'Érica',
        'Fabiana', 'Gisele', 'Isabela', 'Jéssica', 'Kátia', 'Luciana', 'Monique', 'Natália',
        'Olivia', 'Paula', 'Raquel', 'Sandra', 'Tânia', 'Verônica', 'Yasmin', 'Alice',
        'Helena', 'Valentina', 'Lorena', 'Lívia', 'Manuela', 'Emanuelly', 'Agatha', 'Gabriela',
        'Cecília', 'Clara', 'Esther', 'Rebeca', 'Isis', 'Melissa', 'Lavínia', 'Vitória',
        'Aline', 'Bianca', 'Débora', 'Elisa', 'Flávia', 'Giovanna', 'Júlia', 'Kelly'
    ];

    const surnames = [
        'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
        'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida',
        'Nascimento', 'Barbosa', 'Rocha', 'Dias', 'Moreira', 'Cunha', 'Cardoso', 'Teixeira',
        'Mendes', 'Freitas', 'Araújo', 'Correia', 'Reis', 'Neves', 'Monteiro', 'Machado',
        'Medeiros', 'Melo', 'Nunes', 'Ramos', 'Pinto', 'Farias', 'Barros', 'Vieira',
        'Borges', 'Xavier', 'Lopes', 'Andrade', 'Batista', 'Campos', 'Cavalcanti', 'Duarte',
        'Galvão', 'Marques', 'Miranda', 'Moraes', 'Nogueira', 'Peixoto', 'Quintino', 'Sampaio',
        'Tavares', 'Viana', 'Zanette', 'Abreu', 'Brito', 'Castro', 'Donato', 'Espindola',
        'Fontes', 'Guerra', 'Holanda', 'Ibrahim', 'Junqueira', 'Klein', 'Leal', 'Maciel'
    ];

    const genderChosen = gender || (Math.random() > 0.5 ? 'M' : 'F');
    const names = genderChosen === 'M' ? maleNames : femaleNames;

    const name = names[Math.floor(Math.random() * names.length)];
    const surname1 = surnames[Math.floor(Math.random() * surnames.length)];
    const surname2 = surnames[Math.floor(Math.random() * surnames.length)];

    return `${name} ${surname1} ${surname2}`;
}

export function generateAge(min = 18, max = 80) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateEmail(nome) {
    const domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
    const formattedName = nome.toLowerCase().replace(/\s+/g, '.');
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${formattedName}@${domain}`;
}

export function generatePhone() {
    const ddd = ['11', '21', '31', '41', '51', '61', '71', '81', '91'];
    const number = Math.floor(100000000 + Math.random() * 900000000).toString();
    const chosenDDD = ddd[Math.floor(Math.random() * ddd.length)];
    return `(${chosenDDD}) ${number.substring(0, 5)}-${number.substring(5)}`;
}
