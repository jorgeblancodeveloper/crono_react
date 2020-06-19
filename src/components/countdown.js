import React, { useState } from "react";
import { Button, TimeFormat } from './components';

let mytimer;
const CountDown = (props) => {
  const [counter, setCounter] = React.useState(props.status.fight);
  let [my_status, setmy_status] = React.useState("clear");
  let [my_round, setmyRound] = React.useState(1);
  const [counter_fight, setCounter_fight] = React.useState(props.status.fight);
  const [counter_rest, setCounter_rest] = React.useState(props.status.rest);
  const [is_paused, setPaused] = React.useState(true);

  const espera = (ms, fase) => new Promise(resuelve => {
    my_status = fase;
    setmy_status(fase)
    mytimer = setInterval(
      () => {
        setCounter(ms--)
        if (ms == 0) {
          clearInterval(mytimer);
          resuelve(fase)
        };
      }, 30)
  }

  );
  const starttimer = () => {
    setPaused(!is_paused);
    if (!is_paused) {
      my_status = "paused";
      setmy_status("paused")
      clearInterval(mytimer);
    } else if (my_status === "clear") {
      init_counter();
    } else {
      init_counter();
    }
  }
  const borra = () => {

    setmy_status("clear")
  }
  const init_counter = async () => {
    for (let n = 1; n <= props.status.rounds; n++) {
      setmyRound(n);
      await espera(counter, "combate")
      await espera(counter_rest, "rest")
    };
    await function () { };
  }
  React.useEffect(() => { console.log("props", props) }, []);
  React.useEffect(() => { setCounter_fight(props.status.fight); setCounter(props.status.fight) }, [props.status.fight]);
  React.useEffect(() => { setCounter_rest(props.status.rest) }, [props.status.rest]);

  let mysimbol = is_paused ? "▶" : "II";
  let percent = 100 - parseInt((counter / (my_status=="rest"?props.status.rest :props.status.fight )) * 100);
  var style = {
    height: percent + 'vh',
  };
  let visual_round = my_status != "clear" && <div class="view_round">{my_round}</div>
  return (
    <div className={my_status + " counter " } >
      {visual_round}
      {my_status != "clear" && <div className="layer" style={style}></div>}
      <Button onClick={starttimer}><TimeFormat value={counter} />{mysimbol} <br /></Button>
      {is_paused && my_status != "clear" && <div className="cancelar">  <Button onClick={borra}> cancelar</Button></div>}
    </div>
  )
}
export { CountDown };