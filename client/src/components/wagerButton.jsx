import { TextField } from "@mui/material"

const WagerButton = ({ min_wager, wager, setWager, ...props }) => {

    const validateWager = (e) => {
        let newWager = parseInt(e.target.value)
        if (isNaN(newWager)) {
            newWager = min_wager
        }
        else if (newWager < min_wager) {
            setWager(min_wager)
            console.log("Bad wager")
            e.target.value = min_wager
            return
        }
        console.log("Updated wager to " + newWager.toString())
        setWager(newWager)
    }

    return (
        <div className='wager-text'>
            Wager: <span><TextField size="small" style={{ width: '100px' }} onBlur={validateWager} placeholder={min_wager.toString()}>{wager}</TextField></span> Soul Coins
        </div>
    )
}

export default WagerButton