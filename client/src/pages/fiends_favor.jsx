import React, { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import { useCurrency } from "../components/currencyContext";
import Die from "../components/die";
import { Box, Button } from "@mui/material";
import '../styles/rollDice.css'
import '../styles/fiends_favor.css'

import WagerButton from "../components/wagerButton";
import Rules from "../components/rules";
import { useTheme } from "@emotion/react";

const PAY_TABLE = {
    1: 2,
    2: 3,
    3: 4
}

const MIN_WAGER = 10
const SIDES = ['one', 'two', 'three',
    'four', 'five', 'six']

const FiendsFavor = () => {
    const theme = useTheme().palette.fiendsFavor
    const { soulCoins, setSoulCoins } = useCurrency();
    const [selectedNumber, setSelectedNumber] = useState(null)

    const [payout, setPayout] = useState(0)
    const [wager, setWager] = useState(MIN_WAGER)
    const [dice, setDice] = useState(['one', 'one', 'one'])
    const [rolling, setRolling] = useState(false)

    const roll = () => {
        setPayout(0)

        if (soulCoins < wager) {
            alert("Not enough Soul Coins!")
            return
        }
        setSoulCoins((prev) => prev - wager)

        if (selectedNumber < 0 || selectedNumber > 6 || selectedNumber === null) {
            alert("Invalid selected number")
            return
        }

        setRolling(true)

        setTimeout(() => {
            let diceValues = [
                (Math.floor(Math.random() * SIDES.length)) + 1,
                (Math.floor(Math.random() * SIDES.length)) + 1,
                (Math.floor(Math.random() * SIDES.length)) + 1
            ]
            setDice([
                SIDES[diceValues[0] - 1],
                SIDES[diceValues[1] - 1],
                SIDES[diceValues[2] - 1]
            ])
            setRolling(false)
            let matchCount = diceValues.filter(val => val === selectedNumber).length;
            if (matchCount > 0)
                setPayout(wager * PAY_TABLE[matchCount])
        }, 1000)
    }

    useEffect(() => {
        if (payout > 0) {
            setSoulCoins((prev) => prev + payout)
        }
    }, [payout, setSoulCoins])

    const handleBtn = rolling ?
        'RollDice-rolling' : ''
    return (
        <Box className="game-space" >
            <div className="row">
                <div className="col-sm col-md-4">
                    <Rules gamemode={"fiends-favor"} />
                </div>
                <div className="col num-select">

                    <div className="row">
                        <div className="col" />
                        <div className="col">
                            <TextField label="Choose a number" variant="outlined" placeholder="1-6" onChange={(e) => setSelectedNumber(parseInt(e.target.value))} focused />
                        </div>
                        <div className="col" />
                    </div>
                    <div className="row">
                        <div className="col" />
                        <div className="col">
                            <div className='RollDice'>
                                <div className='RollDice-container'>
                                    <Die face={dice[0]} rolling={rolling} />
                                    <Die face={dice[1]} rolling={rolling} />
                                    <Die face={dice[2]} rolling={rolling} />
                                </div>
                                <Button
                                    className={handleBtn}
                                    variant='outlined'
                                    onClick={roll}
                                    disabled={rolling}>
                                    {rolling ? 'Rolling' : 'Roll Dice!'}
                                </Button>
                                <WagerButton theme={theme} min_wager={MIN_WAGER} wager={wager} setWager={setWager} disabled={rolling} />
                            </div>
                        </div>
                        <div className="col" />
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            {payout > 0 && <h2>
                                Nice Win! {payout} Soul Coins
                            </h2>}
                        </div>


                    </div>
                </div>
                <div className="col-3" />
            </div>
        </Box>
    )
}

export default FiendsFavor