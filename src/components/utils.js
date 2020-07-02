

import store from '../store';
import { actions } from "../redux/reducer";
import { play_sound } from "./sounds/sounds";
const changeState = (a, b) => {
  store.dispatch(actions.changeState(a, b))
};

export { changeState };

const setState = (a, b) => {
  store.dispatch(actions.setState(a, b))
};

export { setState };

const changeStateLimit = (state, value, limit) => {
  (value + store.getState().actual_session[state]) > limit - 1 ?
    setState("actual_session", { ...store.getState().actual_session, [state]: 0 }) :
    (value + store.getState().actual_session[state]) < 0 ?
      setState("actual_session", { ...store.getState().actual_session, [state]: limit - 1 }) :
      changeState(state, value);
  if (state.indexOf("sounds") != -1) {
    play_sound(store.getState().actual_session[state])
  }

}

export { changeStateLimit }



