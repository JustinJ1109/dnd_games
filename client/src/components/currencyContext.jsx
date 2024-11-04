import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie'

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [soulCoins, setSoulCoins] = useState(parseFloat(Cookies.get("soulCoins")) || 0);
    const convertToSoulCoins = (gold, silver, copper) => {
        const totalSoulCoins = (gold * 10) + (silver * 1) + (copper * 0.1);
        setSoulCoins(prev => prev + totalSoulCoins);
    };

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