import React, { useState, useEffect, useRef } from 'react';
import '../styles/deathRoll.css';

const generateFixedReel = () => {
    // Fixed order of numbers 1-100
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
};

const DeathRoll = () => {
    const [reelNumbers, setReelNumbers] = useState(generateFixedReel());
    const [displayedNumbers, setDisplayedNumbers] = useState(reelNumbers.slice(0, 3));
    const [spinning, setSpinning] = useState(false);
    const [lockedNumber, setLockedNumber] = useState(null);
    const spinInterval = useRef(null);

    const rollReel = () => {
        console.log(reelNumbers)
        setSpinning(true);

        // Start interval to simulate spinning
        spinInterval.current = setInterval(() => {
            setDisplayedNumbers((prev) => {
                const newStartIndex = (reelNumbers.indexOf(prev[1]) + 1) % reelNumbers.length;
                return [
                    reelNumbers[newStartIndex],
                    reelNumbers[(newStartIndex + 1) % reelNumbers.length],
                    reelNumbers[(newStartIndex + 2) % reelNumbers.length]
                ];
            });
        }, 50); // Speed of spinning

        // Stop spinning after 1.5 seconds
        setTimeout(() => {
            clearInterval(spinInterval.current);
            const newLockedNumber = reelNumbers[Math.floor(Math.random() * reelNumbers.length)];
            setLockedNumber(newLockedNumber);
            setSpinning(false);

            // Set final display to lock onto the lockedNumber
            const lockedIndex = reelNumbers.indexOf(newLockedNumber);
            setDisplayedNumbers([
                reelNumbers[(lockedIndex - 1 + reelNumbers.length) % reelNumbers.length],
                newLockedNumber,
                reelNumbers[(lockedIndex + 1) % reelNumbers.length]
            ]);

            // Remove numbers greater than the locked number for the next roll
            setReelNumbers(reelNumbers.filter((num) => num <= newLockedNumber));
        }, 1500);
    };

    return (
        <div className="death-roll-container">
            <div className="reel-mask">
                <div className="reel">
                    {displayedNumbers.map((number, index) => (
                        <div
                            key={index}
                            className={`reel-box ${index === 1 && !spinning ? 'highlight' : ''}`}
                        >
                            {number}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={rollReel} className="roll-button" disabled={spinning}>
                {spinning ? "Rolling..." : "Roll"}
            </button>
        </div>
    );
};

export default DeathRoll;
