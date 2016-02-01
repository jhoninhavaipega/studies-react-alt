webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(162);

	var _app = __webpack_require__(163);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _reactDom.render)(_react2.default.createElement(_app.ListNotifications, null), document.getElementById('app'));

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  color: red; }\n", ""]);

	// exports


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ListNotifications = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _app = __webpack_require__(164);

	var _app2 = __webpack_require__(168);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListNotifications = exports.ListNotifications = function (_Component) {
	  _inherits(ListNotifications, _Component);

	  function ListNotifications() {
	    _classCallCheck(this, ListNotifications);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListNotifications).apply(this, arguments));
	  }

	  _createClass(ListNotifications, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_app.Dropdown, { content: _react2.default.createElement(_app2.Notifications, null) });
	    }
	  }]);

	  return ListNotifications;
	}(_react.Component);

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Dropdown = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _header = __webpack_require__(165);

	var _content = __webpack_require__(166);

	var _footer = __webpack_require__(167);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropdown = exports.Dropdown = function (_Component) {
	  _inherits(Dropdown, _Component);

	  function Dropdown() {
	    _classCallCheck(this, Dropdown);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).apply(this, arguments));
	  }

	  _createClass(Dropdown, [{
	    key: 'renderHeader',
	    value: function renderHeader() {
	      return _react2.default.createElement(_header.Header, null);
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      return _react2.default.createElement(_content.Content, { content: this.props.content });
	    }
	  }, {
	    key: 'renderFooter',
	    value: function renderFooter() {
	      return _react2.default.createElement(_footer.Footer, null);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'dropdown' },
	        this.renderHeader(),
	        this.renderContent(),
	        this.renderFooter()
	      );
	    }
	  }]);

	  return Dropdown;
	}(_react.Component);

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Header = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = exports.Header = function (_Component) {
	  _inherits(Header, _Component);

	  function Header() {
	    _classCallCheck(this, Header);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	  }

	  _createClass(Header, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "header",
	        { className: "dropdown-header" },
	        _react2.default.createElement(
	          "h2",
	          null,
	          "Lista de desejos ",
	          _react2.default.createElement(
	            "span",
	            null,
	            "(27)"
	          )
	        )
	      );
	    }
	  }]);

	  return Header;
	}(_react.Component);

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Content = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Content = exports.Content = function (_Component) {
	  _inherits(Content, _Component);

	  function Content() {
	    _classCallCheck(this, Content);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Content).apply(this, arguments));
	  }

	  _createClass(Content, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "section",
	        { className: "dropdown-content" },
	        this.props.content
	      );
	    }
	  }]);

	  return Content;
	}(_react.Component);

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Footer = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Footer = exports.Footer = function (_Component) {
	  _inherits(Footer, _Component);

	  function Footer() {
	    _classCallCheck(this, Footer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).apply(this, arguments));
	  }

	  _createClass(Footer, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "footer",
	        { className: "dropdown-footer" },
	        _react2.default.createElement(
	          "p",
	          null,
	          _react2.default.createElement(
	            "a",
	            { href: "" },
	            "Ver sua lista de desejos"
	          )
	        )
	      );
	    }
	  }]);

	  return Footer;
	}(_react.Component);

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Notifications = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _notification = __webpack_require__(169);

	var _NotificationStore = __webpack_require__(170);

	var _NotificationStore2 = _interopRequireDefault(_NotificationStore);

	var _NotificationActions = __webpack_require__(185);

	var _NotificationActions2 = _interopRequireDefault(_NotificationActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Notifications = exports.Notifications = function (_Component) {
	  _inherits(Notifications, _Component);

	  function Notifications(props) {
	    _classCallCheck(this, Notifications);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Notifications).call(this, props));

	    _this.state = {
	      notifications: [],
	      errorMessage: null
	    };

	    _this.onChange = _this.onChange.bind(_this);
	    return _this;
	  }

	  _createClass(Notifications, [{
	    key: 'getInitialState',
	    value: function getInitialState() {
	      return _NotificationStore2.default.getState();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _NotificationStore2.default.listen(this.onChange);
	      _NotificationActions2.default.fetchNotifications();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _NotificationStore2.default.unlisten(this.onChange);
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(state) {
	      this.setState(state);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.errorMessage) {
	        return _react2.default.createElement(
	          'div',
	          null,
	          'Something is wrong'
	        );
	      }

	      if (!this.state.notifications.length) {
	        return _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement('img', { src: '/my-cool-spinner.gif' })
	        );
	      }

	      return _react2.default.createElement(
	        'ul',
	        { className: 'notifications' },
	        this.state.notifications.map(function (notification) {
	          return _react2.default.createElement(_notification.Notification, { data: notification });
	        })
	      );
	    }
	  }]);

	  return Notifications;
	}(_react.Component);

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Notification = undefined;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Notification = exports.Notification = function (_Component) {
	  _inherits(Notification, _Component);

	  function Notification() {
	    _classCallCheck(this, Notification);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Notification).apply(this, arguments));
	  }

	  _createClass(Notification, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "li",
	        { className: "notification notification--unread" },
	        _react2.default.createElement(
	          "figure",
	          { className: "notification-figure" },
	          _react2.default.createElement(
	            "a",
	            { href: this.props.data.path_product, title: this.props.data.title },
	            _react2.default.createElement("img", { src: this.props.data.path_image, alt: this.props.data.title })
	          )
	        ),
	        _react2.default.createElement(
	          "div",
	          { className: "notification-text" },
	          _react2.default.createElement(
	            "h3",
	            { className: "notification-title" },
	            _react2.default.createElement(
	              "a",
	              { href: this.props.data.path_product, title: this.props.data.title },
	              this.props.data.title
	            )
	          ),
	          _react2.default.createElement(
	            "p",
	            { className: "notification-type" },
	            _react2.default.createElement(
	              "a",
	              { href: this.props.data.path_product, title: this.props.data.title },
	              _react2.default.createElement("i", { className: this.props.data.type }),
	              this.props.data.type,
	              _react2.default.createElement(
	                "time",
	                null,
	                this.props.data.created_at
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Notification;
	}(_react.Component);

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(171);

	var _alt2 = _interopRequireDefault(_alt);

	var _NotificationActions = __webpack_require__(185);

	var _NotificationActions2 = _interopRequireDefault(_NotificationActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationStore = function () {
	  function NotificationStore() {
	    _classCallCheck(this, NotificationStore);

	    this.bindListeners({
	      handleUpdateNotifications: _NotificationActions2.default.UPDATE_NOTIFICATIONS,
	      handleFailedNotifications: _NotificationActions2.default.FAILED_NOTIFICATIONS,
	      handleFetchNotifications: _NotificationActions2.default.UPDATE_NOTIFICATIONS
	    });

	    this.notifications = [];
	    this.errorMessage = null;
	  }

	  _createClass(NotificationStore, [{
	    key: 'handleUpdateNotifications',
	    value: function handleUpdateNotifications(notifications) {
	      this.notifications = notifications;
	      this.errorMessage = null;
	    }
	  }, {
	    key: 'handleFailedNotifications',
	    value: function handleFailedNotifications(errorMessage) {
	      this.errorMessage = errorMessage;
	    }
	  }, {
	    key: 'handleFetchNotifications',
	    value: function handleFetchNotifications() {
	      // this.notifications = [];
	    }
	  }]);

	  return NotificationStore;
	}();

	exports.default = _alt2.default.createStore(NotificationStore, 'NotificationStore');

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(172);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _alt2.default();

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(171);

	var _alt2 = _interopRequireDefault(_alt);

	var _NotificationSource = __webpack_require__(186);

	var _NotificationSource2 = _interopRequireDefault(_NotificationSource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NotificationActions = function () {
	  function NotificationActions() {
	    _classCallCheck(this, NotificationActions);
	  }

	  _createClass(NotificationActions, [{
	    key: 'updateNotifications',
	    value: function updateNotifications(notifications) {
	      return notifications;
	    }
	  }, {
	    key: 'failedNotifications',
	    value: function failedNotifications(errorMessage) {
	      return errorMessage;
	    }
	  }, {
	    key: 'fetchNotifications',
	    value: function fetchNotifications() {
	      var _this = this;

	      return function (dispatch) {
	        dispatch();

	        _NotificationSource2.default.fetch().then(function (notifications) {
	          _this.updateNotifications(notifications);
	        }).catch(function (errorMessage) {
	          _this.failedNotifications(errorMessage);
	        });
	      };
	    }
	  }]);

	  return NotificationActions;
	}();

	exports.default = _alt2.default.createActions(NotificationActions);

/***/ },

/***/ 186:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mockData = [{
	  id: 1,
	  path_product: 'https://www.walmart.com.br/smart-tv-led-slim-full-hd-40-samsung-un40j5300-connectshare-movie-funcao-futebol-clear-motion-rate-100hz/3076114/pr',
	  title: 'Smart TV LED Slim Full HD 40" Samsung UN40J5300 ConnectShare Movie Função Futebol Clear Motion Rate 100hz',
	  path_image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/4657865-130-130/smart-tv-led-slim-full-hd-40--samsung-un40j5300-connectshare-movie-funcao-futebol-clear-motion-rate-100hz.jpg',
	  type: 'baixou',
	  created_at: '2016-12-12'
	}, {
	  id: 2,
	  path_product: 'https://www.walmart.com.br/smartphone-samsung-galaxy-j5-sm-j500m-ds-dourado-dual-chip-android-5-1-lollipop-4g-wi-fi-16gb/3216998/pr',
	  title: 'Smartphone Samsung Galaxy J5 SM-J500M/DS Dourado Dual Chip Android 5.1 Lollipop 4G Wi-Fi 16GB',
	  path_image: 'https://static.wmobjects.com.br/imgres/arquivos/ids/4708602-130-130/smartphone-samsung-galaxy-j5-sm-j500m/ds-dourado-dual-chip-android-5-1-lollipop-4g-wi-fi-16gb.jpg',
	  type: 'baixou',
	  created_at: '2016-12-12'
	}];

	var NotificationSource = {
	  fetch: function fetch() {
	    return new Promise(function (resolve, reject) {
	      setTimeout(function () {
	        resolve(mockData);
	      }, 250);
	    });
	  }
	};

	exports.default = NotificationSource;

/***/ }

});