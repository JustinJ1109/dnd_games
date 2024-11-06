import "../styles/rouletteTable.css";
import data from "../schemas/roulette-schema";
import { Tooltip } from "@mui/material";

const sortedData = [...data].sort((a, b) => {
    const optionA = isNaN(a.option) ? a.option : parseInt(a.option, 10);
    const optionB = isNaN(b.option) ? b.option : parseInt(b.option, 10);

    return optionA > optionB ? 1 : optionA < optionB ? -1 : 0;
});

const RouletteBettingTable = ({ onClick, disabled }) => {
    const numbers = sortedData.filter(num => num.option !== "0" && num.option !== "00");

    return (
        <div className="roulette-table" style={{ "pointerEvents": disabled ? "none" : "auto", margin: "25px" }}>
            <div className="roulette-grid roulette-numbergrid">
                <div id="bet-0" className={`roulette-numberbox roulette-box green roulette-0  ${disabled ? 'disabled' : ''}`} onClick={onClick}>0</div>
                <div id="bet-00" className={`roulette-numberbox roulette-box green roulette-00  ${disabled ? 'disabled' : ''}`} onClick={onClick}>00</div>
                {numbers.map((num, index) => (
                    <div
                        key={num.option}
                        id={`bet-${num.option}`}
                        className={`roulette-numberbox roulette-box ${num.style.backgroundColor} ${disabled ? 'disabled' : ''}`}
                        style={{
                            color: num.style.textColor,
                            gridColumn: Math.floor(index / 3) + 2, /* Start at column 2 after 0 and 00 */
                            gridRow: (index % 3) + 1
                        }}
                        onClick={onClick}
                    >
                        {num.option}
                    </div>
                ))}
            </div>
            <div className="roulette-grid roulette-12grid">
                <div id="bet-1st12" className={`roulette-box roulette-groupbox _12s _1st-12  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    1st 12
                </div>
                <div id="bet-2nd12" className={`roulette-box roulette-groupbox _12s _2nd-12  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    2nd 12
                </div>
                <div id="bet-3rd12" className={`roulette-box roulette-groupbox _12s _3rd-12  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    3rd 12
                </div>
            </div>
            <div className="roulette-grid roulette-betting-groups">
                <div id="bet-1to18" className={`roulette-box roulette-groupbox _6  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    1-18
                </div>
                <div id="bet-even" className={`roulette-box roulette-groupbox _6  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    Even
                </div>
                <div id="bet-red" className={`roulette-box roulette-groupbox _6  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    <span style={{ color: "red", scale: "2" }}>♦</span>
                </div>
                <div id="bet-black" className={`roulette-box roulette-groupbox _6  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    <span style={{ color: "black", scale: "2" }}>♦</span>
                </div>
                <div id="bet-odd" className={`roulette-box roulette-groupbox _6  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    Odd
                </div>
                <div id="bet-19to36" className={`roulette-box roulette-groupbox _6  ${disabled ? 'disabled' : ''}`} onClick={onClick}>
                    19-36
                </div>
            </div>
        </div>
    );
}

export default RouletteBettingTable;
