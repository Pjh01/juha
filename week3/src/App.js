import { useState } from "react";
import ResetButton from "./ResetButton";
import HandButton from "./HandButton";
import { compareHand, generateRandomHand } from "./utils";
import "./App.css";
import Score from "./Score";
import Hand from "./Hand";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [win, setWin] = useState([false, false]);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) {
      setScore(score + bet);
      setWin([true, false]);
    }
    if (comparison < 0) {
      setOtherScore(otherScore + bet);
      setWin([false, true]);
    }
    if (comparison === 0) {
      setWin([false, false]);
    }
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
    setWin([false, false]);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <ResetButton className="App-reset" onClick={handleClearClick} />
      <div className="App-scores">
        <Score num={score} name="나" />
        <div className="App-versus">:</div>
        <Score num={otherScore} name="상대" />
      </div>

      <div className="Box App-box">
        <div className="Box-inner">
          <div className="App-hands">
            <Hand value={hand} win={win[0]} />
            <div className="App-versus">VS</div>
            <Hand value={otherHand} win={win[1]} />
          </div>

          <div className="App-bet">
            <span>배점</span>
            <input
              type="number"
              value={bet}
              min={1}
              max={9}
              onChange={handleBetChange}
            ></input>
            <span>배</span>
          </div>

          <div className="App-history">
            <h2>승부 기록</h2>
            <p>{gameHistory.join(", ")}</p>
          </div>
        </div>
      </div>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;
