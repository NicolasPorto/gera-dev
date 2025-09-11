function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <svg
                className="w-20 h-20 text-default mb-8"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                    clipRule="evenodd"
                />
            </svg>

            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-default mb-6">
                    GeraDev Tools
                </h1>

                <p className="text-default mb-4 leading-relaxed">
                    Plataforma dedicada a fornecer ferramentas úteis para geração
                    e formatação de dados, auxiliando desenvolvedores e estudantes
                    em seus projetos e testes.
                </p>


                <div className="w-full p-4 bg-purple-200/10 rounded-lg border-2 border-gray-300/20 infos-white-theme">
                    <p className="text-default text-sm text-center ">
                        🛡️ Aviso importante: Estas ferramentas são para fins
                        educacionais e de desenvolvimento. O uso inadequado
                        é de responsabilidade do usuário.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;