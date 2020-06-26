import React from "react";

const Button = ({ full, name, active, mute, onClick, ...props }) => {

  const url = "./media/click.mp3";
  const audio = new Audio(url);
  const playme = () => {
    if (!mute) audio.play();
    console.log("pasoporaquin")
    onClick()
  }

  return (
    <div className={"component-button" + (full ? ' full' : '') + (active ? ' active' : '')}
      onClick={playme}>
      {name}
      {props.children}
    </div>
  );
}

export { Button };

const TimeFormat = ({ value }) => {
  const secondsToMinutes = Math.floor(value / 60) + ':' + ('0' + Math.floor(value % 60)).slice(-2);
  return (
    <span className="number">
      {secondsToMinutes}
    </span>
  );
}
export { TimeFormat };
