import React from "react";
import { connect } from 'react-redux';
import { Route, Switch, browserHistory } from 'react-router-dom';
import { PanelMain } from "./components/panel_main";
import * as Main from './views/main'
import { Modal } from "./components/modal";
import { PanelPlayer } from "./components/panel_player";
import { PanelConfig } from "./components/panel_config";
import { PanelSessions } from "./components/panel_sessions";
import {setState, changeState} from './components/utils.js';
import { Navigator } from "./components/navigator";
import store from './store';
import { actions } from "./redux/reducer";

import "./App.css";
const myRef = React.createRef();
class App extends React.Component {

  onUnload = e => {
    localStorage.setItem('my_sessions', JSON.stringify(store.getState().sessions));
    localStorage.setItem('my_actual_session', JSON.stringify(store.getState().actual_session));
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    store.dispatch(actions.setState("sessions", JSON.parse(localStorage.getItem('my_sessions')) || store.getState().sessions))
    if (localStorage.getItem('my_actual_session')) {
      store.dispatch(actions.setState("actual_session", JSON.parse(localStorage.getItem('my_actual_session'))))
    }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  navigateTo = (a, b) => {
    console.log("paso ", this.props)
    // store.dispatch(actions.navigateTo(a));
  };


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
  };



  render() {
    return (
      <section>
        <Navigator
          location={store.getState().location}
          navigateTo={a => {
            this.navigateTo(a);
          }}
        />
        <Modal
          accept={(e) => {/*  this.setState("modal", e)*/store.dispatch(actions.setstate("modal",e)) }}
          ref={myRef}
          showme={store.getState().modal}
        > Nombre de la sesión </Modal>

        <Switch>
          <Route path="/main" render={() => <PanelMain
            changeState={(a, b) => {
              changeState(a, b);
            }}
            addSession={a => {
              this.addSession(a);
            }}
            mystate={store.getState()}
          />} />

          <Route path="/config" render={() => <PanelConfig
            changeState={(a, b) => {
              changeState(a, b);
            }}
            setState={(a, b) => {
              console.log("me llega ", a, b);
              setState(a, b);
            }}
            mystate={store.getState()}
          />} />

          <Route path="/sessions" render={() => <PanelSessions
            setSession={a => {
              this.setSession(a);
            }}
            removeSession={a => {
              this.removeSession(a);
            }}
            mystate={store.getState()}
          />} />
          <Route path="/player" render={() => <PanelPlayer
            changeState={(a, b) => {
              changeState(a, b);
            }}
            mystate={store.getState()}

          />} />
          <Route path="/" render={() => <PanelMain
            changeState={(a, b) => {
              changeState(a, b);
            }}
            addSession={a => {
              this.addSession(a);
            }}
            mystate={store.getState()}
          />} />
        </Switch>
      </section>

    );
  }
}
/*
const handleChange = (e) =>{
  console.log(e);

}*/
//store.subscribe(handleChange);

const mapStateToProps = state => ({
  state: state,
})

const mapDispatchToProps = dispatch => ({
  changeState:
    (a, b) => store.dispatch(actions.changeState(a, b)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

