import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyRates from './components/CurrencyRates';
import './styles.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CurrencyConverter />} />
                <Route path="/rates" element={<CurrencyRates />} />
            </Routes>
        </Router>
    );
};

export default App;