import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const fetchExchangeRates = async (baseCurrency) => {
    try {
        const response = await axios.get(`${API_URL}${baseCurrency}`);
        return response.data.rates;
    } catch (error) {
        console.error('Ошибка при получении курсов: ', error);
        return {};
    }
};