import React from "react";

import { Provider } from "react-redux";

const Root = ({ store, children }) => (
    <Provider store={store}>{children}</Provider>
);

export default Root;
