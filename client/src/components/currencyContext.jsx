import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie'

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [soulCoins, setSoulCoins] = useState(isNaN(parseFloat(Cookies.get("soulCoins"))) ? 0 : parseFloat(Cookies.get("soulCoins")));

    const convertToSoulCoins = (currencies) => {
        const totalSoulCoins = (currencies.gold ?? 0) * 10 + (currencies.silver ?? 0) * 1 + (currencies.copper ?? 0) * 0.1;
        setSoulCoins((prev) => prev + totalSoulCoins);
    }

    useEffect(() => {
        Cookies.set("soulCoins", soulCoins)
    }, [soulCoins])

    return (
        <CurrencyContext.Provider value={{ soulCoins, setSoulCoins, convertToSoulCoins }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);