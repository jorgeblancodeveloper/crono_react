import React, { useState } from "react";

import { Button, TimeFormat } from './components';
let myplay = false;
const CountDown = (props) => {
  const [counter, setCounter] = React.useState(props.tiempo.restante);
  const [is_paused, setPaused] = React.useState(true);
  let amount = 100;
  /*const setStart = () => {
    myplay = !myplay;
    console.log("paly", myplay)
  }*/
  React.useEffect(() => {
    setCounter(props.tiempo.restante)
  }, [props.tiempo.restante]);


  React.useEffect(() => {
    console.log("usefefect " + myplay)
    let timer = (counter > 0) && setInterval(() => { console.log(is_paused); if (myplay) setCounter(counter - 1) }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const togglePaused = () => {
    setCounter(props.tiempo.restante)
    myplay = !myplay;
    setPaused(!is_paused);
  }

  let mysimbol = is_paused ? "▶" : "II";
  return (
    <div className={"counter " + mysimbol}>
      <Button onClick={togglePaused}>
        <TimeFormat value={counter} />  {mysimbol}    </Button>
    </div>
  )
}
export { CountDown };