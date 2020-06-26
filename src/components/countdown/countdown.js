import React from "react";
import { Button, TimeFormat } from '../components';
import { play_sound } from "../sounds/sounds";
var outsideResolve;
let mytimer;
const CountDown = (props) => {
 // const [counter_now, setCounter_now] = React.useState(props.status.fight);
 console.log("arranco ?",props.data)
  const [counter_now, setCounter_now] = React.useState(props.data.combate);
  let [my_status, setmy_status] = React.useState("clear");
  let [my_round, setmyRound] = React.useState(1);
  const [is_paused, setPaused] = React.useState(false);

  React.useEffect(() => {  setCounter_now(props.data.combate) }, [props.data.combate]);

  const starttimer = () => {
    if (my_status === "clear") {
      init_counter();

    } else {
      if (is_paused) {
        init_counter(my_round);
      } else {
        clearInterval(mytimer);
      }
      setPaused(!is_paused);
    }
  }

  const init_counter = async (myround) => {
    for (let n = (myround? myround:1); n <= props.data.asaltos; n++) {
      setmyRound(n);
      setmy_status( "combate");
      play_sound(props.data.sounds_asalto);
      await espera(counter_now);
      console.log("veo ",my_round,props.data.asaltos)
      if (n<props.data.asaltos){
       setmy_status( "rest");
      play_sound(props.data.sounds_descanso)
      await espera(props.data.descanso) 
    } else {
      play_sound(props.data.sounds_fincombate)
      borra();
      }
    };
  }

  const espera = (ms) => new Promise(resuelve => {
    outsideResolve = resuelve; 
    mytimer = setInterval(
      (e) => {
        setCounter_now(ms--);
        console.log("trabajando")
        if (ms == 0) {
          clearInterval(mytimer);
          resuelve()
        };
      }, 300)
  }

  );

  const borra = () => {
    setmy_status("clear");
    setPaused(false);
    setCounter_now(props.data.combate)
  }

  let mysimbol = is_paused ? "▶" : "II";
  let percent = 100 - parseInt((counter_now / (my_status == "rest" ? props.data.descanso : props.data.combate)) * 100);
let visual_round = my_status != "clear" && <div className="view_round">{my_round}/{props.data.asaltos}</div>
  let misclases = is_paused ? my_status + " counter paused" : my_status + " counter "
  return (
    <div className={misclases}>
      {visual_round}
      {my_status != "clear" && <div className="layer" style={{ height: percent + 'vh' }}></div>}
      <Button onClick={starttimer}><TimeFormat value={counter_now} />{mysimbol} <br />{is_paused}</Button>
      {is_paused && my_status != "clear" && <div className="cancelar">  <Button onClick={borra}> cancelar</Button></div>}
    </div>
  )
}
export { CountDown };