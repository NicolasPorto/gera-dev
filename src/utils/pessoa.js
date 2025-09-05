export function gerarEndereco() {
    const ruas = [
        'Rua das Flores', 'Avenida Brasil', 'Rua São Paulo', 'Avenida Paulista',
        'Rua Rio de Janeiro', 'Avenida das Nações', 'Rua dos Andradas', 'Avenida Getúlio Vargas'
    ];

    const cidades = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 'Curitiba',
        'Salvador', 'Recife', 'Fortaleza', 'Brasília', 'Goiânia'
    ];

    const estados = ['SP', 'RJ', 'MG', 'RS', 'PR', 'BA', 'PE', 'CE', 'DF', 'GO'];

    const rua = ruas[Math.floor(Math.random() * ruas.length)];
    const numero = Math.floor(Math.random() * 1000) + 1;
    const cidade = cidades[Math.floor(Math.random() * cidades.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const cep = Math.floor(10000000 + Math.random() * 90000000);

    return {
        rua: `${rua}, ${numero}`,
        cidade,
        estado,
        cep: `${cep.toString().substring(0, 5)}-${cep.toString().substring(5)}`
    };
}

export function gerarNome(sexo = null) {
    const nomesMasculinos = [
        'João', 'Pedro', 'Lucas', 'Gabriel', 'Mateus', 'Felipe', 'Rafael', 'Daniel',
        'Marcos', 'Bruno', 'Carlos', 'Eduardo', 'Thiago', 'Leonardo', 'André', 'Gustavo'
    ];

    const nomesFemininos = [
        'Maria', 'Ana', 'Julia', 'Laura', 'Isabella', 'Beatriz', 'Camila', 'Sofia',
        'Carolina', 'Amanda', 'Letícia', 'Larissa', 'Mariana', 'Patrícia', 'Claudia', 'Fernanda'
    ];

    const sobrenomes = [
        'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
        'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida'
    ];

    const sexoEscolhido = sexo || (Math.random() > 0.5 ? 'M' : 'F');
    const nomes = sexoEscolhido === 'M' ? nomesMasculinos : nomesFemininos;

    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome1 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const sobrenome2 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

    return `${nome} ${sobrenome1} ${sobrenome2}`;
}

export function gerarIdade(min = 18, max = 80) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gerarEmail(nome) {
    const dominios = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
    const nomeFormatado = nome.toLowerCase().replace(/\s+/g, '.');
    const dominio = dominios[Math.floor(Math.random() * dominios.length)];
    return `${nomeFormatado}@${dominio}`;
}

export function gerarTelefone() {
    const ddd = ['11', '21', '31', '41', '51', '61', '71', '81', '91'];
    const numero = Math.floor(100000000 + Math.random() * 900000000).toString();
    const dddEscolhido = ddd[Math.floor(Math.random() * ddd.length)];
    return `(${dddEscolhido}) ${numero.substring(0, 5)}-${numero.substring(5)}`;
}
