import React from "react";
import store from '../store';
import {CountDown} from './countdown';

const  PanelPlayer =(props)=> {



  return  (
        <div className="panel_player">
          <CountDown tiempo={{"restante":store.getState().actual_session.combate}}></CountDown>
  
        </div>
      );
  }

  export {PanelPlayer}