import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
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

// Button styling
const StyledButton = styled(Button)({
    backgroundColor: '#f4e1d2',
    color: '#2f1b3f',
    fontWeight: 700,
    '&:hover': {
        backgroundColor: '#d4af37',
        color: '#f4e1d2',
    },
    '&:active': {
        backgroundColor: '#b18b36',
    },
});

const CoinCalculator = () => {
    return (
        <Container>
            <Typography variant="h4" sx={{ color: '#d4af37', fontWeight: '700' }}>
                Convert to Soul Coins
            </Typography>
            <GoldTextField
                variant="outlined"
                label="Gold Coins"
                type="number"
                placeholder="0"
                fullWidth
            />
            <SilverTextField
                variant="outlined"
                label="Silver Coins"
                type="number"
                placeholder="0"
                fullWidth
            />
            <CopperTextField
                variant="outlined"
                label="Copper Coins"
                type="number"
                placeholder="0"
                fullWidth
            />
            <StyledButton variant="contained" fullWidth>
                Calculate Total
            </StyledButton>
        </Container>
    );
};

export default CoinCalculator;
