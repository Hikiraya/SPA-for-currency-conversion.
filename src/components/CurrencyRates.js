import React, { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../api.js';
import { useNavigate } from "react-router-dom"

const CurrencyRates = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD'); // Базовая валюта
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        const getExchangeRates = async () => {
            const rates = await fetchExchangeRates(baseCurrency);
            setExchangeRates(rates);
        };
        getExchangeRates();
    }, [baseCurrency]);
    
    const navigate = useNavigate()

    const goBack=()=>{
        navigate(-1);
    }

    return (
        <div className="container">
            <h2>Курсы валют</h2>
            <button onClick={()=>goBack()} className="btn">Вернуться</button>
            <div className="table-container">
                <select value={baseCurrency} onChange={e => setBaseCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="RUB">RUB</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>
                <ul>
                    {Object.entries(exchangeRates).map(([currency, rate]) => (
                        <li key={currency}>
                            1 {baseCurrency} = {rate} {currency}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CurrencyRates;