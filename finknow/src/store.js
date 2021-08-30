import {createStore} from "redux";
import rootReducer from "./ReduxReducer/mainReducer";

const store=createStore(rootReducer);

export default store;