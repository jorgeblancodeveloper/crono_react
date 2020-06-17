import React from "react";
import { Button } from './components';

let Navigator = (props)=> {
  console.log(props.location)
    return (
      <div className="navigator">
         <Button active={props.location=="main"}  onClick={() => props.navigateTo("main")} >Main</Button>
        <Button active={props.location=="config"} className={"active"}  onClick={() => props.navigateTo("config")} >Config</Button>
        <Button active={props.location=="sessions"} className={props.location=="sessions" && "active" }  onClick={() => props.navigateTo("sessions")}>Sesiones</Button>
        <Button active={props.location=="player"} className={props.location=="player" && "active" } onClick={() => props.navigateTo("player")}>Player</Button>
      </div>
    )
}
export { Navigator }

