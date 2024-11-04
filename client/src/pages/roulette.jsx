import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Button, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import RouletteBettingTable from "../components/rouletteTable";
import data from "../schemas/roulette-schema";
import "../styles/roulette.css"
import WagerButton from "../components/wagerButton";
import Rules from "../components/rules";
import { useCurrency } from "../components/currencyContext";
// Payout ratios based on bet type
const payoutRatios = {
    "red": 1,
    "black": 1,
    "odd": 1,
    "even": 1,
    "1to18": 1,
    "19to36": 1,
    "1st12": 2,
    "2nd12": 2,
    "3rd12": 2,
    "number": 35
};

const WAGER_TYPES = {
    "1st12": "1st 12",
    "2nd12": "2nd 12",
    "3rd12": "3rd 12",
    "1to18": "1-18",
    "19to36": "19-36",
    "red": "Red",
    "black": "Black",
    "even": "Even",
    "odd": "Odd"
}

const MIN_BET = 10;

const RouletteWagers = ({ wagers, setWagers }) => {
    const { soulCoins, setSoulCoins } = useCurrency();

    return (
        <div style={{ display: "inline-block" }}>
            <h3>Your Wagers</h3>
            {Object.keys(wagers).map((wager) => (
                <div key={wager}>
                    <Button id={`button-${wager}`} color="error" variant="outlined" onClick={(e) => setWagers((prev) => {
                        console.log(prev)
                        const { [e.target.id.substring("button-".length)]: _, ...rest } = prev
                        return rest
                    })}>X</Button>
                    <span className="wager-type">{WAGER_TYPES[wager] ? WAGER_TYPES[wager] : wager}</span>: <span className="wager-amt">{wagers[wager]} Soul Coins</span>
                </div>
            ))}
            {Object.keys(wagers).length > 0 &&
                <div className="wager-total">
                    <h5>
                        Total: {Object.values(wagers).reduce((sum, val) => sum + val, 0)}
                        {soulCoins < Object.values(wagers).reduce((sum, val) => sum + val, 0) &&
                            <span style={{ color: "red" }}> (Insufficient Funds)</span>}
                    </h5>
                </div>
            }
        </div>
    )
}

const Roulette = () => {
    const [spinResult, setSpinResult] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const [wagers, setWagers] = useState({})
    const [selectedBetAmount, setSelectedBetAmount] = useState(MIN_BET);

    const addWager = (e) => {
        console.log(e.target.id)
        setWagers((prev) => ({ ...prev, [e.target.id.substring(4)]: selectedBetAmount }))
    }

    // Handle spin and determine winnings
    const handleSpin = () => {
        const winningIndex = Math.floor(Math.random() * data.length);
        setSpinResult(winningIndex);
        setIsSpinning(true);
    };

    const handleStopSpin = () => {
        setIsSpinning(false)
        console.log(wagers)
        const winningWagers = []
        Object.keys(wagers).forEach(wager => {
            let winningNumber = data[spinResult]
            switch (wager) {
                case "1st12":
                    if (Number(winningNumber.option) > 0 && Number(winningNumber.option) <= 12) {
                        winningWagers.push({ [wager]: wagers[wager] })
                    }
                    break
                case "2nd12":
                    if (Number(winningNumber.option) > 12 && Number(winningNumber.option) <= 24) {
                        winningWagers.push({ [wager]: wagers[wager] })
                    }
                    break
                case "3rd12":
                    if (Number(winningNumber.option) > 24) {
                        winningWagers.push({ [wager]: wagers[wager] })
                    }
                    break
                case "black":
                case "red":
                    if (winningNumber.style.backgroundColor === wager)
                        winningWagers.push({ [wager]: wagers[wager] })
                    break
                case "even":
                    if (Number(winningNumber.option) % 2 === 0)
                        winningWagers.push({ [wager]: wagers[wager] })
                    break
                case "odd":
                    if (Number(winningNumber.option) % 2 !== 0)
                        winningWagers.push({ [wager]: wagers[wager] })
                    break
                case "1to18":
                    if (Number(winningNumber.option) > 0 && Number(winningNumber.option) <= 18)
                        winningWagers.push({ [wager]: wagers[wager] })
                    break
                case "19to36":
                    if (Number(winningNumber.option) > 18)
                        winningWagers.push({ [wager]: wagers[wager] })
                    break
                default:
                    if (Number(winningNumber.option) === Number(wager))
                        winningWagers.push({ [wager]: wagers[wager] })
                    break
            }
        });
        payoutWinningWagers(winningWagers)
    }

    const payoutWinningWagers = (winningWagers) => {
        let totalPayout = 0
        console.log("Winning Wagers", winningWagers)
        winningWagers.forEach(wager => {
            const [[k, v]] = Object.entries(wager)
            console.log(k, v)
            totalPayout += v + (payoutRatios[k] * v)
        })
        console.log("TP", totalPayout)
    }

    return (
        <Box className="roulette-game" sx={{ padding: 3 }}>
            <Rules gamemode={"roulette"} />
            <div style={{ display: "inline-block" }}>
                {/* Wheel */}
                <Wheel
                    mustStartSpinning={isSpinning}
                    prizeNumber={spinResult}
                    data={data}
                    onStopSpinning={handleStopSpin}
                    perpendicularText
                    textDistance={80}
                />
                <WagerButton min_wager={MIN_BET} setWager={setSelectedBetAmount} wager={selectedBetAmount} />
                <RouletteBettingTable onClick={addWager} />
                <RouletteWagers wagers={wagers} setWagers={setWagers} />
            </div>

            {/* Spin Button */}
            <Box sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSpin}
                    disabled={isSpinning || Object.keys(wagers).length === 0}
                >
                    Spin
                </Button>
            </Box>

            {/* Display Spin Result */}
            {!isSpinning && spinResult !== null && (
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Winning Number: {data[spinResult]?.option}
                </Typography>
            )}
        </Box>
    );
};

export default Roulette;