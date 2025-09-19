import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function OvertimeCalculator() {
    const { t } = useTranslation();
    const [salary, setSalary] = useState("");
    const [percent, setPercent] = useState(50);

    const [useTime, setUseTime] = useState(false);

    const [hours, setHours] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startTimeError, setStartTimeError] = useState(false);
    const [endTimeError, setEndTimeError] = useState(false);

    const [result, setResult] = useState(null);

    const clear = () => {
        setResult(null);
        setSalary("");
        setPercent(50);
        setHours("");
        setStartTime("");
        setEndTime("");
    };

    const clearHours = () => {
        setHours("");
        setStartTime("");
        setEndTime("");
        setStartTimeError(false)
        setEndTimeError(false)
    };

    const isValidTime = (time) => {
        const [h, m] = time.split(":").map(Number);
        if (!h && h !== 0) return false;
        if (!m && m !== 0) return false;
        if (isNaN(h) || isNaN(m)) return false;
        if (h < 0 || h > 23 || m < 0 || m > 59) return false;
        return true;
    };

    const hoursStringToDecimal = (time) => {
        if (!time) return 0;
        const [h, m] = time.split(":").map(Number);
        if (isNaN(h) || isNaN(m)) return 0;
        return h + m / 60;
    };

    const calculateHours = () => {
        if (!useTime) {
            return hoursStringToDecimal(hours);
        }

        if (!startTime || !endTime) return 0;

        if (!isValidTime(startTime) || !isValidTime(endTime)) return 0;

        const [startH, startM] = startTime.split(":").map(Number);
        const [endH, endM] = endTime.split(":").map(Number);

        if (
            isNaN(startH) || isNaN(startM) || startH > 23 || startM > 59 ||
            isNaN(endH) || isNaN(endM) || endH > 23 || endM > 59
        ) return 0;

        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;

        let diff = endTotal - startTotal;
        if (diff < 0) diff += 24 * 60;

        return diff / 60;
    };

    const calculateOvertime = () => {
        if (!salary) return;

        const workedHours = calculateHours();
        if (!workedHours || workedHours <= 0) return;

        const monthlyHours = 220;
        const hourlyRate = parseFloat(salary) / monthlyHours;

        const overtimeRate = hourlyRate * (1 + percent / 100);
        const overtimePay = overtimeRate * workedHours;

        const regularPay = parseFloat(salary);
        const totalPay = regularPay + overtimePay;

        setResult({
            hours: useTime ? decimalToHHMM(workedHours) : hours,
            hourlyRate: hourlyRate.toFixed(2),
            overtimeRate: overtimeRate.toFixed(2),
            overtimePay: overtimePay.toFixed(2),
            regularPay: regularPay.toFixed(2),
            totalPay: totalPay.toFixed(2),
        });
    };

    const decimalToHHMM = (decimal) => {
        const h = Math.floor(decimal);
        const m = Math.round((decimal - h) * 60);
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    };

    const formatTimeInput = (value) => {
        let val = value.replace(/\D/g, "");

        if (val.length > 4) val = val.slice(-4);

        val = val.padStart(4, "0");

        const h = val.slice(0, 2);
        const m = val.slice(2);

        return `${h}:${m}`;
    };
    const isButtonDisabled = !salary || (useTime && (!startTime || !endTime)) || (!useTime && !hours) || startTimeError || endTimeError;

    return (
        <div className="p-4 flex flex-col items-center gap-6 w-full">
            <div className="info-card">
                <p className="info-text">
                    💡 {t("InfoHoraExtra")}
                </p>
            </div>

            <div className="w-full max-w-md flex flex-col gap-4">

                <div className="flex flex-col sm:flex-row items-center justify-center w-full mb-1 gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => { setUseTime(true), clearHours() }}
                            className={`px-3 py-1 rounded-lg font-medium ${useTime ? "default-button" : "default-button-transparent border border-purple-600"}`}
                        >
                            {t("Hora início/fim")}
                        </button>
                        <button
                            onClick={() => { setUseTime(false), clearHours() }}
                            className={`px-3 py-1 rounded-lg font-medium ${!useTime ? "default-button" : "default-button-transparent border border-purple-600"}`}
                        >
                            {t("Quantidade de horas")}
                        </button>
                    </div>
                </div>

                {!useTime ? (
                    <div>
                        <label className="block text-default font-medium mb-1">{t("Horas Trabalhadas")}</label>
                        <input
                            type="text"
                            value={hours}
                            onChange={(e) => {
                                const val = formatTimeInput(e.target.value);
                                setHours(val);
                                setStartTimeError(val.length === 5 ? !isValidTime(val) : false);
                            }}
                            placeholder="HH:MM"
                            className={`w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none transition-all textarea-text-color textarea-white-theme
                                ${startTimeError ? "border-red-500" : "border-gray-300/20"} 
                                bg-purple-200/10 focus:border-purple-400`}
                        />
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <label className="block text-default font-medium mb-1">{t("Hora Início")}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={startTime}
                                    onChange={(e) => {
                                        const val = formatTimeInput(e.target.value);
                                        setStartTime(val);
                                        setStartTimeError(val.length === 5 ? !isValidTime(val) : false);
                                    }}
                                    placeholder="HH:MM"
                                    className={`w-full p-4 pl-10 border-2 rounded-lg font-mono text-sm focus:outline-none transition-all textarea-text-color textarea-white-theme
                                    ${startTimeError ? "border-red-500" : "border-gray-300/20"} 
                                    bg-purple-200/10 focus:border-purple-400`}
                                />
                                <i className="fa-regular fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-purple-600"></i>
                            </div>
                        </div>
                        <div className="relative flex-1">
                            <label className="block text-default font-medium mb-1">{t("Hora Fim")}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={endTime}
                                    onChange={(e) => {
                                        const val = formatTimeInput(e.target.value);
                                        setEndTime(val);
                                        setEndTimeError(val.length === 5 ? !isValidTime(val) : false);
                                    }}
                                    placeholder="HH:MM"
                                    className={`w-full p-4 pl-10 border-2 rounded-lg font-mono text-sm focus:outline-none transition-all textarea-text-color textarea-white-theme
                                        ${endTimeError ? "border-red-500" : "border-gray-300/20"} 
                                        bg-purple-200/10 focus:border-purple-400`}
                                />
                                <i className="fa-regular fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-purple-600"></i>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-default font-medium mb-1">{t("Salário Mensal (R$)")}</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Ex: 3000"
                        className="w-full p-4 border-2 rounded-lg font-mono text-sm focus:outline-none transition-all textarea-text-color textarea-white-theme border-gray-300/20 bg-purple-200/10 focus:border-purple-400"
                    />
                </div>

                <div>
                    <label className="block text-default font-medium mb-2">
                        {t("Percentual Adicional")}: <span className="font-mono"><span className="font-extrabold text-purple-500">{percent}%</span></span>
                    </label>

                    <input
                        type="range"
                        min="50"
                        max="200"
                        step="10"
                        value={percent}
                        onChange={(e) => setPercent(parseInt(e.target.value))}
                    />

                    <div className="flex justify-between text-default font-medium text-sm mt-1">
                        <span>50%</span>
                        <span>200%</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="relative group">
                    <button
                        onClick={calculateOvertime}
                        disabled={isButtonDisabled}
                        className={`px-8 py-3 rounded-lg font-medium default-button 
                            ${isButtonDisabled
                                ? "default-button-inactive opacity-50 cursor-not-allowed"
                                : "default-button-active hover:scale-105 transition-transform"
                            }`}
                    >
                        <i className="fa-solid fa-calculator fa-lg"></i>
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {t("Calcular")}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>

                {result && (
                    <div className="relative group">
                        <button
                            onClick={clear}
                            className="px-8 py-3 rounded-lg font-medium default-button default-button-active hover:scale-105 transition-transform"
                        >
                            <i className="fa-solid fa-eraser fa-lg"></i>
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-purple-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            {t("Limpar")}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-900"></div>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        key="result-box"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden w-full max-w-md mt-4 p-4 border-purple-400 rounded-lg border-2 bg-purple-200/10 shadow-md"
                    >
                        <div className="space-y-2 text-default">
                            <div className="flex justify-between">
                                <span>⏱ {t("Total Horas Extras")}:</span>
                                <span className="font-mono">{result.hours}h</span>
                            </div>
                            <div className="flex justify-between">
                                <span>⚡ {t("Valor Horas Extras")}:</span>
                                <span className="font-mono">R$ {result.overtimePay}</span>
                            </div>
                            <div className="flex justify-between border-t border-purple-600 pt-2 mt-2 text-lg font-bold">
                                <span>📊 {t("Salário com Hora Extra")}:</span>
                                <span className="font-mono">R$ {result.totalPay}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
