import React from "react";
import ReduxSimpleContainer from "./ReduxSimpleContainer";

const NameComponentPres = ({ title, changeTitle }) => (
    <div>
        <h1>{title}</h1>
        <button onClick={() => changeTitle("NEW TITLE")}>Change Title</button>
    </div>
);

export default ReduxSimpleContainer(
    [{ type: "CHANGE_TITLE", params: ["title"] }, "dispatch"],
    ["title.title"],
    NameComponentPres
);
