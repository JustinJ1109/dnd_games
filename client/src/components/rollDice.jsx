// RollDice.js File
import React, { Component, useState } from 'react'
import '../styles/rollDice.css'
import Die from './die'
import Button from '@mui/material/Button'

const RollDice = ({ wager, totalSoulCoins, selectedNumber }) => {

    // Face numbers passes as default props
    // static defaultProps = {
    const sides = ['one', 'two', 'three',
        'four', 'five', 'six']

    const [dice, setDice] = useState(['one', 'one', 'one'])
    const [rolling, setRolling] = useState(false)
    const [wagerCost, setWagerCost] = useState(10)

    const roll = () => {
        console.log(wager)
        if (totalSoulCoins < wagerCost) {
            alert("Not enough currency")
            return
        }
        if (selectedNumber < 0 || selectedNumber > 6 || selectedNumber === null) {
            alert("Invalid selected number")
            return
        }

        setRolling(true)
        setTimeout(() => {
            setDice([
                sides[(Math.floor(Math.random() * sides.length))],
                sides[(Math.floor(Math.random() * sides.length))],
                sides[(Math.floor(Math.random() * sides.length))]
            ])
            setRolling(false)
        }, 1000)
    }

    const handleBtn = rolling ?
        'RollDice-rolling' : ''
    return (
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
            <div className='wager-text'>
                Wager: 10 Soul Coins
            </div>
        </div>
    )
}

export default RollDice
