# Redux Simple Container = HOC for react

[![npm version](https://badge.fury.io/js/redux-simple-container.svg)](http://badge.fury.io/js/redux-simple-container)

[![NPM](https://nodei.co/npm/redux-simple-container.png)](https://nodei.co/npm/redux-simple-container/)

It has happened to me very often to realize only at the end of the creation of a component of needing to connect it with redux. This HOC speed up the container creation.

# Usage

1. Install the npm package:

```bash
    npm install --save redux-simple-container
    or
    yarn add redux-simple-container
```

2. Import it:

```javascript
import reduxSimpleContainer from "redux-simple-container";
```

3. Create a simple component with a title and two action for change the title and wrap it up reduxSimpleContainer HOC:

```javascript
const TitleComponent = ({ title, changeTitle, changeTitleSecondButton }) => (
    <div>
        <h1>{title}</h1>
        <button onClick={() => changeTitle("NEW TITLE")}>Change Title</button>
        <button onClick={() => changeTitleSecondButton()}>Change Title</button>
    </div>
);

const changeTitleSecondButton = () => dispatch =>
        dispatch({ type: "CHANGE_TITLE", title: "SECOND TITLE" })
};

export default reduxSimpleContainer(
    [{ type: "CHANGE_TITLE", params: ["title"] }, "dispatch",
    changeTitleSecondButton],
    ["titleState.title"],
    TitleComponent
);
```

4. the exported component will be equal at this:

```javascript
import { connect } from "react-redux";
import TitleComponent from "../components/TitleComponent";
import { bindActionCreators } from "redux";

const mapStateToProps = (state, ownProps) => ({
    title: state.titleState.title
});

const mapDispatchToProps = dispatch => ({
    changeTitle: title => dispatch({ type: "CHANGE_TITLE", title }),
    dispatch,
    ...bindActionCreators({ changeTitleSecondButton }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TitleComponent);
```

to summarize is a function that takes these 3 parameters.

# Parameters

**actions**: First parameter. An array of actions that will create the mapDispatchToProps object. they can be of three type:

string: the prop name is the camelCase value of the string and it is a function that dispatch an action with the string passed as a type. you can pass "dispatch" and you will get the dispatch function as a prop. example of passing "CHANGE_TITLE"

```
{
  ...
  changeTitle: () => dispatch({ type: "CHANGE_TITLE" }),
  ...
}
```

object: action can be an object with the type of the action to dispatch and an array of params that you want to attach to the function. example an action like

```
{
  type: "CHANGE_TITLE",
  params: ["title"],
}
```

creates a key in the mapDispatchToProps like this

```
{
  ...
  changeTitle: (title) => dispatch({ type: "CHANGE_TITLE", title }),
  ...
}

```

otherwise you can simply pass function that will be bind as a props with redux bindActionCreators

**stateRequested**: Second parameter. Is an array of string. you have to pass a list of state key to map as a props. you can request nested state key split keys with a point. example if you pass an array like this

```
["book", "book.title", "book.author"]
```

it will create a mapStateToProps object like this

```
{
  book: state.book,
  title: state.book.title,
  author: state.book.author
}
```

**Component**: Third parameter. the component to connect.

# Contributig

if you want to contribute to the development of the package feel free to do it.

```bash
    npm install
    // to build the demo folder
    npm run dev
    // to build the source
    npm run build
```
