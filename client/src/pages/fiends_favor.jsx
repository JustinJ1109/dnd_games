import React, { useState } from "react"
import RollDice from "../components/rollDice"
import MoneyInput from "../components/moneyInput"
import TextField from '@mui/material/TextField';

const FiendsFavor = () => {
    const [wager, setWager] = useState({ gold: 0, silver: 0, copper: 0, soul: 0, total_soul_coins: 0 });
    const totalSoulCoins = (wager.gold + wager.silver * 0.1 + wager.copper * 0.01).toFixed(2)
    const [selectedNumber, setSelectedNumber] = useState(null)

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <MoneyInput wager={wager} setWager={setWager} totalSoulCoins={totalSoulCoins} />

                    </div>
                    <div className="row rules" style={{ maxWidth: '55%' }}>
                        <em>Rules:</em>
                        <hr />
                        <p>
                            <ul>
                                <li>
                                    Add all the funds you want to gamble
                                </li>
                                <li>
                                    Choose a number 1-6
                                </li>
                                <li>
                                    Roll the Dice
                                    <ul>
                                        <li>
                                            0 matches: House wins
                                        </li>
                                        <li>
                                            1 match: 1:1 payout
                                        </li>
                                        <li>
                                            2 matches: 2:1 payout
                                        </li>
                                        <li>
                                            3 matches: 3:1 payout
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </p>
                    </div>
                </div>

            </div>
            <div className="num-select" style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <TextField label="Choose a number" variant="outlined" placeholder="1-6" onChange={(e) => setSelectedNumber(parseInt(e.target.value))} focused />
            </div>
            <RollDice wager={wager} totalSoulCoins={totalSoulCoins} selectedNumber={selectedNumber} />
        </div>
    )
}

export default FiendsFavor