'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactAutoBind = reactAutoBind;
function autoBind(obj, filter) {
  filter = filter || function () {
    return true;
  };

  Object.getOwnPropertyNames(obj.constructor.prototype).forEach(function (name) {
    var val = obj[name];

    if (name !== 'constructor' && typeof val === 'function' && filter(name)) {
      obj[name] = val.bind(obj);
    }
  });

  return obj;
}

exports.autoBind = autoBind;
exports.default = autoBind;
var isReactMethod = exports.isReactMethod = function isReactMethod(name) {
  return ['render', 'componentWillReceiveProps', 'componentDidMount', 'componentDidUpdate', 'shouldComponentUpdate', 'componentWillUnmount', 'componentWillUpdate', 'forceUpdate', 'componentWillMount'].includes(name);
};

function reactAutoBind(obj, filter) {
  filter = filter || function () {
    return true;
  };
  return autoBind(obj, function (name) {
    return !isReactMethod(name) && filter(name);
  });
}
//# sourceMappingURL=index.js.map