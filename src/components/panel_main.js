import React from "react";
import store from '../store';
import { Button, TimeFormat } from './components';
import { CountDown } from "./countdown";
import { play_sound } from "./sounds";
import { changeStateLimit, changeState } from './utils.js';
import { Modal } from "./modal";
import { actions } from "../redux/reducer";

const myRef = React.createRef();
class PanelMain extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    changeState("asaltos", 0)
  }
  askName = async function () {
    const modal = myRef.current;
    store.dispatch(actions.setState("modal", true))
    const result = await modal.sendSessionName();
    store.dispatch(actions.setState("modal", false))
    return result
  }
  addSession = async () => {
    const myname = await this.askName();
    store.dispatch(actions.setState("domadd", myname))
    setTimeout(() => {
      store.dispatch(actions.setState("domadd", ""))
    }, 1000)
    store.dispatch(actions.addSession(myname));
    store.dispatch(actions.navigateTo("sessions"))
    this.props.history.push("/sessions")
  };

  render() {

    const preaviso = [
      "Ninguno",
      "Asalto",
      "Descanso",
      "Asalto y descanso"
    ]
    var show_button = !store.getState().actual_session.name ?
      (<Button
        name="añadir sesion"
        full={true}
        onClick={() => this.addSession()}
      />) :
      (<div className="fake_button">{store.getState().actual_session.name}</div>);
    return (
      <>
        <Modal
          accept={(e) => {store.dispatch(actions.setstate("modal", e)) }}
          ref={myRef}
          showme={store.getState().modal}
        > Nombre de la sesión </Modal>
        <div className="panel_main">
          <CountDown
            status={{
              "rest": store.getState().actual_session.descanso,
              "fight": store.getState().actual_session.combate,
              "rounds": store.getState().actual_session.asaltos
            }}
          ></CountDown>
          <div className="row">
            <Button
              name="-"
              onClick={() => changeState("asaltos", -1)}
            />
            <h3>Asaltos{'\u00A0'} <span className="number">{store.getState().actual_session.asaltos}</span></h3>
            <Button
              name="+"
              onClick={() => changeState("asaltos", 1)}
            />
          </div>

          <div className="row">
            <Button
              value={-30}
              name="-"
              onClick={() => changeState("combate", -10)}
            />
            <h3>Combate{'\u00A0'}<TimeFormat value={store.getState().actual_session.combate} /></h3>
            <Button
              value={30}
              name="+"
              onClick={() => changeState("combate", 10)}
            />
          </div>
          <div className="row">
            <Button
              value={-30}
              name="-"
              onClick={() => changeState("descanso", -10)}
            />
            <h3>Descanso:{'\u00A0'}<TimeFormat value={store.getState().actual_session.descanso} /></h3>
            <Button
              value={30}
              name="+"
              onClick={() => changeState("descanso", 10)}
            />
          </div>
          <div className="row">
            <Button
              name="-"
              onClick={() => changeStateLimit("get_ready", -1, 4)}
            />
            <h3>Preaviso: <div>  {preaviso[store.getState().actual_session.get_ready]}{/*/this.mp3list[store.getState().actual_session.sounds.asalto]*/}</div></h3>
            <Button
              name="+"
              onClick={() => changeStateLimit("get_ready", 1, 4)}
            />
          </div>
          <div className="row">
            {show_button}
          </div>
        </div>
      </>
    );
  }
}

export { PanelMain }