import React, { Dispatch, SetStateAction } from "react";
import './StrictModeButton.css'

type StrictModeButtonProps = {
  onClick: Dispatch<SetStateAction<boolean>>
  strictModeOn: boolean
  gameRunning: boolean
}

const StrictModeButton: React.FC<StrictModeButtonProps> = ({ onClick, strictModeOn, gameRunning }) => {
  const handleClick = () => {
    onClick(!strictModeOn)
  }

  return (
    <div>
      <div className={`led ${strictModeOn ? "led-on" : "led-off"}`} />
      <button disabled={gameRunning} id="strict-mode" onClick={handleClick}>Strict Mode</button>
    </div>
  );
};

export default StrictModeButton