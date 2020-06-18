import React from "react";
import { Button, TimeFormat } from './components';

import store from '../store';
import { actions } from "../redux/reducer";
class PanelSessions extends React.Component {
  constructor(props) {
    super(props);
  }
  setSession = a => {
    store.dispatch(actions.setSession({ ...store.getState().actual_session, ...a }));
    this.props.history.push("/main")
  };
  removeSession = a => {
    store.dispatch(actions.setState("domremove", a))
    //this.forceUpdate();
    setTimeout(() => {
      store.dispatch(actions.removeSession(a))
    }, 1000)
  };

  render() {
    const mysessions = store.getState().sessions;
    const lista = Object.keys(mysessions).map(myname => {
      const content = (
        <div>
          <h3>
            {myname}
          </h3>
          <p><b>Asaltos:</b> {mysessions[myname].asaltos} </p>
          <p><b>Descanso:</b>  <TimeFormat value={mysessions[myname].descanso} /></p>
          <p><b>Combate:</b>  <TimeFormat value={mysessions[myname].combate} /></p>
        </div>
      )
      return (<div key={myname} className= {store.getState().domremove == myname ? "delete" : store.getState().domadd == myname ? "add" : ""}>
        <Button full onClick={() => this.setSession(mysessions[myname])}>{content} </Button>
        <Button onClick={() => { this.removeSession(myname)}} > ×</Button>
      </div>
      )
    });

    return (
      <div className="panel_sessions">
        {lista}
      </div>
    );
  }
}

export { PanelSessions }