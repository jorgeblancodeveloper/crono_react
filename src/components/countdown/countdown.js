import React from "react";
import { Button, TimeFormat } from '../components';
import { play_sound } from "../sounds/sounds";

var outsideResolve;
let mytimer;
const CountDown = (props) => {
  // const [counter_now, setCounter_now] = React.useState(props.status.fight);

  const [counter_now, setCounter_now] = React.useState(props.data.combate);
  let [my_status, setmy_status] = React.useState("clear");
  let [my_round, setmyRound] = React.useState(1);
  const [is_paused, setPaused] = React.useState(false);
  const mp3background=new Audio("../media/manowar.mp3");
  React.useEffect(() => { setCounter_now(props.data.combate) }, [props.data.combate]);

  const starttimer = () => {
    if (my_status === "clear") {
      init_counter();
    } else {
      mp3background.pause()
      if (is_paused) {
    //    mp3background.play()
        init_counter(my_round);
      } else {
        clearInterval(mytimer);
        console.log("lo paro");
        mp3background.pause()
      }
      setPaused(!is_paused);

    }
  }

  const init_counter = async (myround) => {
  //  mp3background.play();


    for (let n = (myround ? myround : 1); n <= props.data.asaltos; n++) {
      setmyRound(n);
      setmy_status("combate");
      console.log("lo arranco")
      if (mp3background.paused && ) {mp3background.play()}
      play_sound(props.data.sounds_asalto);
      await espera(counter_now);
      console.log("veo ", my_round, props.data.asaltos)
      if (n < props.data.asaltos) {
        setmy_status("rest");
        mp3background.pause()
        play_sound(props.data.sounds_descanso)
        await espera(props.data.descanso)
      } else {
        mp3background.pause()
        mp3background.currentTime = 0;
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
       // console.log(ms, props.data.get_ready)
        if (ms == 10 && (props.data.get_ready==3 ||props.data.get_ready==4)) {
          play_sound(props.data.sounds_preaviso)
        };

        if (ms == 0) {
          clearInterval(mytimer);
          resuelve()
        };
      }, 500)
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