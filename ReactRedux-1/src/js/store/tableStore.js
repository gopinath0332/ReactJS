import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

import reducer from "../reducers/tableReducer";

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const middleware = applyMiddleware(promiseMiddleware(), createLogger());

const finalStore = compose(middleware,enhancers)(createStore);
// export default createStore(reducer, middleware);
export default finalStore(reducer);
