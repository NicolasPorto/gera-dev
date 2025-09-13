import { useState, useEffect } from "react";
import { generateCPF, generateRG, formatCPF, formatRG } from "../utils/documents";
import { generateAddress, generateName, generateAge, generateEmail, generatePhone } from "../utils/person";
import { useTranslation } from 'react-i18next';

export default function PersonGenerator() {
    const [person, setPerson] = useState(null);
    const [gender, setGender] = useState('random');
    const [copied, setCopied] = useState(false);
    const [copiedField, setCopiedField] = useState(null);
    const [hoverRefresh, setHoverRefresh] = useState(false);
    const { t } = useTranslation();

    const generatePerson = () => {
        const fullName = generateName(gender === 'random' ? null : gender);
        const age = generateAge();
        const email = generateEmail(fullName);
        const phone = generatePhone();
        const address = generateAddress();
        const cpf = formatCPF(generateCPF());
        const rg = formatRG(generateRG());

        setPerson({
            name: fullName,
            age: age,
            email,
            phone: phone,
            address: `${address.street}, ${address.city} - ${address.state}, ${t("CEP")}: ${address.zipCode}`,
            cpf,
            rg
        });
    };

    const copy = (field, value) => {
        if (!person) return;

        navigator.clipboard.writeText(value);
        setCopied(true);
        setCopiedField(field);

        setTimeout(() => {
            setCopied(false);
            setCopiedField(null);
        }, 2000);
    };

    const copyAll = () => {
        if (!person) return;

        const texto = `
            Nome: ${person.name}
            Idade: ${person.age} ${t("Anos")}
            Email: ${person.email}
            Telefone: ${person.phone}
            Endereço: ${person.address}
            CPF: ${person.cpf}
            RG: ${person.rg}
        `.trim();

        navigator.clipboard.writeText(texto);
        setCopied(true);
        setCopiedField('tudo');

        setTimeout(() => {
            setCopied(false);
            setCopiedField(null);
        }, 2000);
    };

    useEffect(() => {
        generatePerson();
    }, []);

    return (
        <div className="p-4 flex flex-col items-center gap-6 w-full max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <div className="relative group">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setGender("random")}
                            className={`px-3 py-1 rounded-lg font-medium ${gender === "random" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                        >
                            {t("Aleatorio")}
                        </button>
                        <button
                            onClick={() => setGender("M")}
                            className={`px-3 py-1 rounded-lg font-medium ${gender === "M" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                        >
                            {t("Masculino")}
                        </button>
                        <button
                            onClick={() => setGender("F")}
                            className={`px-3 py-1 rounded-lg font-medium ${gender === "F" ? "default-button" : "default-button-transparent border border-purple-600"}`}
                        >
                            {t("Feminino")}
                        </button>
                    </div>
                </div>
            </div>

            {person && (
                <div className="w-full bg-opacity-20 bg-purple-200/10 rounded-lg border-2 p-6 border-purple-400">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-default">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-semibold">{t("Nome")}:</span>
                                    <p className="text-lg">{person.name}</p>
                                </div>
                                <button
                                    onClick={() => copy('nome', person.name)}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} ${t("Nome")}`}
                                >
                                    {copiedField === 'nome' ? (
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
                                    <span className="font-semibold">{t("Idade")}:</span>
                                    <p>{person.age} {t("Anos")}</p>
                                </div>
                                <button
                                    onClick={() => copy('idade', person.age.toString())}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} ${t("Idade")}`}
                                >
                                    {copiedField === 'idade' ? (
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
                                    <p>{person.email}</p>
                                </div>
                                <button
                                    onClick={() => copy('email', person.email)}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} Email`}
                                >
                                    {copiedField === 'email' ? (
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
                                    <span className="font-semibold">{t("Telefone")}:</span>
                                    <p>{person.phone}</p>
                                </div>
                                <button
                                    onClick={() => copy('telefone', person.phone)}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} ${t("Telefone")}`}
                                >
                                    {copiedField === 'telefone' ? (
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
                                    <span className="font-semibold">{t("Endereco")}:</span>
                                    <p>{person.address}</p>
                                </div>
                                <button
                                    onClick={() => copy('endereco', person.address)}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} ${t("Endereco")}`}
                                >
                                    {copiedField === 'endereco' ? (
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
                                    <p>{person.cpf}</p>
                                </div>
                                <button
                                    onClick={() => copy('cpf', person.cpf)}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} CPF`}
                                >
                                    {copiedField === 'cpf' ? (
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
                                    <p>{person.rg}</p>
                                </div>
                                <button
                                    onClick={() => copy('rg', person.rg)}
                                    className="p-2 rounded ml-2 default-button-transparent"
                                    title={`${t("Copiar")} RG`}
                                >
                                    {copiedField === 'rg' ? (
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

            <div className="p-4 flex flex-col items-center gap-6">
                <div className="flex gap-4">
                    <div className="relative group">
                        <button
                            onClick={generatePerson}
                            onMouseEnter={() => setHoverRefresh(true)}
                            onMouseLeave={() => setHoverRefresh(false)}
                            className="default-button px-4 py-2 rounded font-medium flex items-center justify-center gap-2"
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
                            {t("Recarregar")}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                    <div className="relative group">
                        <button
                            onClick={copyAll}
                            disabled={!person}
                            className={`default-button px-4 py-2 rounded flex items-center justify-center ${!person ? 'default-button-inactive opacity-50' : ''}`}
                        >
                            {copiedField === 'tudo' ? (
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
                            {t("Copiar")}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}