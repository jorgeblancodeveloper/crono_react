import React from "react";
import { Button, TimeFormat } from './components';
import store from '../store';
class PanelSessions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mysessions = this.props.mystate.sessions;
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
      console.log("añado "+store.getState().domadd)
      return (<div key={myname} className={store.getState().domremove == myname ? "delete" : store.getState().domadd == myname ? "add" : ""}>
        <Button full onClick={() => this.props.setSession(mysessions[myname])}>{content} </Button>
        <Button onClick={() => { this.props.removeSession(myname)}} > ×</Button>
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