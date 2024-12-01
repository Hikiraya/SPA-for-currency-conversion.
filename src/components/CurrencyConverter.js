import React, { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../api.js';
import { useNavigate } from "react-router-dom";

function CurrencyConverter() {
    const [amount, setAmount] = useState(0);
    const [baseCurrency, setBaseCurrency] = useState('USD'); // Например, базовая валюта - доллар
    const [targetCurrency, setTargetCurrency] = useState('RUB'); // Целевая валюта - евро
    const [exchangeRates, setExchangeRates] = useState({});
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const getExchangeRates = async () => {
            const rates = await fetchExchangeRates(baseCurrency);
            setExchangeRates(rates);
            calculateConvertedAmount(amount, rates[targetCurrency]);
        };
        getExchangeRates();
    }, [baseCurrency, targetCurrency]);

    const calculateConvertedAmount = (amount, rate) => {
        if (rate) {
            setConvertedAmount(amount * rate);
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        calculateConvertedAmount(value, exchangeRates[targetCurrency]); // Пересчитываем при изменении
    };

    const navigate = useNavigate()
      
    const gotToNewPage=()=>{
        navigate("/rates");
    }

    return (
        <div className="container">
            <h2>Конвертер валют</h2>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Введите сумму" />
            <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
            </select>
            <p> в </p>
            <select value={targetCurrency} onChange={e => setTargetCurrency(e.target.value)}>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
            </select>
            <p>Конвертированная сумма: {convertedAmount.toFixed(2)}</p>
            <button onClick={() => gotToNewPage()} className="btn">Посмотреть курсы валют</button>
        </div>
    );
}

export default CurrencyConverter;