import HandIcon from "./HandIcon";
import "./Hand.css";

function Hand({ value, win }) {
  const className = win ? "Hand winner" : "Hand";
  return (
    <div className={className}>
      <HandIcon className="Hand-icon" value={value} />
    </div>
  );
}

export default Hand;
