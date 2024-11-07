import { Box, List, ListItem } from "@mui/material"


const Rules = ({ gamemode }) => {
    const getRulesForGamemode = () => {
        if (gamemode === "fiends-favor") {
            return (
                <>
                    <ul>
                        <li>
                            Choose a number 1-6
                        </li>
                        <li>
                            Choose your wager amount (10 SC Minimum)
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
                </>
            )
        }
        else if (gamemode === "roulette") {
            return (
                <div>
                    <ul>
                        <li>Choose your wager denomination (10 SC Minimum)</li>
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
        else if (gamemode === "deathRoll") {
            return (
                <Box>
                    <List>
                        <ListItem dense>Choose your wager amount (50 SC minimum)</ListItem>
                        <ListItem dense>Starting from 100, take turns rolling against the House, rolling between 1 and the previously rolled number.</ListItem>
                        <ListItem dense>Whoever rolls a 1 loses</ListItem>
                        <ListItem dense>
                            Payout:
                            <List>
                                <ListItem dense>House rolls a 1 - 1:1 </ListItem>
                            </List>
                        </ListItem>
                    </List>
                </Box>
            )
        }
    }

    return (
        <div className="row rules" style={{ display: "flex" }}>
            {String(gamemode).charAt(0).toUpperCase() + String(gamemode).slice(1)} Rules
            <hr />
            {getRulesForGamemode()}
        </div>
    )

}

export default Rules