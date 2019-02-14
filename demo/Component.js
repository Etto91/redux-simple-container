import React from "react";
import ReduxSimpleContainer from "../src/ReduxSimpleContainer";

const TitleComponent = ({ title, changeTitle, changeTitleSecondButton }) => (
    <div>
        <h1>{title}</h1>
        <button onClick={() => changeTitle("NEW TITLE")}>Change Title</button>
        <button onClick={() => changeTitleSecondButton()}>Change Title</button>
    </div>
);

const actionCustom = {
    name: "changeTitleSecondButton",
    trigger: () => dispatch =>
        dispatch({ type: "CHANGE_TITLE", title: "SECOND TITLE" })
};

export default ReduxSimpleContainer(
    [{ type: "CHANGE_TITLE", params: ["title"] }, "dispatch", actionCustom],
    ["titleState.title"],
    TitleComponent
);
