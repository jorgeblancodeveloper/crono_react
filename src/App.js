import React from "react";
import { connect } from 'react-redux';
import { Route, Switch, browserHistory,BrowserRouter } from 'react-router-dom';

import { PanelMain } from "./views/panel_main";


import { PanelPlayer } from "./components/panel_player";
import { PanelConfig } from "./views/panel_config";
import { PanelSessions } from "./views/panel_sessions";
import {setState, changeState} from './components/utils.js';
import { Navigator } from "./components/navigator/navigator";
import store from './store';
import { actions } from "./redux/reducer";

//import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {fade: false};
  }
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

  navigateTo = (e) => {
   
   this.setState({fade: e});
    // store.dispatch(actions.navigateTo(a));
  };





  render() {
    return (
      <section className={this.state.fade?"fade_out":"" }>
        <BrowserRouter>
        <Navigator
          location={store.getState().location}
          navigateTo={a => {
            this.navigateTo(a);
          }}
        />


        <Switch>
          <Route path="/main" component={PanelMain} />

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

          <Route path="/sessions"  component={PanelSessions}/>
          <Route path="/player" component={PanelPlayer} />

          <Route path="/" component={PanelMain} />
        </Switch>
    </BrowserRouter>
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

