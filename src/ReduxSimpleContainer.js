import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const toCamelCase = string =>
    string
        .replace(/\s(.)/g, $1 => $1.toUpperCase())
        .replace(/\s/g, "")
        .replace(/^(.)/, $1 => $1.toLowerCase());

const removeUnderScoreLowerCase = string =>
    string
        .split("_")
        .join(" ")
        .toLowerCase();

const ReduxSimpleContainer = (actions, stateRequested, Component) => {
    const mapStateToProps = (state, ownProps) => {
        if (!stateRequested || !stateRequested.length) {
            return { ...ownProps };
        }
        const stateFormatted = stateRequested.reduce(
            (acc, key) => {
                const arrayKeys = key.split(".");
                const lastKey = arrayKeys[arrayKeys.length - 1];
                const value = arrayKeys.reduce((acc, key) => acc[key], state);
                return { ...acc, [lastKey]: value };
            },
            { ...ownProps }
        );
        return stateFormatted;
    };

    const mapDispatchToProps = dispatch => {
        if (!actions || !actions.length) {
            return {};
        }
        const dispatchActions = actions.reduce((acc, action, index) => {
            if (typeof action === "string") {
                if (action === "dispatch") {
                    return {
                        ...acc,
                        dispatch
                    };
                }
                return {
                    ...acc,
                    [toCamelCase(removeUnderScoreLowerCase(action))]: () =>
                        dispatch({ type: action })
                };
            }

            if (typeof action === "function") {
                if (action.name) {
                    return {
                        ...acc,
                        ...bindActionCreators(
                            { [action.name]: action },
                            dispatch
                        )
                    };
                }

                return {
                    ...acc,
                    ...bindActionCreators(
                        { ["action" + index]: action },
                        dispatch
                    )
                };
            }

            const { params, type, name, trigger } = action;

            if (params && params.length && type) {
                if (typeof type !== "string") {
                    throw new Error("Need type parameter as a string");
                }
                return {
                    ...acc,
                    [toCamelCase(removeUnderScoreLowerCase(type))]: (...args) =>
                        dispatch({
                            type,
                            ...params.reduce(
                                (accu, param, index) => ({
                                    ...accu,
                                    [param]: args[index]
                                }),
                                {}
                            )
                        })
                };
            }

            if (name && trigger) {
                if (typeof name !== "string") {
                    throw new Error("Need type parameter as a string");
                }
                if (typeof trigger !== "function") {
                    throw new Error("Need type parameter as a string");
                }
                return {
                    ...acc,
                    [name]: (...args) => {
                        dispatch(trigger(...args));
                    }
                };
            }

            return acc;
        }, {});

        return dispatchActions;
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);
};

export default ReduxSimpleContainer;
