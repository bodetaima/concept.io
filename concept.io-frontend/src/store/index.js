import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducers, appReducers } from "./reducers";

const logger = createLogger({});

export default function configureStore() {
    const store = createStore(
        combineReducers({ auth: authReducers, app: appReducers }),
        undefined,
        compose(applyMiddleware(thunk, logger), composeWithDevTools())
    );
    return store;
}
