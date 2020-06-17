import React from "react";

const Button = ({ full, name,active, onClick,...props }) => {
  const className = [
    "component-button",
  ];
  const url = "./media/click.mp3";
  const audio = new Audio(url);
  audio.crossOrigin = 'anonymous';
const playme=()=>{

  console.log("elotro")
  audio.play().catch(function(e){
    console.log("eeoro",e)
  })
  onClick()
}
  
  return (
    <div className={className.join(" ").trim() + (full ? ' full' : '') +  (active ? ' active' : '')}
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
