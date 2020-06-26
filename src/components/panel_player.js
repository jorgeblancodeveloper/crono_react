import React from "react";
import store from '../store';
import {CountDown} from './countdown/countdown';

const  PanelPlayer =(props)=> {


console.log(props)
  return  (
        <div className="panel_player">
          <CountDown tiempo={{"restante":store.getState().actual_session.combate}}></CountDown>
  
        </div>
      );
  }

  export {PanelPlayer}