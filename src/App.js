import React from "react";
import {connect}from 'react-redux';
import { PanelConfig } from "./components/panel_config";
import { Modal } from "./components/components";
import { PanelPlayer } from "./components/panel_player";
import { PanelSessions } from "./components/panel_sessions";
import { Navigator } from "./components/navigator";
import store from './store';
import {actions} from "./redux/reducer";

import "./App.css";
const myRef = React.createRef();
class App extends React.Component {
  changeState = (a, b) => {
    store.dispatch(actions.changeState(a,b))
  };
  setState = (a, b) => {
    store.dispatch(actions.setState(a,b))
  };
  navigateTo = (a, b) => {
    store.dispatch(actions.navigateTo(a))
  };

  setSession = a => {

    store.dispatch(actions.setSession(a));
    store.dispatch(actions.navigateTo("config"))
  };

  asyncCall = async function () {
    const modal = myRef.current;
    //modal.showme=true;
    console.log('calling');
    store.dispatch(actions.setState("modal",true))
    const result = await modal.resolveAfter2Seconds();
    store.dispatch(actions.setState("modal",false))
    console.log("resultado" ,result);
    return result
    // expected output: 'resolved'
  }


  addSession = async a => {
   // const myname="yu"+Math.random();
   console.log("patata")
    const myname = await this.asyncCall();

    console.log("myname",a);
   // const myname = window.prompt(`Enter number of scoops to restock `);
     //store.getState().domadd=myname;
     store.dispatch(actions.setState("domadd",myname))
    setTimeout(()=>{ 
      store.dispatch(actions.setState("domadd",""))
      //store.getState().domadd="";
     }, 500)
    store.dispatch(actions.addSession(myname));
    store.dispatch(actions.navigateTo("sessions"))
  
  };

  removeSession = a => {
   store.getState().domremove=a;
   this.forceUpdate();
   setTimeout(()=>{ 
   store.dispatch(actions.removeSession(a))
  }, 500)
 };

  render() {
    return (
      <section>
        <Navigator
          navigateTo={a => {
            this.navigateTo(a);
          }}
          mystate={store.getState()}
        />

      { <Modal 
        accept={(e)=>{this.setState("modal",e)/* store.dispatch(actions.setstate("modal",e))*/}}
        ref={myRef}
        showme={store.getState().modal}
        > "Aqui va la modal" </Modal>}

        <h1 className=" interfaz">{store.getState().location}  </h1>
        {store.getState().location == "config" && (
          <PanelConfig
            changeState={(a, b) => {
              this.changeState(a, b);
            }}
            addSession={a => {
              this.addSession(a);
            }}
            mystate={store.getState()}
        //    actual_config={store.getState().actual_session_name}
          />
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

