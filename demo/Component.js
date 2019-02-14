import React from "react";
import ReduxSimpleContainer from "../src/ReduxSimpleContainer";

const NameComponentPres = ({ title, changeTitle, secondButton }) => (
    <div>
        <h1>{title}</h1>
        <button onClick={() => changeTitle("NEW TITLE")}>Change Title</button>
        <button onClick={() => secondButton()}>Change Second Title</button>
    </div>
);

const actionCustom = {
    name: "secondButton",
    trigger: () => dispatch =>
        dispatch({ type: "CHANGE_TITLE", title: "SECOND TITLE" })
};

export default ReduxSimpleContainer(
    [{ type: "CHANGE_TITLE", params: ["title"] }, "dispatch", actionCustom],
    ["title.title"],
    NameComponentPres
);
