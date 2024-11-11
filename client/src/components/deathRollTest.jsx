import { useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/system';
import { Alert } from '@mui/material';

const SLOT_DATA = {
    big: {
        size: 5,
        selectedIdx: 2
    },
    medium: {
        size: 3,
        selectedIdx: 1
    },
    small: {
        size: 1,
        selectedIdx: 0
    }
}

const SPIN_TIME_MS = 5000

const generateFixedReel = () => {
    let numbers = Array.from({ length: 100 }, (_, i) => i + 1)
    numbers = numbers.sort(() => Math.random() - 0.5)
    return numbers
}
// TODO: Remove
const POTENTIAL_BEZIERS = [
    "cubic-bezier(.52,.4,0,.97)",
    "cubic-bezier(.34,.68,0,1)",
    "cubic-bezier(.89,.11,0,1)"
]

const Reel = ({ reelItems, selectedItem }) => {
    console.log("Reel Width:", reelItems.length * 100)
    console.log(reelItems)

    const ref = useRef(null)

    useEffect(() => {
        console.log("call ref left from start")
        if (ref.current) {
            console.log(reelItems, selectedItem, reelItems.lastIndexOf(selectedItem.current))
            const oldLeft = 0
            const newLeft = (reelItems.lastIndexOf(selectedItem.current) - 2) * 100 * -1
            console.log("New left", newLeft, "old left", oldLeft)
            ref.current.style.transition = ``
            ref.current.style.left = `${oldLeft}px`
            if (reelItems.length > 5) {
                console.log(selectedItem)
                setTimeout(() => {
                    ref.current.style.transition = `left ${SPIN_TIME_MS / 1000}s cubic-bezier(.6,.01,0,1)`
                    ref.current.style.left = `${newLeft}px`

                }, 100)

            }

        }
    }, [reelItems, selectedItem])

    return (
        <Box
            ref={ref}
            sx={{
                display: "flex",
                width: reelItems.length * 100,
                position: "relative",

            }}
        >
            {
                reelItems.map((item, i) => {
                    return (
                        <Box
                            key={`${item.number}-${item.idx}-${i}`}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100px",
                                height: "100px",
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#ffc733",
                                border: "5px solid #f2dfae",
                                backgroundColor: "#444",
                                // boxShadow: "0 0 15px #ffd700",
                                transform: "scale(1.1)",
                            }}
                        >
                            {item.number}
                        </Box>
                    )
                })
            }
        </Box >
    )
}

const DeathRollTest = () => {
    const fixedReel = generateFixedReel()
    const initialReel = useRef(fixedReel)
    const [reelNumbers, setReelNumbers] = useState(initialReel.current.map((num, i) => ({ number: num, idx: i })))
    const [slotData, setSlotData] = useState(SLOT_DATA.big)
    const [selectedNumbers, setSelectedNumbers] = useState({
        prev: { number: 100, idx: fixedReel.indexOf(100) },
        current: { number: 100, idx: fixedReel.indexOf(100) }
    })

    const getReelInRange = useCallback((startingSelectedIdx, endingSelectedIdx, rotations) => {
        let newReel = []

        let differenceBetweenStartStop = endingSelectedIdx >= startingSelectedIdx ?
            endingSelectedIdx - startingSelectedIdx :
            reelNumbers.length - startingSelectedIdx + endingSelectedIdx
        const reelLength = slotData.size + (rotations * reelNumbers.length) + differenceBetweenStartStop

        for (let i = 0; i < reelLength; i++) {
            let currentInReelIdx = getIndexInReel(reelNumbers, i + startingSelectedIdx - (slotData.size - slotData.selectedIdx) + 1)
            newReel.push(reelNumbers[currentInReelIdx])
        }

        return newReel
    }, [reelNumbers, slotData.selectedIdx, slotData.size])

    const [renderedReel, setRenderedReel] = useState(getReelInRange(selectedNumbers.prev.idx, selectedNumbers.current.idx, 0))
    const [playersTurn, setPlayersTurn] = useState(true)
    const [gameOver, setGameOver] = useState(false)

    const theme = useTheme()

    const [spinning, setSpinning] = useState(false)

    const resetGame = () => {
        setSpinning(false)
        setReelNumbers(initialReel.current)
        setSlotData(SLOT_DATA.big)
        setPlayersTurn(true)
        setGameOver(false)
    }

    function getIndexInReel(reel, idx) {
        const length = reel.length;
        // Calculate wrapped index using modulo operation
        const wrappedIndex = ((idx % length) + length) % length;
        return wrappedIndex;
    }

    const checkWin = () => {
        if (selectedNumbers.current.number === 1) {
            if (playersTurn) {
                setGameOver("You lose!")
            }
            else {
                setGameOver("You win!")
            }
        }
    }

    const spin = async () => {
        const selectedIndex = Math.floor(Math.random() * reelNumbers.length); // Choose a random winning index
        console.log("Spin, selectedIdx", selectedIndex, "selectedNums", selectedNumbers)
        setSelectedNumbers(prev => (
            {
                prev: prev.current,
                current: reelNumbers[selectedIndex]
            }
        ))
        setRenderedReel(getReelInRange(selectedNumbers.current.idx, selectedIndex, 2))
        console.log("REEEL NUMBERS", reelNumbers)
        setInterval(() => {
            checkWin()
        }, [SPIN_TIME_MS])
    };

    return (
        <div className='game-window' style={{ backgroundColor: "#222" }}>
            <div className='game-reel-mask' style={{
                display: "flex",
                overflow: "hidden",
                width: slotData.size * 100,
                height: 100,
                border: "2px solid #ffc733",
                backgroundColor: "#333",
                borderRadius: 8,
                position: "relative",
                marginBottom: 20
            }}>
                <Reel reelItems={renderedReel} selectedItem={selectedNumbers} slotData={slotData} />
            </div>
            {gameOver &&
                <Alert severity={playersTurn ? 'error' : 'success'}>{gameOver}</Alert>
            }
            {playersTurn ?
                <Box color="dark.contrastText">
                    Your Turn
                </Box> :
                <Box color="dark.contrastText">
                    House's Turn
                </Box>}
            {gameOver ?
                <input type="button" value="Reset" onClick={resetGame} /> :
                <input type="button" value='Spin' onClick={spin} disabled={spinning || !playersTurn} />
            }
        </div>
    )

}

export default DeathRollTest