import styled from '@emotion/styled';
import { css, keyframes, useTheme } from '@emotion/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/system';

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

const SPIN_SPEED_MS = 500
const generateFixedReel = () => {
    let numbers = Array.from({ length: 100 }, (_, i) => i + 1)
    numbers = numbers.sort(() => Math.random() - 0.5)
    return numbers
}

const spinKf = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
`

const ReelSlotWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    font-size: 24px;
    font-weight: bold;
    color: #ffc733;
    transition: transform 0.3s ease, opacity 0.3s linear;

    ${({ spinning }) =>
        spinning &&
        css`
            animation: ${spinKf} ${((SPIN_SPEED_MS - .5) / 1000.0)}s infinite;
        `
    }
    
    ${({ selected, spinning }) =>
        selected && !spinning ?
            css`
            border: 5px solid #ffc733;
            backgroundColor: #444;
            boxShadow: 0 0 15px #ffd700;
            transform: scale(1.1);
        ` :
            css`
            border: 1px solid #ffc733
        `
    }
    `

const ReelSlot = ({ number, spinning, selected }) => {
    return (
        <ReelSlotWrapper spinning={spinning} selected={selected} className={selected ? 'selected' : ''}>
            {number}
        </ReelSlotWrapper>
    )
}



const DeathRollTest = () => {
    const initialReel = useRef(generateFixedReel())
    const [reelNumbers, setReelNumbers] = useState(initialReel.current)
    const [slotData, setSlotData] = useState(SLOT_DATA.big)
    const [playersTurn, setPlayersTurn] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const theme = useTheme()

    const getDisplayedNumbers = (centerIdx, reel, slotData) => {
        let nums = []
        for (let i = 0; i < slotData.size + 1; i++) {
            let idx = centerIdx - slotData.selectedIdx + i
            if (idx < 0) {
                idx = reel.length - i - 1
            }
            else if (idx >= reel.length) {
                idx = i
            }
            nums.push(idx)
        }
        return nums
    }

    const [displayedNumberIndexes, setDisplayedNumberIndexes] = useState(() => {
        const idx100 = reelNumbers.indexOf(100)
        return getDisplayedNumbers(idx100, reelNumbers, slotData)
    })
    const [spinning, setSpinning] = useState(false)
    const spinInterval = useRef(null)

    const startSpin = (stopOnIdx, numIterations) => {
        return new Promise((resolve) => {
            setSpinning(true);
            let currentIter = 0
            // Start a new interval to rotate displayed numbers
            spinInterval.current = setInterval(() => {
                setDisplayedNumberIndexes((prev) => prev.map(val => val + 1 >= reelNumbers.length ? 0 : val + 1))
                if (currentIter >= numIterations) {
                    clearInterval(spinInterval.current)
                    setSpinning(false)
                    resolve()
                }
                currentIter++
            }, SPIN_SPEED_MS);
        });
    };

    const checkGame = (landedIdx) => {
        if (reelNumbers[landedIdx] === 1) {
            if (playersTurn) {
                alert("You lose!")
            }
            else {
                alert("You win!")
            }
            setGameOver(true)
        }
    }

    const resetGame = () => {
        clearInterval(spinInterval.current)
        setSpinning(false)
        setReelNumbers(initialReel.current)
        setSlotData(SLOT_DATA.big)
        setPlayersTurn(true)
        setDisplayedNumberIndexes(getDisplayedNumbers(initialReel.current.indexOf(100), initialReel.current, SLOT_DATA.big))
        setGameOver(false)
    }

    const spin = async () => {
        // const spinForLength = 
        const landedIdx = Math.floor(Math.random() * reelNumbers.length); // Choose a random winning index
        const numIterations = reelNumbers.length - 1 - (displayedNumberIndexes[slotData.selectedIdx] - landedIdx)
        console.log("Winning index:", landedIdx, "NumIter", numIterations, "Winning number", reelNumbers[landedIdx]);

        await startSpin(landedIdx, numIterations); // Start the spinning
        const newNums = reelNumbers.filter(val => val <= reelNumbers[landedIdx])
        console.log(newNums)
        setReelNumbers((prev) => {
            const newReel = prev.filter(val => val <= prev[landedIdx])
            let newSlotData = null
            if (newReel.length <= SLOT_DATA.big.size + 1) {
                newSlotData = SLOT_DATA.medium
            }
            if (newReel.length <= SLOT_DATA.medium.size + 1) {
                newSlotData = SLOT_DATA.small
            }
            newSlotData && setSlotData(newSlotData)
            setDisplayedNumberIndexes(getDisplayedNumbers(newReel.indexOf(reelNumbers[landedIdx]), newReel, newSlotData ?? slotData))

            return newReel
        })
        checkGame(landedIdx)
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
                <div className='game-reel'
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: slotData.size * 100 + 100,
                    }}
                >
                    {displayedNumberIndexes.map((reelIdx, idx) => {
                        return (
                            <ReelSlot
                                key={`${reelIdx}`}
                                number={reelNumbers[reelIdx]}
                                selected={idx === slotData.selectedIdx}
                                spinning={spinning}
                            />)
                    })}
                </div>
            </div>
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