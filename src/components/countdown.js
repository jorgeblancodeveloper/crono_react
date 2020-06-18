import React, { useState } from "react";
import { Button, TimeFormat } from './components';

let myplay = false;
let mytimer;
let my_status="clear";
const CountDown = (props) => {
  const [counter, setCounter] = React.useState(props.status.fight);
  const [counter_fight, setCounter_fight] = React.useState(props.status.fight);
  const [counter_rest, setCounter_rest] = React.useState(props.status.rest);

  const [is_paused, setPaused] = React.useState(true);

  const espera = (ms, fase) => new Promise(resuelve => {
    my_status=fase;
    mytimer = setInterval(
      () => {
        console.log("paso por " + this);
        ms--;
        setCounter(ms)
        if (ms == 0 || !is_paused) {
          clearInterval(mytimer);
          resuelve(fase)
        };
      }, 300)
  }

  );
  const starttimer =  () => {
    setPaused(!is_paused);
    //if (is_paused) outsideResolve("done")
    if  (!is_paused) {
      my_status="paused";
      clearInterval(mytimer);
    } else if (my_status=="clear") {   
      init_counter();
   
  } else {
   console.log("nos e")
  }
  }
const borra= ()=>{
  my_status=""  
}
  const init_counter=async ()=>{
    for (let paso = 1; paso < props.status.rounds; paso++) {
      await espera(counter, "combate")
      await espera(counter_rest, "rest")
    };
    await borra();
    console.log(my_status)
    console.log(my_status)
  }
React.useEffect(() => {console.log("props",props) }, []);
  
  React.useEffect(() => {setCounter_fight(props.status.fight);setCounter(props.status.fight)  }, [props.status.fight]);
  React.useEffect(() => {setCounter_rest(props.status.rest)  }, [props.status.rest]);
  /*
    React.useEffect(() => {
      let timer = (counter_fight
   > 0) && setInterval(() => {
        console.log(is_paused);
        if (myplay) setCounter_fight
  (counter_fight
     - 1)
      }, 1000);
      return () => clearInterval(timer);
    }, [counter_fight]);
  */


  /*
    const togglePaused = () => {
      setCounter_fight
(props.tiempo.restante)
      myplay = !myplay;
      setPaused(!is_paused);
    }
  */



  let mysimbol = is_paused ? "▶" : "II";
  let percent= 100-parseInt((counter/counter_fight)*100);
  var style = {
    height: percent+'vh',
  };
  return (
    <div className={my_status+" counter " + mysimbol} >
      <div className="layer" style={style}></div>
      <Button onClick={starttimer /*togglePaused*/}>
      <TimeFormat value={counter} />    {mysimbol}   <br/>       </Button>
     </div>
  )
}
export { CountDown };