import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/system';

const generateFixedReel = () => {
    let numbers = Array.from({ length: 100 }, (_, i) => i + 1)
    numbers = numbers.sort(() => Math.random() - 0.5)
    return numbers
}

// min (inclusive) to max(inclusive)
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const SPIN_SPEED_MS = {
    max: 50,
    min: 500
}

const STARTING_NUM_SLOTS = 5
// represents the 'selected' number, the other 2 are just to illustrate the reel
const SELECTED_SLOT_INDEX = 2

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
            animation: ${spinKf} ${((SPIN_SPEED_MS.max - .5) / 1000.0)}s infinite;
        `
    }
    
    ${({ selected, spinning }) =>
        selected && !spinning &&
        css`
            border: 2px solid #ffc733;
            backgroundColor: #444;
            boxShadow: 0 0 15px #ffd700;
            transform: scale(1.1);
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
    const [numSlots, setNumSlots] = useState(STARTING_NUM_SLOTS)

    const getDisplayedNumbers = useCallback((selectedNum) => {
        if (reelNumbers.length < numSlots) {
            // Fallback for cases with fewer numbers than slots
            return [...reelNumbers, ...Array(numSlots - reelNumbers.length).fill(null)];
        }

        let newStartIndex = selectedNum !== undefined
            ? reelNumbers.indexOf(selectedNum) % reelNumbers.length
            : (reelNumbers.indexOf(100) - SELECTED_SLOT_INDEX + reelNumbers.length) % reelNumbers.length;

        let newDisplayNumbers = [];
        for (const x of Array(numSlots + 1).keys()) {
            newDisplayNumbers.push(reelNumbers[(newStartIndex + x) % reelNumbers.length]);
        }
        return newDisplayNumbers;
    }, [numSlots, reelNumbers]);

    const [displayedNumbers, setDisplayedNumbers] = useState(getDisplayedNumbers())
    const [spinning, setSpinning] = useState(false)
    const spinInterval = useRef(null)
    const timeouts = useRef([])
    const [readyToStopSpinning, setReadyToStopSpinning] = useState(true)

    // const startSpin = useCallback(async () => {
    //     setSpinning(true)

    //     // Generate the winning index
    //     const winningIndex = Math.floor(Math.random() * reelNumbers.length)
    //     let intervals = 0
    //     let minIntervals = randomIntFromInterval(80, 120) // Minimum intervals before stopping
    //     console.log("Min intervals", minIntervals)
    //     console.log("winning idx", winningIndex)
    //     console.log("winning nbr", reelNumbers[winningIndex])
    //     return new Promise((resolve) => {
    //         spinInterval.current = setInterval(() => {
    //             setDisplayedNumbers((prev) => {
    //                 // Get the updated numbers based on the previous displayed numbers
    //                 const newDisplayNumbers = getDisplayedNumbers(
    //                     prev[(SELECTED_SLOT_INDEX - 1) < 0 ?
    //                         reelNumbers.length - 1 :
    //                         SELECTED_SLOT_INDEX - 1]
    //                 )
    //                 intervals++
    //                 // Check if we've reached the winning number after minimum intervals
    //                 if (
    //                     intervals >= minIntervals &&
    //                     newDisplayNumbers[SELECTED_SLOT_INDEX] === reelNumbers[winningIndex]
    //                 ) {
    //                     // Winning condition met, stop the spin
    //                     clearInterval(spinInterval.current)
    //                     setSpinning(false)
    //                     resolve() // Resolve the promise
    //                 }
    //                 return newDisplayNumbers
    //             });
    //         }, SPIN_SPEED_MS.max)
    //     })


    // }, [getDisplayedNumbers, reelNumbers])

    const startSpin = useCallback(() => {
        return new Promise((resolve) => {
            setSpinning(true)
            setReadyToStopSpinning(false)
            const winningIndex = Math.floor(Math.random() * reelNumbers.length)
            console.log("winning nbr", reelNumbers[winningIndex])

            spinInterval.current = setInterval(() => {
                setDisplayedNumbers((prev) => {
                    const newDisplayNumbers = getDisplayedNumbers(
                        prev[(SELECTED_SLOT_INDEX - 1) < 0 ?
                            reelNumbers.length - 1 :
                            SELECTED_SLOT_INDEX - 1]
                    )
                    return newDisplayNumbers
                });
            }, SPIN_SPEED_MS.max);

            setTimeout(() => {
                setReadyToStopSpinning(true)
            }, 1400)
        })
    })

    useEffect(() => {
        if (spinning) return

        const selectedNum = displayedNumbers[SELECTED_SLOT_INDEX]
        setReelNumbers(
            (prev) => prev.filter((num) => num <= selectedNum)
        )
    }, [displayedNumbers, spinning])

    useEffect(() => {
        console.log(reelNumbers)
        if (reelNumbers.length <= 2) {
            setNumSlots(1)
        }
        else if (reelNumbers.length <= 5) {
            setNumSlots(3)
        }
    }, [reelNumbers])

    const spin = useCallback(async () => {
        const spinDurationMs = randomIntFromInterval(2000, 5000)
        console.log("Spinning for", spinDurationMs)
        await startSpin()
        console.log("Done")
    }, [startSpin])

    return (
        <Box className='game-window' style={{ backgroundColor: "#222" }}>
            <Box className='game-reel-mask' style={{
                display: "flex",
                overflow: "hidden",
                width: numSlots * 100,
                height: 100,
                border: "2px solid #ffc733",
                backgroundColor: "#333",
                borderRadius: 8,
                position: "relative",
                marginBottom: 20
            }}>
                <Box className='game-reel'
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: numSlots * 100 + 100,
                    }}
                >
                    {displayedNumbers.map((number, index) => (
                        <ReelSlot
                            key={`${number}-${index}`}
                            number={number}
                            selected={index === SELECTED_SLOT_INDEX}
                            spinning={spinning}
                        />
                    ))}
                </Box>
            </Box>
            <input type="button" value='Spin' onClick={spin} disabled={spinning} />
        </Box>
    )

}

export default DeathRollTest