import { useState, useEffect } from "react";
import { gerarCPF, gerarRG, formatarCPF, formatarRG } from "../utils/documentos";
import { gerarEndereco, gerarNome, gerarIdade, gerarEmail, gerarTelefone } from "../utils/pessoa";

export default function PessoaGenerator() {
    const [pessoa, setPessoa] = useState(null);
    const [sexo, setSexo] = useState('aleatorio');
    const [copiado, setCopiado] = useState(false);
    const [campoCopiado, setCampoCopiado] = useState(null);
    const [hoverRefresh, setHoverRefresh] = useState(false);

    const gerarPessoa = () => {
        const nomeCompleto = gerarNome(sexo === 'aleatorio' ? null : sexo);
        const idade = gerarIdade();
        const email = gerarEmail(nomeCompleto);
        const telefone = gerarTelefone();
        const endereco = gerarEndereco();
        const cpf = formatarCPF(gerarCPF());
        const rg = formatarRG(gerarRG());

        setPessoa({
            nome: nomeCompleto,
            idade,
            email,
            telefone,
            endereco: `${endereco.rua}, ${endereco.cidade} - ${endereco.estado}, CEP: ${endereco.cep}`,
            cpf,
            rg
        });
    };

    const copiarParaAreaTransferencia = (campo, valor) => {
        if (!pessoa) return;

        navigator.clipboard.writeText(valor);
        setCopiado(true);
        setCampoCopiado(campo);

        setTimeout(() => {
            setCopiado(false);
            setCampoCopiado(null);
        }, 2000);
    };

    const copiarTudo = () => {
        if (!pessoa) return;

        const texto = `
            Nome: ${pessoa.nome}
            Idade: ${pessoa.idade} anos
            Email: ${pessoa.email}
            Telefone: ${pessoa.telefone}
            Endereço: ${pessoa.endereco}
            CPF: ${pessoa.cpf}
            RG: ${pessoa.rg}
        `.trim();

        navigator.clipboard.writeText(texto);
        setCopiado(true);
        setCampoCopiado('tudo');

        setTimeout(() => {
            setCopiado(false);
            setCampoCopiado(null);
        }, 2000);
    };

    useEffect(() => {
        gerarPessoa();
    }, []);

    return (
        <div className="p-4 flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <div class="relative group">
                    <div className="flex items-center gap-2">
                        <span class="text-default text-sm font-medium mr-2">Sexo:</span>
                        <div class="relative group">
                            <select
                                value={sexo}
                                onChange={(e) => setSexo(e.target.value)}
                                class="
                                botao-padrao 
                                px-4 
                                pr-10 
                                py-2 
                                rounded font-medium 
                                cursor-pointer 
                                transition-all 
                                appearance-none 
                                focus:ring-2 focus:ring-purple-400 
                                focus:outline-none"
                            >
                                <option value="aleatorio">Aleatório</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative group">
                    <button
                        onClick={gerarPessoa}
                        onMouseEnter={() => setHoverRefresh(true)}
                        onMouseLeave={() => setHoverRefresh(false)}
                        className="botao-padrao px-4 py-2 rounded font-medium flex items-center justify-center gap-2"
                    >
                        <svg
                            className={`w-6 h-6 ${hoverRefresh ? 'animate-spin' : ''}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        Refresh
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
                <div className="relative group">
                    <button
                        onClick={copiarTudo}
                        disabled={!pessoa}
                        className={`botao-padrao px-4 py-2 rounded flex items-center justify-center ${!pessoa ? 'botao-padrao-desativado opacity-50' : ''}`}
                    >
                        {campoCopiado === 'tudo' ? (
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        Copiar tudo
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
            </div>

            {pessoa && (
                <div className="w-full bg-opacity-20 bg-purple-200/10 rounded-lg p-6 border border-purple-400">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-default">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">Nome:</span>
                                    <p className="text-lg">{pessoa.nome}</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('nome', pessoa.nome)}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar nome"
                                >
                                    {campoCopiado === 'nome' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">Idade:</span>
                                    <p>{pessoa.idade} anos</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('idade', pessoa.idade.toString())}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar idade"
                                >
                                    {campoCopiado === 'idade' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">Email:</span>
                                    <p>{pessoa.email}</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('email', pessoa.email)}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar email"
                                >
                                    {campoCopiado === 'email' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">Telefone:</span>
                                    <p>{pessoa.telefone}</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('telefone', pessoa.telefone)}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar telefone"
                                >
                                    {campoCopiado === 'telefone' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">Endereço:</span>
                                    <p>{pessoa.endereco}</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('endereco', pessoa.endereco)}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar endereço"
                                >
                                    {campoCopiado === 'endereco' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">CPF:</span>
                                    <p>{pessoa.cpf}</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('cpf', pessoa.cpf)}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar CPF"
                                >
                                    {campoCopiado === 'cpf' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">RG:</span>
                                    <p>{pessoa.rg}</p>
                                </div>
                                <button
                                    onClick={() => copiarParaAreaTransferencia('rg', pessoa.rg)}
                                    className="p-2 rounded ml-2 botao-padrao-transparente"
                                    title="Copiar RG"
                                >
                                    {campoCopiado === 'rg' ? (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z" clipRule="evenodd" />
                                            <path fillRule="evenodd" d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}