import * as React from 'react';
import { useState } from "react";
import "../styles/moneyInput.css";
import { TextField, Button, Tooltip, Box } from '@mui/material';
import { useCurrency } from './currencyContext';

const MoneyInput = ({ wager, setWager }) => {
    const { convertToSoulCoins, soulCoins, setSoulCoins } = useCurrency();

    // Local state to hold input values
    const [gold, setInputGold] = useState(0);
    const [silver, setInputSilver] = useState(0);
    const [copper, setInputCopper] = useState(0);

    // Calculate total SoulCoins based on input values
    const totalSoulCoins = (gold * 10) + (silver * 1) + (copper * 0.1);
    const handleConvert = () => {
        convertToSoulCoins(gold, silver, copper);

        // Reset inputs after conversion
        setInputGold(0);
        setInputSilver(0);
        setInputCopper(0);
    };

    const resetCoins = () => {
        setInputGold(0);
        setInputSilver(0)
        setInputCopper(0)
        setSoulCoins(0)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "white", p: "10px" }}>
                <TextField
                    fullWidth
                    id="gold-text"
                    className='tbox'
                    label="Gold"
                    variant="outlined"
                    color="gold"
                    placeholder="0"
                    onChange={(e) => setInputGold(parseInt(e.target.value) || 0)}
                    value={gold}
                    focused
                    sx={{ mb: "10px" }}
                />
                <TextField
                    fullWidth
                    id="silver-text"
                    className='tbox'
                    label="Silver"
                    variant="outlined"
                    color="silver"
                    placeholder="0"
                    onChange={(e) => setInputSilver(parseInt(e.target.value) || 0)}
                    focused
                    value={silver}
                    sx={{ mb: "10px" }}
                />
                <TextField
                    fullWidth
                    id="copper-text"
                    className='tbox'
                    label="Copper"
                    variant="outlined"
                    color="copper"
                    placeholder="0"
                    onChange={(e) => setInputCopper(parseInt(e.target.value) || 0)}
                    focused
                    value={copper}
                    sx={{ mb: "10px" }}
                />
                <Box className="button-box row" sx={{ m: "5px" }}>
                    <Tooltip className='col' sx={{ m: "5px" }} title="Convert Gold, Silver, and Copper to Soul Coins">
                        <Button variant='outlined' onClick={handleConvert}>
                            Convert
                        </Button>
                    </Tooltip>
                    <Tooltip className='col' sx={{ m: "5px" }} title="Reset SoulCoins and input boxes" >
                        <Button variant='outlined' color='secondary' onClick={resetCoins}>
                            Reset
                        </Button>
                    </Tooltip>

                </Box>
            </Box>
            <Box style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '1em',
                height: '100%', // Allow the div to take the full height of the parent
            }}>
                <span style={{ marginRight: '0.5em', fontSize: '1.5em', lineHeight: '1em' }}>X</span>
                <span style={{ fontSize: '1.5em' }}>Soul Coins: {totalSoulCoins}</span>
            </Box>
        </Box>
    );
};

export default MoneyInput;
