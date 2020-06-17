import React from "react";
import { NavLink  } from 'react-router-dom';

import { Button } from './components';
class Navigator extends React.Component {
  constructor(){
    super();
  }
//let Navigator = (props)=> {
componentDidMount(){
  console.log("mount" ,this.props);
}
  navigateTo=(e,link)=>{
console.log("props ",this.props,this.props.mypath);
//e.preventDefault();
 }
    render (){
      return(
      <div className="navigator">
              <NavLink  onClick={(e) => this.props.navigateTo("main")} className="component-button" to="main" >Main</NavLink>
             <NavLink  onClick={(e) => this.props.navigateTo("config")}  className="component-button"  to="config" >config</NavLink>
             <NavLink  onClick={(e) => this.navigateTo(e,"sessions")}  className="component-button"  to="sessions" >sessions</NavLink>
             <NavLink  onClick={(e) => this.navigateTo(e,"player")}  className="component-button"  to="player" >player</NavLink>
                 {/*<Button active={props.location=="main"}  onClick={() => navigateTo("main")} >Main</Button>
        <Button active={props.location=="config"} className={"active"}  onClick={() => navigateTo("config")} >Config</Button>
        <Button active={props.location=="sessions"} className={props.location=="sessions" && "active" }  onClick={() => navigateTo("sessions")}>Sesiones</Button>
        <Button active={props.location=="player"} className={props.location=="player" && "active" } onClick={() => this.navigateTo("player")}>Player</Button>/*/}
      </div>)}
    
}
export { Navigator }
//export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Navigator));
