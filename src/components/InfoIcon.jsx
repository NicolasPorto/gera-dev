function InfoIcon() {
    return (
        <div className="relative group inline-flex items-center">
            <svg 
                className="w-5 h-5 text-default ml-2 cursor-help opacity-70 hover:opacity-100 transition-opacity" 
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

            <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <p>
                    🛡️ Ferramentas para fins educacionais e de desenvolvimento. 
                    Uso inadequado é de responsabilidade do usuário.
                </p>
            </div>
        </div>
    );
}

export default InfoIcon;