import React from "react";
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '../components';
const Navigator = (props) => {
  let history = useHistory();
  const navigateTo = (e, link) => {
    e.preventDefault();
    props.navigateTo(true);
    setTimeout(() => {
      history.push(link);
      props.navigateTo(false);
    }, 200)
  }

  return (
    <div className="navigator">
      <NavLink onClick={(e) => navigateTo(e, "main")} className="component-button" to="main" >Main</NavLink>
      <NavLink onClick={(e) => navigateTo(e, "config")} className="component-button" to="config" >config</NavLink>
      <NavLink onClick={(e) => navigateTo(e, "sessions")} className="component-button" to="sessions" >sessions</NavLink>
      <NavLink onClick={(e) => navigateTo(e, "player")} className="component-button" to="player" >player</NavLink>
    </div>)

}
export { Navigator }
