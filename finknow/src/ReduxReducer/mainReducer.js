import {isValid,Username} from "./chnageAuth";
import {combineReducers} from "redux";

const rootReducer=combineReducers({
    isvalid:isValid,
    username:Username
});
export default rootReducer;