import React from "react";
import {Button} from './components';

class  Navigator extends React.Component {
    constructor(props) {
        super(props);
      }
      render(){
    return (
        <div className="navigator">
        <Button 
        name="Config"
        onClick={() => this.props.navigateTo("config")}
        />
        <Button 
        name="Sesiones"
        onClick={() => this.props.navigateTo("sessions")}
        />
        <Button 
        name="Player"
        onClick={() => this.props.navigateTo("player")}
        />
    </div>
    
    )
      }
    }
  export {Navigator}