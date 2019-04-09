import React from "react";
import reduxSimpleContainer from "../src/reduxSimpleContainer";

const TitleComponent = ({ title, changeTitle, changeTitleSecondButton }) => {
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => changeTitle("NEW TITLE")}>
                Change Title
            </button>
            <button onClick={() => changeTitleSecondButton()}>
                Change Title
            </button>
        </div>
    );
};

const changeTitleSecondButton = () => dispatch =>
    dispatch({ type: "CHANGE_TITLE", title: "SECOND TITLE" });

export default reduxSimpleContainer(
    [
        { type: "CHANGE_TITLE", params: ["title"] },
        "dispatch",
        changeTitleSecondButton
    ],
    ["titleState.title"],
    TitleComponent
);
