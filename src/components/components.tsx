import React, { MouseEventHandler } from "react";

type Props = {
  full?: boolean,
  active?: boolean,
  mute?:boolean,
  name?: string,
  onClick?: any,
  props?:object,
  children?:any,
  value: number |0
}
const Button = ({ full, name, active, mute, onClick, ...props }:Props) => {
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

const TimeFormat = ({ value }:Props) => {
  const secondsToMinutes = Math.floor(value / 60) + ':' + ('0' + Math.floor(value % 60)).slice(-2);
  return (
    <span className="number">
      {secondsToMinutes}
    </span>
  );
}
export { TimeFormat };
