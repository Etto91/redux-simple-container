"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toCamelCase = function toCamelCase(string) {
  return string.replace(/\s(.)/g, function ($1) {
    return $1.toUpperCase();
  }).replace(/\s/g, "").replace(/^(.)/, function ($1) {
    return $1.toLowerCase();
  });
};

var removeUnderScoreLowerCase = function removeUnderScoreLowerCase(string) {
  return string.split("_").join(" ").toLowerCase();
};

var ReduxSimpleContainer = function ReduxSimpleContainer(actions, stateRequested, Component) {
  var mapStateToProps = function mapStateToProps(state, ownProps) {
    if (!stateRequested || !stateRequested.length) {
      return _objectSpread({}, ownProps);
    }

    var stateFormatted = stateRequested.reduce(function (acc, key) {
      var arrayKeys = key.split(".");
      var lastKey = arrayKeys[arrayKeys.length - 1];
      var value = arrayKeys.reduce(function (acc, key) {
        return acc[key];
      }, state);
      return _objectSpread({}, acc, _defineProperty({}, lastKey, value));
    }, _objectSpread({}, ownProps));
    return stateFormatted;
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    if (!actions || !actions.length) {
      return {};
    }

    var dispatcActions = actions.reduce(function (acc, action) {
      if (typeof action === "string") {
        if (action === "dispatch") {
          return _objectSpread({}, acc, {
            dispatch: dispatch
          });
        }

        return _objectSpread({}, acc, _defineProperty({}, toCamelCase(removeUnderScoreLowerCase(action)), function () {
          return dispatch({
            type: action
          });
        }));
      }

      var params = action.params,
          type = action.type,
          name = action.name,
          trigger = action.trigger;

      if (params && type) {
        return _objectSpread({}, acc, _defineProperty({}, toCamelCase(removeUnderScoreLowerCase(type)), function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return dispatch(_objectSpread({
            type: type
          }, params.reduce(function (accu, param, index) {
            return _objectSpread({}, accu, _defineProperty({}, param, args[index]));
          }, {})));
        }));
      }

      if (name && trigger) {
        return _objectSpread({}, acc, _defineProperty({}, name, function () {
          dispatch(trigger.apply(void 0, arguments));
        }));
      }

      return acc;
    }, {});
    return dispatcActions;
  };

  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Component);
};

var _default = ReduxSimpleContainer;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=ReduxSimpleContainer.js.map