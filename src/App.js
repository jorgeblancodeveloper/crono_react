import React from "react";
import {connect}from 'react-redux';
import { PanelMain } from "./components/panel_main";
import { Modal } from "./components/modal";
import { PanelPlayer } from "./components/panel_player";
import { PanelConfig } from "./components/panel_config";
import { PanelSessions } from "./components/panel_sessions";
import { Navigator } from "./components/navigator";
import store from './store';
import {actions} from "./redux/reducer";

import "./App.css";
const myRef = React.createRef();
class App extends React.Component {

  onUnload = e => {
    console.log("medesmonto")
    // the method that will be used for both add and remove event
   // localStorage.setItem('my_sessions', JSON.stringify(store.getState().sessions));
   // localStorage.setItem('my_actual_session', JSON.stringify(store.getState().actual_session));
 }

  componentDidMount() {


    window.addEventListener("beforeunload", this.onUnload);
    console.log("he monto");
    console.log( JSON.parse(localStorage.getItem('my_sessions')))
    store.dispatch(actions.setState("sessions",    JSON.parse(localStorage.getItem('my_sessions')) || store.getState().sessions))
   
   if (localStorage.getItem('my_actual_session')){
   // store.dispatch(actions.setState("actual_session",    JSON.parse(localStorage.getItem('my_actual_session'))))

   }

 }

 componentWillUnmount() {
     window.removeEventListener("beforeunload", this.onUnload);
     console.log("me voy a desmontar")
 }

  changeState = (a, b) => {
    store.dispatch(actions.changeState(a,b))
  };
  setState = (a, b) => {
    store.dispatch(actions.setState(a,b))
  };
  navigateTo = (a, b) => {
    store.dispatch(actions.navigateTo(a));

  };

  setSession = a => {
    console.log("me llega ",a)
    store.dispatch(actions.setSession(a));
    store.dispatch(actions.navigateTo("main"))
  };

  askName = async function () {
    const modal = myRef.current;
    store.dispatch(actions.setState("modal",true))
    const result = await modal.sendSessionName();
    store.dispatch(actions.setState("modal",false))
    return result
  }


  addSession = async () => {
    const myname = await this.askName();
     store.dispatch(actions.setState("domadd",myname))
    setTimeout(()=>{ 
      store.dispatch(actions.setState("domadd",""))
     }, 1000)
    store.dispatch(actions.addSession(myname));
    store.dispatch(actions.navigateTo("sessions"))
  };

  removeSession = a => {
   store.dispatch(actions.setState("domremove",a))
   //this.forceUpdate();
   setTimeout(()=>{ 
   store.dispatch(actions.removeSession(a))
  }, 1000)
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
        accept={(e)=>{this.setState("modal",e)/* store.dispatch(actions.setstate("modal",e))*/}}
        ref={myRef}
        showme={store.getState().modal}
        > Nombre de la sesión </Modal>

        {store.getState().location == "main" && (
           <>
   

          <PanelMain
            changeState={(a, b) => {
              this.changeState(a, b);
            }}
            addSession={a => {
              this.addSession(a);
            }}
            mystate={store.getState()}
        //    actual_config={store.getState().actual_session_name}
          />
          </>
        )}
        {store.getState().location == "config" && (
           <>
   

          <PanelConfig
            changeState={(a, b) => {
              this.changeState(a, b);
            }}
            setState={(a, b) => {
              console.log("me llega ",a,b);
              this.setState(a, b);
            }}
            mystate={store.getState()}
          />
          </>
        )}
        {store.getState().location == "player" && (
          <PanelPlayer
            changeState={(a, b) => {
              this.changeState(a, b);
            }}
            mystate={store.getState()}

          />
        )}
        {store.getState().location == "sessions" && (
          <PanelSessions
            setSession={a => {
              this.setSession(a);
            }}
            removeSession={a => {
              this.removeSession(a);
            }}
            mystate={store.getState()}
          />
        )}
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
  (a,b) =>store.dispatch(actions.changeState(a,b)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

