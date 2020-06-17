import React from "react";
import { Button, TimeFormat } from './components';
import { CountDown } from "./countdown";
import {changeStateLimit} from './utils.js';

class PanelMain extends React.Component {
  constructor(props) {
    super(props);
   
  }
componentDidMount(){
  this.props.changeState("asaltos", 0)
}
  render() {
    const preaviso=[
      "Ninguno",
      "Asalto",
      "Ddescanso",
      "Asalto y descanso"
    ]
    var show_button = !this.props.mystate.actual_session.name ?
      (<Button
        name="añadir sesion"
        full={true}
        onClick={() => this.props.addSession()}
      />) :
      (<div className="fake_button">{this.props.mystate.actual_session.name}</div>);
    return (
      <div className="panel_main">
                 <CountDown tiempo={{"restante":this.props.mystate.actual_session.combate}}></CountDown>
        <div className="row">
          <Button
            name="-"
            onClick={() => this.props.changeState("asaltos", -1)}
          />
          <h3>Asaltos{'\u00A0'} <span className="number">{this.props.mystate.actual_session.asaltos}</span></h3>
          <Button
            name="+"
            onClick={() => this.props.changeState("asaltos", 1)}
          />
        </div>

        <div className="row">
          <Button
            value={-30}
            name="-"
            onClick={() => this.props.changeState("combate", -30)}
          />
          <h3>Combate{'\u00A0'}<TimeFormat value={this.props.mystate.actual_session.combate} /></h3>
          <Button
            value={30}
            name="+"
            onClick={() => this.props.changeState("combate", 30)}
          />
        </div>
        <div className="row">
          <Button
            value={-30}
            name="-"
            onClick={() => this.props.changeState("descanso", -10)}
          />
          <h3>Descanso:{'\u00A0'}<TimeFormat value={this.props.mystate.actual_session.descanso} /></h3>
          <Button
            value={30}
            name="+"
            onClick={() => this.props.changeState("descanso", 10)}
          />
        </div>
        <div className="row">
          <Button
            name="-"
            onClick={() =>changeStateLimit("get_ready", -1 , 4)}
          />
          <h3>Preaviso: <div>  {preaviso[this.props.mystate.actual_session.get_ready]}{/*/this.mp3list[this.props.mystate.actual_session.sounds.asalto]*/}</div></h3>
         <Button
            name="+"
            onClick={() => changeStateLimit("get_ready", 1,4)}
          />
        </div>
        <div className="row">
          {show_button}
        </div>
      </div>
    );
  }
}

export { PanelMain }