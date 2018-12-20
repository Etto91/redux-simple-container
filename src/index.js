import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import ReduxSimpleContainer from "./ReduxSimpleContainer";
export const title = (state = { title: "ReduxSimpleContainer" }, action) => {
    switch (action.type) {
        case "CHANGE_TITLE":
            return { ...state, title: action.title };
        default:
            return state;
    }
};

const todoApp = combineReducers({ title });

let middleware = [ReduxThunk];
let enhancer = applyMiddleware(...middleware);
if (process.env.NODE_ENV !== "production") {
    middleware = [...middleware, logger];
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(...middleware));
}
const store = createStore(todoApp, enhancer);

class App extends React.Component {
    render() {
        return <NameComponent />;
    }
}

const NameComponentPres = ({ title, changeTitle }) => (
    <div>
        <h1>{title}</h1>
        <button onClick={() => changeTitle("NEW TITLE")}>Change Title</button>
    </div>
);

const NameComponent = ReduxSimpleContainer(
    [{ type: "CHANGE_TITLE", params: ["title"] }, "dispatch"],
    ["title"],
    NameComponentPres
);

console.log(NameComponent);

ReactDOM.render(
    <Provider store={store}>
        <NameComponent />
    </Provider>,
    document.getElementById("app")
);
