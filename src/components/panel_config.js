import React from "react";
import { Button, TimeFormat } from './components';
import {soundLibrary} from "../resources/sound_library"

class PanelConfig extends React.Component {
  constructor(props) {
    super(props);
 
  }
  changeStateLimit(state,value,limit){
    (value+this.props.mystate.actual_session[state])>limit-1?
    this.props.setState("actual_session",{...this.props.mystate.actual_session,[state]:0}):
    (value+this.props.mystate.actual_session[state])<0?
    this.props.setState("actual_session",{...this.props.mystate.actual_session,[state]:limit-1}):
    this.props.changeState(state, value)
  }
  render() {
    const mp3list = soundLibrary.map((e)=>{return e.name  })
 
    console.log(soundLibrary,mp3list)
    const preaviso=[
      "Ninguno",
      "Asalto",
      "Ddescanso",
      "Asalto y descanso"
    ]
    const limit_sounds= mp3list.length;
    return (
      <div className="panel_config">
        <div className="row">
          <Button
            name="-"
            onClick={() =>this.changeStateLimit("get_ready", -1 , 4)}
          />
          <h3>Preaviso: <div>  {preaviso[this.props.mystate.actual_session.get_ready]}{/*/this.mp3list[this.props.mystate.actual_session.sounds.asalto]*/}</div></h3>
         <Button
            name="+"
            onClick={() => this.changeStateLimit("get_ready", 1,4)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() =>this.changeStateLimit("sounds_preaviso", -1 , limit_sounds)}
          />
          <h3>Sonido Preaviso: <div>  {mp3list[this.props.mystate.actual_session.sounds_preaviso]}{/*/this.mp3list[this.props.mystate.actual_session.sounds.asalto]*/}</div></h3>
         <Button
            name="+"
            onClick={() => this.changeStateLimit("sounds_preaviso", 1,limit_sounds)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() =>this.changeStateLimit("sounds_asalto", -1 , limit_sounds)}
          />
          <h3>Asalto: <div> {mp3list[this.props.mystate.actual_session.sounds_asalto]} </div></h3>
          <Button
            name="+"
            onClick={() => this.changeStateLimit("sounds_asalto", 1,limit_sounds)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() =>this.changeStateLimit("sounds_descanso", -1 , limit_sounds)}
          />
          <h3>Descanso: <div> {mp3list[this.props.mystate.actual_session.sounds_descanso]} </div></h3>
          <Button
            name="+"
            onClick={() => this.changeStateLimit("sounds_descanso", 1,limit_sounds)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() =>this.changeStateLimit("sounds_fincombate", -1 , limit_sounds)}
          />
          <h3>Fin combate: <div> {mp3list[this.props.mystate.actual_session.sounds_fincombate]}</div></h3>
          <Button
            name="+"
            onClick={() => this.changeStateLimit("sounds_fincombate", 1,limit_sounds)}
          />
        </div>
      </div>
    );
  }
}

export { PanelConfig }