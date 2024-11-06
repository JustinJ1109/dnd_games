import { Box, dividerClasses } from "@mui/material"
import FiendsFavor from "./fiends_favor"
import DeathRoll from "./deathRoll"
import Roulette from "./roulette"


const submitBet = (game, wager) => {
    console.log(game, wager)
}
const GAME_COMPONENTS = {
    "fiends-favor": <FiendsFavor />,
    "death-roll": <DeathRoll submitBet={submitBet} />,
    "roulette": <Roulette />
}

const Game = ({ game }) => {
    return (
        <Box>
            {GAME_COMPONENTS[game]}
        </Box>
    )
}

export default Game