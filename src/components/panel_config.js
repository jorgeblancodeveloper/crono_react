import React from "react";
import {Button, Time} from './components';

class  PanelConfig extends React.Component {
    constructor(props) {
        super(props);
      }


  render(){
    var  show_button =  !this.props.mystate.actual_session.name ?
    (<Button 
    name="añadir sesion"
    full={true}
    onClick={() => this.props.addSession()}
    />):
    (<div className="fake_button">{this.props.mystate.actual_session.name}</div>);
  return  (
        <div className="panel_config">
          <div className="row">
        <Button 
        value={-1}
        name="-"
        onClick={() => this.props.changeState("asaltos", -1)}
        />
        <h3>Asaltos{'\u00A0'} <span className="number">{this.props.mystate.actual_session.asaltos}</span></h3>
        <Button 
        value={1}
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
        <h3>Combate{'\u00A0'}<Time value={this.props.mystate.actual_session.combate}/></h3>
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
        <h3>Descanso:{'\u00A0'}<Time value={this.props.mystate.actual_session.descanso  }/></h3>
        <Button 
        value={30}
        name="+"
        onClick={() => this.props.changeState("descanso", 10)}
        />
    </div>
    <div className="row">
      {show_button}
             </div>
        </div>
      );
  }
  }

  export {PanelConfig}