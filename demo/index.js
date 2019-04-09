import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import App from "./App";
import Root from "./Root";

export const titleState = (
    state = { title: "reduxSimpleContainer" },
    action
) => {
    switch (action.type) {
        case "CHANGE_TITLE":
            return { ...state, title: action.title };
        default:
            return state;
    }
};

const todoApp = combineReducers({ titleState });

let middleware = [ReduxThunk];
let enhancer = applyMiddleware(...middleware);
if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, logger];
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(...middleware));
}
const store = createStore(todoApp, enhancer);

ReactDOM.render(
    <Root store={store}>
        <App />
    </Root>,
    document.getElementById("app")
);
