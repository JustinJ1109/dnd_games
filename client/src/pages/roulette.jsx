import React, { useEffect, useState } from "react";
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

const RouletteWagers = ({ wagers, setWagers, disabled }) => {
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
                    })}
                        disabled={disabled}
                    >X</Button>
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
    const { soulCoins, setSoulCoins } = useCurrency();

    const [spinResult, setSpinResult] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const [wagers, setWagers] = useState({})
    const [selectedBetAmount, setSelectedBetAmount] = useState(MIN_BET);
    const [winningWagers, setWinningWagers] = useState([])
    const [totalPayout, setTotalPayout] = useState(0);

    const getTotalWagers = () => (
        Object.values(wagers).reduce((sum, val) => sum + val, 0)
    )

    const addWager = (e) => {
        setWagers((prev) => ({ ...prev, [e.target.id.substring(4)]: selectedBetAmount }))
    }

    // Handle spin and determine winnings
    const handleSpin = () => {
        if (soulCoins < getTotalWagers()) {
            alert("Insufficient Funds")
            return
        }
        setSoulCoins((prev) => prev - getTotalWagers())
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
        console.log(winningWagers)
    }

    const payoutWinningWagers = (winningWagers) => {
        let totalPayout = 0
        console.log("Winning Wagers", winningWagers)
        winningWagers.forEach(wager => {
            const [[k, v]] = Object.entries(wager)
            console.log(k, v)
            if (k in payoutRatios) {
                totalPayout += v + (payoutRatios[k] * v)
            }
            else {
                totalPayout += v + (v * payoutRatios.number)
            }
        })
        console.log("TP", totalPayout)
        setSoulCoins((prev) => prev + totalPayout)
        setWinningWagers(winningWagers)
        setTotalPayout(totalPayout)
    }

    return (
        <Box className="roulette-game" sx={{ padding: 3 }}>
            <div className="row">
                <div className="col-3">
                    <Rules gamemode={"roulette"} />
                </div>

                <div className="col text-center">
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
                        {/* Spin Button */}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleSpin}
                                disabled={isSpinning || Object.keys(wagers).length === 0 || soulCoins < getTotalWagers()}
                            >
                                Spin
                            </Button>
                        </Box>
                    </div>
                </div>
                <div className="col">
                    <RouletteBettingTable className="betting-table" onClick={addWager} disabled={isSpinning} />
                    <RouletteWagers className="wagers-list" wagers={wagers} setWagers={setWagers} disabled={isSpinning} />
                </div>

            </div>



            {/* Display Spin Result */}
            {
                !isSpinning && spinResult !== null && (
                    <Box>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Winning Number: {data[spinResult]?.option}
                        </Typography>
                        <Box>
                            Winning Wagers:
                            <ul>
                                {winningWagers.map((w) => (
                                    <li key={Object.keys(w)[0]}>
                                        {WAGER_TYPES[Object.keys(w)[0]] ?? Object.keys(w)[0]} : {w[Object.keys(w)[0]]}
                                    </li>
                                ))}
                            </ul>
                            Total: {totalPayout} Soul Coins
                        </Box>
                    </Box>
                )
            }
        </Box >
    );
};

export default Roulette;