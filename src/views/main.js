
import React from "react";
import store from '../store';
import {PanelMain} from '../components/panel_main.js'


const ViewMain= (<PanelMain
changeState={(a, b) => {
  this.changeState(a, b);
}}
addSession={a => {
  this.addSession(a);
}}
mystate={store.getState()}
//    actual_config={store.getState().actual_session_name}
/>)

export default ViewMain;