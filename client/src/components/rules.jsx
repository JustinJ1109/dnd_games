

const Rules = ({ gamemode }) => {

    const getRulesForGamemode = () => {
        if (gamemode === "fiends-favor") {
            return (
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
            )
        }
        else if (gamemode === "roulette") {
            return (
                <div>
                    <ul>
                        <li>Choose your wager denomination</li>
                        <li>
                            Click on whichever bets you want to place (Or use the X button to remove existing bets)<br />
                            Payouts:
                            <ul>
                                <li>Single number bets: 35:1</li>
                                <li>Dozen Bets: 2:1</li>
                                <li>High/Low; Red/Black; Odd/Even: 1:1</li>
                            </ul>
                        </li>
                        <li>Once all bets are placed, spin the wheel</li>
                    </ul>
                </div>
            )
        }
    }

    return (
        <div className="row rules" style={{ display: "inline-block" }}>
            {String(gamemode).charAt(0).toUpperCase() + String(gamemode).slice(1)} Rules
            <hr />
            {getRulesForGamemode()}
        </div>
    )

}

export default Rules