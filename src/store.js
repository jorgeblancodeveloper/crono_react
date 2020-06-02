import { createStore} from "redux";
import Reducer from "./redux/reducer";
import {devToolsEnhancer} from "redux-devtools-extension";

export default createStore(Reducer,devToolsEnhancer());