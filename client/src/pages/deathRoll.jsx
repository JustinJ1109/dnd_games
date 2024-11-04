import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/deathRoll.css';
import WagerButton from '../components/wagerButton';
import { useCurrency } from '../components/currencyContext';

const generateFixedReel = () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
};

const MIN_WAGER = 50
const WIN_MOD = 1.75

const DeathRoll = () => {
    const initialReel = useRef(generateFixedReel());
    const { soulCoins, setSoulCoins } = useCurrency();
    const [reelNumbers, setReelNumbers] = useState(initialReel.current);
    const [playersTurn, setPlayersTurn] = useState(true);
    const [displayedNumbers, setDisplayedNumbers] = useState(getDisplayedNumbers(initialReel.current));
    const [spinning, setSpinning] = useState(false);
    const [lockedNumber, setLockedNumber] = useState(null);
    const [dropNumbers, setDropNumbers] = useState([]);
    const [payout, setPayout] = useState(0)
    const spinInterval = useRef(null);
    const timeouts = useRef([]);
    const [wager, setWager] = useState(MIN_WAGER)
    const [gameOver, setGameOver] = useState(false)
    const [inGame, setInGame] = useState(false)

    function getDisplayedNumbers(reel) {
        const centerNum = reel.indexOf(100);
        const leftNum = centerNum === 0 ? reel.length - 1 : centerNum - 1;
        const rightNum = centerNum === reel.length - 1 ? 0 : centerNum + 1;
        return [reel[leftNum], reel[centerNum], reel[rightNum]];
    }

    const startSpin = () => {
        return new Promise((resolve) => {
            setSpinning(true);
            setDropNumbers([]);

            spinInterval.current = setInterval(() => {
                setDisplayedNumbers((prev) => {
                    const newStartIndex = (reelNumbers.indexOf(prev[1]) + 1) % reelNumbers.length;
                    return [
                        reelNumbers[newStartIndex],
                        reelNumbers[(newStartIndex + 1) % reelNumbers.length],
                        reelNumbers[(newStartIndex + 2) % reelNumbers.length]
                    ];
                });
            }, 50);

            timeouts.current.push(setTimeout(resolve, 1500));
        });
    };

    const stopSpinAndLockNumber = () => {
        return new Promise((resolve) => {
            clearInterval(spinInterval.current);
            const newLockedNumber = reelNumbers[Math.floor(Math.random() * reelNumbers.length)];
            setLockedNumber(newLockedNumber);
            setSpinning(false);
            resolve(newLockedNumber);
        });
    };

    const updateDisplayedNumbers = (lockedNumber) => {
        return new Promise((resolve) => {
            const lockedIndex = reelNumbers.indexOf(lockedNumber);
            setDisplayedNumbers([
                reelNumbers[(lockedIndex - 1 + reelNumbers.length) % reelNumbers.length],
                lockedNumber,
                reelNumbers[(lockedIndex + 1) % reelNumbers.length]
            ]);
            resolve();
        });
    };

    const updateDroppedNumbers = (lockedNumber) => {
        return new Promise((resolve) => {
            const numbersToDrop = reelNumbers.filter((num) => num > lockedNumber);
            setDropNumbers(numbersToDrop);
            setReelNumbers(reelNumbers.filter((num) => num <= lockedNumber));
            resolve();
        });
    };

    const endTurnOrReset = (lockedNumber) => {
        return new Promise((resolve) => {
            if (lockedNumber === 1) {
                if (playersTurn) {
                    console.log("Player loses");
                } else {
                    console.log("House loses");
                    setPayout(wager * WIN_MOD)
                    setPlayersTurn(true)
                }
                setGameOver(true)
            } else {
                setPlayersTurn(!playersTurn);
            }
            resolve();
        });
    };

    useEffect(() => {
        setSoulCoins((prev) => prev + payout)
    }, [payout, setSoulCoins])

    const rollReel = useCallback(async () => {
        if (!inGame) {
            if (soulCoins < wager) {
                alert("Not enough Soul Coins!")
                return
            }
            setSoulCoins((prev) => prev - wager)
            setInGame(true)
        }
        try {
            await startSpin();
            const lockedNumber = await stopSpinAndLockNumber();
            await updateDisplayedNumbers(lockedNumber);
            await updateDroppedNumbers(lockedNumber);
            await endTurnOrReset(lockedNumber);
        } catch (error) {
            console.error("Error during rollReel:", error);
        }
    }, [playersTurn, reelNumbers]);

    const resetGame = useCallback(() => {
        setPayout(0)
        setInGame(false)
        setReelNumbers(initialReel.current);
        setPlayersTurn(true);
        setDisplayedNumbers(getDisplayedNumbers(initialReel.current));
        setSpinning(false);
        setLockedNumber(null);
        setDropNumbers([]);
        clearInterval(spinInterval.current);
        timeouts.current.forEach((timeout) => clearTimeout(timeout));
        timeouts.current = [];
        setGameOver(false)
    }, []);

    useEffect(() => {
        if (!playersTurn && !spinning) {
            const autoRollTimeout = setTimeout(() => {
                rollReel();
            }, 1500);
            timeouts.current.push(autoRollTimeout);
        }
    }, [playersTurn, rollReel, spinning]);

    return (
        <div>
            <div className='text-center'>
                {gameOver && payout ? <span><h2>Win {payout}</h2></span> :
                    gameOver && !payout ? <span><h2>Womp Womp!</h2></span> :
                        playersTurn ? <span>Your turn</span> :
                            <span>House's Turn</span>}
            </div>
            <div className="death-roll-container">
                <div className="reel-mask">
                    <div className="reel">
                        {displayedNumbers.map((number, index) => (
                            <div
                                key={index}
                                className={`reel-box ${index === 1 && !spinning ? 'highlight' : ''} ${dropNumbers.includes(number) ? 'drop' : ''}`}
                            >
                                {number}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={gameOver ? resetGame : rollReel} className="roll-button" disabled={spinning || !playersTurn}>
                    {spinning ? "Rolling..." :
                        gameOver ? "Play Again" :
                            playersTurn ? "Roll" :
                                "House's Roll"}
                </button>
            </div>
            <div className='row text-center'>
                <WagerButton min_wager={MIN_WAGER} wager={wager} setWager={setWager} />
            </div>
        </div>
    );
};

export default DeathRoll;
