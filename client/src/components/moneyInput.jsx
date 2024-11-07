import * as React from 'react';
import { useState } from "react";
import "../styles/moneyInput.css";
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCurrency } from './currencyContext';
import { styled } from '@mui/system';
// Container styling
const Container = styled(Box)({
    background: 'linear-gradient(135deg, #2f1b3f, #4c3a64)',
    border: '2px solid #d4af37',
    borderRadius: '10px',
    padding: '30px',
    width: '320px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
    textAlign: 'center',
    color: '#f4e1d2',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'Trebuchet MS, sans-serif',
});

// Gold TextField styling
const GoldTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#d4af37',
        color: '#2f1b3f',
        '& fieldset': {
            borderColor: '#d4af37',
        },
        '&:hover fieldset': {
            borderColor: '#b18b36',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#b18b36',
        },
    },
    input: {
        textAlign: 'center',
        color: '#2f1b3f',
    },
});

// Silver TextField styling
const SilverTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#C0C0C0',
        color: '#333',
        '& fieldset': {
            borderColor: '#C0C0C0',
        },
        '&:hover fieldset': {
            borderColor: '#A8A8A8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#A8A8A8',
        },
    },
    input: {
        textAlign: 'center',
        color: '#333',
    },
});

// Copper TextField styling
const CopperTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#b87333',
        color: '#2f1b3f',
        '& fieldset': {
            borderColor: '#b87333',
        },
        '&:hover fieldset': {
            borderColor: '#a5652e',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#a5652e',
        },
    },
    input: {
        textAlign: 'center',
        color: '#2f1b3f',
    },
});

// StyledButton with variantType prop
const StyledButton = styled(Button)(({ varianttype }) => ({
    backgroundColor: varianttype === 'reset' ? '#ff6b6b' : '#f4e1d2',
    color: varianttype === 'reset' ? '#ffffff' : '#2f1b3f',
    fontWeight: 700,
    '&:hover': {
        backgroundColor: varianttype === 'reset' ? '#e25858' : '#d4af37',
        color: varianttype === 'reset' ? '#ffffff' : '#f4e1d2',
    },
    '&:active': {
        backgroundColor: varianttype === 'reset' ? '#c94444' : '#b18b36',
    },
}));
const MoneyInput = () => {
    const { convertToSoulCoins, setSoulCoins } = useCurrency();
    // Local state to hold input values
    const [convertedCurrency, _setConvertedCurrency] = useState({ gold: 0, silver: 0, copper: 0 })

    const setConvertedCurrency = (currencyType, val) => {
        _setConvertedCurrency((prev) => ({ ...prev, [currencyType]: val }))
    }
    // Calculate total SoulCoins based on input values
    const totalSoulCoins = (convertedCurrency.gold * 10) + (convertedCurrency.silver * 1) + (convertedCurrency.copper * 0.1);
    const handleConvert = () => {
        convertToSoulCoins(convertedCurrency);
        resetCoins()
    };

    const resetCoins = () => {
        setConvertedCurrency("gold", 0)
        setConvertedCurrency("silver", 0)
        setConvertedCurrency("copper", 0)
    }

    React.useEffect(() => {
        // console.log(convertedCurrency)
    }, [convertedCurrency])



    return (
        <Box justifyContent="center" alignItems="center" display="flex" >
            <Container>
                < Typography variant="h4" sx={{ color: '#d4af37', fontWeight: '700' }
                }>
                    Convert to Soul Coins
                </Typography >
                <GoldTextField
                    variant="outlined"
                    label="Gold Coins"
                    type="number"
                    placeholder="0"
                    fullWidth
                    value={Number(convertedCurrency.gold) ?? 0}
                    onChange={(e) => setConvertedCurrency("gold", parseFloat(e.target.value) || 0)}
                />
                <SilverTextField
                    variant="outlined"
                    label="Silver Coins"
                    type="number"
                    placeholder="0"
                    fullWidth
                    value={Number(convertedCurrency.silver) ?? 0}
                    onChange={(e) => setConvertedCurrency("silver", parseFloat(e.target.value) || 0)}
                />
                <CopperTextField
                    variant="outlined"
                    label="Copper Coins"
                    type="number"
                    placeholder="0"
                    fullWidth
                    value={Number(convertedCurrency.copper) ?? 0}
                    onChange={(e) => setConvertedCurrency("copper", parseFloat(e.target.value) || 0)}
                />
                <StyledButton variant="contained" varianttype="calculate" fullWidth onClick={handleConvert}>
                    Convert
                </StyledButton>
                <StyledButton variant="contained" varianttype="reset" fullWidth onClick={() => {
                    resetCoins()
                    setSoulCoins(0)
                }
                }>
                    Reset
                </StyledButton>

                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '1em',
                    height: '100%', // Allow the div to take the full height of the parent
                }}>
                    <span style={{ marginRight: '0.5em', fontSize: '1.5em', lineHeight: '1em' }}>X</span>
                    <span style={{ fontSize: '1.5em' }}>Soul Coins: {totalSoulCoins}</span>
                </Box>
            </Container>

        </Box >
    );
};

export default MoneyInput;
