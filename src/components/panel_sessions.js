import React from "react";
import {Button, Time} from './components';
import store from '../store';
class  PanelSessions extends React.Component {
    constructor(props) {
        super(props);
        var quitdom="";
      }

  render(){
    const mysessions = this.props.mystate.sessions;
    const lista = Object.keys(mysessions).map(myname => {
      const content=(
        <div>
        <h3>
          {myname}
        </h3>
      <p><b>Asaltos:</b> {mysessions[myname].asaltos} </p>
      <p><b>Descanso:</b>  <Time value={mysessions[myname].descanso} /></p>
      <p><b>Combate:</b>  <Time value={mysessions[myname].combate} /></p>
        </div>
      )
      return (<div key={myname} className= {store.getState().domremove==myname?"delete":store.getState().domadd==myname?"add":""}>
      <Button  full onClick={() => this.props.setSession(myname)} name={content} />
      <Button  onClick={() => {this.props.removeSession(myname); this.quitdom=myname}} name={'×'} />
               </div>
      )
    });

  return  (
        <div className="panel_sessions">
       {lista}
        </div>
      );
  }
  }

  export {PanelSessions}