import React from "react";
import { NavLink ,useHistory  } from 'react-router-dom';

import { Button } from './components';
const Navigator =(props)=> {

//let Navigator = (props)=> {
  let history = useHistory();
const  navigateTo =(e,link)=>{
//console.log("props ",this.props,this.props.mypath);
e.preventDefault();
props.navigateTo(true);
setTimeout(() => {
//this.props.nav();


    history.push(link);
    props.navigateTo(false);
 // this.props.history.push("/main")
}, 200)
 }

      return(
      <div className="navigator">
              <NavLink  onClick={(e) => navigateTo(e,"main")} className="component-button" to="main" >Main</NavLink>
             <NavLink  onClick={(e) => navigateTo(e,"config")}  className="component-button"  to="config" >config</NavLink>
             <NavLink  onClick={(e) => navigateTo(e,"sessions")}  className="component-button"  to="sessions" >sessions</NavLink>
             <NavLink  onClick={(e) => navigateTo(e,"player")}  className="component-button"  to="player" >player</NavLink>
                 {/*<Button active={props.location=="main"}  onClick={() => navigateTo("main")} >Main</Button>
        <Button active={props.location=="config"} className={"active"}  onClick={() => navigateTo("config")} >Config</Button>
        <Button active={props.location=="sessions"} className={props.location=="sessions" && "active" }  onClick={() => navigateTo("sessions")}>Sesiones</Button>
        <Button active={props.location=="player"} className={props.location=="player" && "active" } onClick={() => this.navigateTo("player")}>Player</Button>/*/}
      </div>)
    
}
export { Navigator }
//export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Navigator));
