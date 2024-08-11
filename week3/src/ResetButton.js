import reset from "./assets/ic-reset.svg";

function ResetButton({ className, onClick }) {
  return (
    <img className={className} src={reset} alt="초기화" onClick={onClick} />
  );
}

export default ResetButton;
