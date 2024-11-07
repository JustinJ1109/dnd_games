import { Box, dividerClasses } from "@mui/material"
import FiendsFavor from "./fiends_favor"
import DeathRoll from "./deathRoll"
import Roulette from "./roulette"
import { useTheme } from "@emotion/react"


const submitBet = (game, wager) => {
    console.log(game, wager)
}
const GAME_COMPONENTS = {
    "fiendsFavor": <FiendsFavor />,
    "deathRoll": <DeathRoll submitBet={submitBet} />,
    "roulette": <Roulette />
}

const Game = ({ game }) => {
    const theme = useTheme().palette[game]
    return (
        <Box sx={{ backgroundColor: theme ? theme.main : "rgb(20,20,20)", color: theme ? theme.contrastText : "white", height: ("91vh") }}>
            {GAME_COMPONENTS[game]}
        </Box>
    )

}

export default Game