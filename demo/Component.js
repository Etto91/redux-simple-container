import React from "react";
import reduxSimpleContainer from "../src/reduxSimpleContainer";
import { setTimeout } from "timers";

const TitleComponent = ({
    title,
    changeTitle,
    changeTitleSecondButton,
    fakeApi
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => changeTitle("NEW TITLE")}>
                Change Title
            </button>
            <button onClick={() => changeTitleSecondButton()}>
                Change Title
            </button>
            <button
                onClick={async () => {
                    await fakeApi();
                }}
            >
                Async
            </button>
        </div>
    );
};

const changeTitleSecondButton = () => dispatch =>
    dispatch({ type: "CHANGE_TITLE", title: "SECOND TITLE" });

const fakeApi = () => dispatch =>
    new Promise(resolve => {
        setTimeout(() => {
            dispatch({ type: "CHANGE_TITLE", title: "SECOND TITLE" });
            resolve(true);
        }, 1000);
    });

export default reduxSimpleContainer(
    [
        { type: "CHANGE_TITLE", params: ["title"] },
        "dispatch",
        changeTitleSecondButton,
        fakeApi
    ],
    ["titleState.title"],
    TitleComponent
);
