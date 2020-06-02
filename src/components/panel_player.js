import React from "react";
import {Button} from './components';

class  PanelPlayer extends React.Component {
    constructor(props) {
        super(props);
      }

  render(){
  return  (
        <div className="panel_player">
        <Button name="▶"/>
        </div>
      );
  }
  }

  export {PanelPlayer}