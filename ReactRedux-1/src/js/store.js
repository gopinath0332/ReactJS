import {
    applyMiddleware,
    createStore
} from "redux";

// import {logger} from "redux-logger";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";

import reducer from "./reducers/reducer";


const middleWare = applyMiddleware(createLogger());
export default createStore(reducer,middleWare);