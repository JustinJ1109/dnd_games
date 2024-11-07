import { TextField } from "@mui/material"
import { useCurrency } from "./currencyContext";
import { useTheme } from "@emotion/react";

const WagerButton = ({ min_wager, wager, setWager, disabled, theme, ...props }) => {
    const { soulCoins, setSoulCoins } = useCurrency();

    const validateWager = (e) => {
        if (disabled) {
            return
        }
        let newWager = parseInt(e.target.value)
        if (isNaN(newWager)) {
            newWager = min_wager
        }
        else if (newWager < min_wager || newWager > soulCoins) {
            setWager(min_wager)
            alert("Bad Wager")
            e.target.value = min_wager
            return
        }
        console.log("Updated wager to " + newWager.toString())
        setWager(newWager)
    }

    return (
        <div className='wager-text' style={{ margin: "10px" }}>
            Wager:
            <span>
                <TextField
                    disabled={disabled}
                    size="small"
                    sx={{ ml: "10px", mr: "10px", borderColor: theme?.main, input: { color: theme?.contrastText || "black", backgroundColor: theme?.main || "white" }, width: '100px' }}
                    onBlur={validateWager}
                    placeholder={min_wager.toString()}
                >
                    {wager}
                </TextField>
            </span> Soul Coins
        </div>
    )
}

export default WagerButton