import "./Score.css";

function Score({ num, name }) {
  return (
    <div className="Score">
      <div className="Score-num">{num}</div>
      <div className="Score-name">{name}</div>
    </div>
  );
}

export default Score;
