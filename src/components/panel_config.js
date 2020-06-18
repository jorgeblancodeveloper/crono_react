import React from "react";
import { Button, TimeFormat } from './components';
import { soundLibrary } from "../resources/sound_library"
import { changeStateLimit } from './utils.js';
class PanelConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mp3list = soundLibrary.map((e) => { return e.name })
    const limit_sounds = mp3list.length;
    return (
      <div className="panel_config">
        <div className="row">
          <Button
            name="-"
            onClick={() => changeStateLimit("sounds_preaviso", -1, limit_sounds)}
          />
          <h3>Preaviso: <div>  {mp3list[this.props.mystate.actual_session.sounds_preaviso]}{/*/this.mp3list[this.props.mystate.actual_session.sounds.asalto]*/}</div></h3>
          <Button
            name="+"
            onClick={() => changeStateLimit("sounds_preaviso", 1, limit_sounds)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() => changeStateLimit("sounds_asalto", -1, limit_sounds)}
          />
          <h3>Asalto: <div> {mp3list[this.props.mystate.actual_session.sounds_asalto]} </div></h3>
          <Button
            name="+"
            onClick={() => changeStateLimit("sounds_asalto", 1, limit_sounds)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() => changeStateLimit("sounds_descanso", -1, limit_sounds)}
          />
          <h3>Descanso: <div> {mp3list[this.props.mystate.actual_session.sounds_descanso]} </div></h3>
          <Button
            name="+"
            onClick={() => changeStateLimit("sounds_descanso", 1, limit_sounds)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() => changeStateLimit("sounds_fincombate", -1, limit_sounds)}
          />
          <h3>Fin combate: <div> {mp3list[this.props.mystate.actual_session.sounds_fincombate]}</div></h3>
          <Button
            name="+"
            onClick={() => changeStateLimit("sounds_fincombate", 1, limit_sounds)}
          />
        </div>
      </div>
    );
  }
}

export { PanelConfig }