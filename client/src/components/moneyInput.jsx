import * as React from 'react';
import { useState } from "react";
import "../styles/moneyInput.css";
import { TextField } from '@mui/material';

const MoneyInput = ({ wager, setWager, totalSoulCoins }) => {

    const updateWager = (e) => {
        let currency = e.target.id.replace("-text", "");
        setWager({ ...wager, [currency]: parseInt(e.target.value) || 0 });
    };

    return (
        <div style={{ margin: '1em', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <TextField
                    fullWidth
                    id="gold-text"
                    className='tbox'
                    label="Gold"
                    variant="outlined"
                    color="gold"
                    placeholder="0"
                    onChange={updateWager}
                    value={wager.gold}
                    focused
                />
                <TextField
                    fullWidth
                    id="silver-text"
                    className='tbox'
                    label="Silver"
                    variant="outlined"
                    color="silver"
                    placeholder="0"
                    onChange={updateWager}
                    value={wager.silver}
                    focused
                />
                <TextField
                    fullWidth
                    id="copper-text"
                    className='tbox'
                    label="Copper"
                    variant="outlined"
                    color="copper"
                    placeholder="0"
                    onChange={updateWager}
                    value={wager.copper}
                    focused
                />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '1em',
                height: '100%', // Allow the div to take the full height of the parent
            }}>
                <span style={{ marginRight: '0.5em', fontSize: '1.5em', lineHeight: '1em' }}>X</span>
                <span style={{ fontSize: '1.5em' }}>Soul Coins: {totalSoulCoins}</span>
            </div>
        </div>
    );
};

export default MoneyInput;
