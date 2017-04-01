/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*************************************************************
 *
 * 工具方法模块
 * 
 *************************************************************/



/**
 * 时间格式化 added
 * @param  {String} format  时间格式：年=yyyy，月=MM，日=dd，时=HH，分=mm，秒=ss
 * @param  {number} [timestamp] 时间戳，默认当前时间
 * @return {String} 格式化后的时间字符串
 * @description format可以随意组合，例如：2017-01-01 13:13:13 => yyyy-MM-dd HH:mm:ss
 */
function dateFormat(format, timestamp) {
	if (format && typeof format == 'string') {
		var date = timestamp && typeof timestamp == 'number' ? new Date(timestamp) : new Date(),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds();
		if (format.match(/y{4}/g)) { // 年
			format = format.replace(/y{4}/g, year);
		}
		if (format.match(/M{2}/g)) { // 月
			format = format.replace(/M{2}/g, month < 10 ? '0' + month : month);
		}
		if (format.match(/d{2}/g)) { // 日
			format = format.replace(/d{2}/g, day < 10 ? '0' + day : day);
		}
		if (format.match(/H{2}/g)) { // 时
			format = format.replace(/H{2}/g, hour < 10 ? '0' + hour : hour);
		}
		if (format.match(/m{2}/g)) { // 分
			format = format.replace(/m{2}/g, min < 10 ? '0' + min : min);
		}
		if (format.match(/s{2}/g)) { // 秒
			format = format.replace(/s{2}/g, sec < 10 ? '0' + sec : sec);
		}
	}
	return format;
}

/**
 * 数据校验，验证数据的合法性  added
 * @return {Boolean} 是否合法
 */
var validate = {
	input: function(str) { // 输入框
		return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str); // 只有中文、数字、字母和下划线，且位置不限
	},
	mobile: function(str) { // 手机号
		return /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
	},
	code: function(str, num) { // 数字验证码，默认四位数 
		if (num && typeof num == 'number') {
			return new RegExp('^\\d{' + num + '}$').test(str);
		} else {
			return /^\d{4}$/.test(str);
		}
	},
	email: function(str) { // 邮箱
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
	}
}

module.exports = {
	dateFormat: dateFormat,
	validate: validate
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*************************************************************
 *
 * 数组处理模块
 * 为了考虑调用方便和代码整洁性，会在原生JavaScript上修改原型链
 * 
 *************************************************************/



var string = __webpack_require__(5);

var array = {
    init: function() {
        this.addPrototype();
    },

    /**
     * 向Array原型链中添加新方法
     */
    addPrototype: function() {
        /**
         * 删除并返回数组的指定位置元素
         * 该方法直接改变原数组
         * @param  {Number} ind 数组元素索引
         * @return {any}        被删除的数组元素
         */
        Array.prototype.deleteOf = function(ind) {
            var deleted = this[ind];
            this.splice(ind, 1);
            return deleted;
        };

        /**
         * 删除并返数组的指定值元素
         * 该方法直接改变原数组
         * @param  {any}    val   数组元素的值
         * @param  {Number} [num] 删除的元素个数，默认全部删除
         * @return {any}          被删除的数组元素
         */
        Array.prototype.deleteVal = function(val, num) {
            var count = 0,
                num = num || this.length;
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (count < num) {
                    if (temp == val) {
                        if (i == len - 1) {
                            return this.deleteOf(i);
                        } else {
                            this.deleteOf(i);
                            count++;
                            continue;
                        }
                    }
                }
            }
        };

        /**
         * 向数组中的指定位置插入元素，并返回新的长度
         * 该方法直接改变原数组
         * @param {Number} ind 索引值
         * @param {Number} val 元素值
         * @return {Number} 新数组长度
         */
        Array.prototype.pushOf = function(ind, val) {
            this.splice(ind, 0, val).length;
            return this.length;
        };

        /**
         * 替换数组中指定值的元素，并返回新数组
         * 该方法不会改变原数组
         * @param  {any}    val    本元素值 
         * @param  {any}    newVal 新元素值
         * @param  {Number} [num]  替换的元素个数，默认替换全部
         */
        Array.prototype.replace = function(val, newVal, num) {
            var result = [],
                count = 0,
                num = num || this.length;
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (count < num) {
                    if (temp == val) {
                        result.push(newVal);
                        count++;
                        continue;
                    }
                }
                result.push(temp);
            }
            return result;
        };

        /**
         * 数组去重，并返回新数组
         * 该方法不改变原数组
         * @param  {Number} ind   从第几个重复元素开始删除
         * @param  {Number} [num] 删除的元素数量，默认全部删除
         */
        Array.prototype.removeDuplicate = function(ind, num) {
            var obj = {},
                count = 0,
                indexs = [],
                num = num || this.length;
            for (var i = 0, len = this.length; i < len; i++) {
                var temp = this[i];
                if (!obj[temp]) {
                    obj[temp] = i;
                } else {
                    indexs.push(obj[temp]);
                    indexs.push(i);
                }
            }
            for (var j = 0, len = indexs.length; j < len; j++) {
                if (count < num) {
                    this.deleteOf(indexs[j] - count);
                    count++;
                }
            }
        };

        /**
         * 数组去空串，并返回新数组 
         * 该方法不会改变原数组
         * @param  {Number} [num] 删除的空串数量
         * @return {Array}        新数组
         */
        Array.prototype.trim = function(num) {
            return _trim(num, '', this);
        };

        /**
         * 数组去null值，并返回新数组 
         * 该方法不会改变原数组
         * @param  {Number} [num] 删除的空串数量
         * @return {Array}        新数组
         */
        Array.prototype.removeNull = function(num) {
            return _trim(num, null, this);
        };
    }
}

/**
 * 数组去空串/null值，并返回新数组 
 * 该方法不会改变原数组
 * @param  {Number} [num] 删除的空串数量
 * @return {Array}        新数组
 */
function _trim(num, str, that) {
    var count = 0, // 去除的空串数
        result = [],
        num = num || that.length;
    for (var i = 0, len = that.length; i < len; i++) {
        var temp = that[i],
            val = str == null ? str : string.trim(str);
        console.log(val)
        if (val != str) {
            result.push(temp);
        } else {
            if (count < num) {
                count++;
            } else {
                result.push(temp);
            }
        }
    }
    return result;
}

array.init();

module.exports.array = array;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*************************************************************
 *
 * 浏览器模块
 * 
 *************************************************************/



var bom = {
    /**
     * 判断终端的类型  added
     * @return {boolean} 选定终端类型的布尔值
     * @description 调用方式：browser.versions.webKit
     */
    browser: {
        versions: function() {
            var u = navigator.userAgent;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应用程序，没有头部与底部
                wechat: !!u.match(/MicroMessenger/i), // 是否微信打开
                alipay: !!u.match(/AliApp/i) // 是否支付宝打开
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },

    /**
     * 获取请求url的参数  added
     * @param {String} name URL后缀的参数名
     */
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        // if (r != null) return unescape(r[2]);
        // return null;
        if (r != null) return r[2];
        return null;
    }
}

module.exports = {
    browserVersion: bom.browser.versions,
    getQueryString: bom.getQueryString
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/************************************************************
 *
 * 节点选择器，tool.js的入口方法
 * 该方法关注DOM查询，并将查询到的结果包装成tool对象并返回。
 * 
 ***********************************************************/



var util = __webpack_require__(0);

// 所有html标签    
var htmlTagNames = [
    'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio',
    'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button',
    'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command',
    'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt',
    'em', 'embed',
    'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html',
    'i', 'iframe', 'img', 'input', 'ins',
    'kbd', 'keygen',
    'label', 'legend', 'li', 'link',
    'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter',
    'nav', 'noframes', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'output',
    'p', 'param', 'pre', 'progress',
    'q',
    'rp', 'rt', 'ruby',
    's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup',
    'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt',
    'u', 'ul',
    'var', 'video',
    'wbr'
];

/**
 * 节点查询
 * @param  {String} eleKey 可查询的key包括：id/class/name/tag
 * @return {ToolElement}   包装了属性和方法的tool对象    
 */
function ele(eleKey) {
    /**
     * 遍历查询节点   
     * @param  {String} queryKey  根据哪种方式查询节点：class/name/tag
     * @return {ToolElement}  tool对象    
     * @description 目前查询器的效率低于jQuery3~4倍左右(10w级的节点数查询)，暂时无优化思路。。瓶颈。。   
     */
    function _traverse(queryKey) {
        var allEles = document.getElementsByTagName('*'),
            elesArr = [];
        for (var i = 0, len = allEles.length; i < len; i++) {
            var temp = allEles[i];
            if (queryKey == 'class' || queryKey == 'name') {
                var attrValue = temp.getAttribute(queryKey);
                if (attrValue) {
                    if (String(attrValue).indexOf(eleKeySub) != -1) {
                        elesArr[elesArr.length] = temp;
                    }
                }
            } else if (queryKey == 'tag') {
                if (temp.nodeName == eleKey.toUpperCase()) {
                    elesArr[elesArr.length] = temp;
                }
            }
        }
        return _pack(elesArr);
    }
    if (eleKey && typeof eleKey == 'string') {
        if (util.trim(eleKey)) { // 选择器
            var eleKeySub = eleKey.slice(1),
                sign = eleKey[0];

            if (sign == '#') { // id

                var result = document.getElementById(eleKeySub);
                return result ? _pack([result]) : null;

            } else if (sign == '.') { //class 

                return _traverse('class');

            } else if (sign == '~') { // name

                return _traverse('name');

            } else { // tag 

                return _traverse('tag');

            }
        } else { // 节点
            return null;
        }
    } else if (eleKey && typeof eleKey == 'object') {
        return _pack(eleKey);
    }
}


/*************************************************************
 *
 * dom.js内部公共方法，只在dom.js内使用。
 * 
 *************************************************************/

/**
 * 将原生节点封装成ToolElement
 * @param  {Array} nodes 原生节点集，可以为空数组。
 * @return {ToolElement} tool对象
 */
function _pack(nodes) {
    if (typeof nodes == 'object' && nodes instanceof Array) {
        return new ToolElement(nodes);
    } else {
        console.warn('_pack()方法入参必须为数组');
    }
}

/**
 * 插入节点
 * @param {Element} parent 当前节点的原生父节点
 * @param  {String}  str    新节点名称
 * @param  {Element}  ele    新元素添加在该元素前  
 */
function _insertBefore(parent, str, ele) {
    parent.insertBefore(document.createTextNode(str), ele);
}

/**
 * 追加节点
 * @param  {Element} parent 当前节点的原生父节点
 * @param  {String} str    新节点的名称
 */
function _appendChild(parent, str) {
    parent.appendChild(document.createTextNode(str));
}

/**
 * 获得/设置节点的html/text 
 * @param  {String} type 操作类型：html：操作元素的html，text：操作元素的text
 * @param  {String} str  要设置的内容值
 * @param  {Array} nodes 原生节点集
 * @return {Array/ToolElement}      get操作时返回字符串数组，set时返回tool对象
 */
function _htmlAndText(type, str, nodes) {
    var result = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (!str && str != '') {
            result[result.length] = type == 'html' ? nodes[i].innerHTML : nodes[i].innerText;
        } else {
            type == 'html' ? nodes[i].innerHTML = str : nodes[i].innerText = str;
            result.push(nodes[i]);
        }
    }
    return (typeof result[0] == 'object') ? _pack(result) : result; // 是节点才包装成对象 
}

/**
 * 在当前节点的前/后插入新的内容
 * @param  {String} type 操作类型：before：在之前插入，after：在之后插入
 * @param  {String} str  要插入的内容
 * @param  {Element} node 原生节点
 * @return {ToolElement}      tool对象
 */
function _beforeAndAfter(type, str, node) {
    var parent = node.parentNode,
        charStart = -1,
        charEnd = -1,
        nextNode = _pack([node]).next();
    if (!str && typeof str == 'undefined') {
        return;
    } else {
        if (util.trim(str) == '') {
            return;
        } else {
            if (str.indexOf('<') != -1 && str.indexOf('>') != -1) { // str is a text
                for (var i = 0, len = str.length; i < len; i++) {
                    var tempChar = str[i];
                    if (tempChar == '<') {
                        // create newText    
                        type == 'before' ? _insertBefore(parent, str.slice(0, i), node) : !nextNode ? _appendChild(parent, str.slice(0, i)) : _insertBefore(parent, str.slice(0, i), nextNode.node[0]);
                        charStart = i;
                    } else if (tempChar == '>') {
                        charEnd = i;
                        // create newNode        
                        var tagName = str.slice(charStart + 1, charEnd),
                            tagEnd = str.indexOf('</' + tagName + '>'),
                            newNode = document.createElement(tagName);
                        newNode.innerHTML = str.slice(charEnd + 1, tagEnd);
                        type == 'before' ? parent.insertBefore(newNode, node) : !nextNode ? parent.appendChild(newNode) : parent.insertBefore(newNode, nextNode.node[0]);
                        // reset str
                        str = str.slice(tagEnd + tagName.length + 3, str.length);
                        i = 0;
                        len = str.length;
                        // create last newText    
                        if (str.indexOf('<') == -1) {
                            type == 'before' ? _insertBefore(parent, str, node) : !nextNode ? _appendChild(parent, str) : _insertBefore(parent, str, nextNode.node[0]);
                        }
                    }
                }
            } else { // str has tag
                type == 'before' ? _insertBefore(parent, str, node) : !nextNode ? _appendChild(parent, str) : _insertBefore(parent, str, nextNode.node[0]);
            }
        }
    }
}

function _prevAndNext(type, nodes) {
    var result = [];
    for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i];
        while (node = type == 'prev' ? node.previousSibling : node.nextSibling) {
            if (node.nodeType == 1) {
                result.push(node);
                break;
            }
        }
    }
    return _pack(result);
}

/*************************************************************
 *
 * ToolElement节点对象封装 
 * 
 *************************************************************/

/**
 * ToolElement节点对象封装 
 * @param {Array} nodes 原生节点集，可以为空数组。
 * @description 所有的属性和方法都写在这里面，构造的时候只需传入选择器拿到的原生节点集。
 *              若想获取原生节点集，只需toolElement.node即可。
 *              若想获取某个原生节点，只需toolElement.get(ind)即可。
 * @return {ToolElement} tool对象
 */
function ToolElement(nodes) {
    // 原生节点集，可以为空数组。  added
    this.node = nodes;

    /************************************************************
     * 节点相关操作
     ***********************************************************/

    // 根据索引获取原生节点  added
    this.get = function(ind) {
        return nodes[ind];
    };

    this.each = function(cb) {
        var nodes = this.node;
        for (var i = 0, len = nodes.length; i < len; i++) {
            cb.call(nodes[i], i, nodes[i]);
        }
    };

    // 获取上一个节点  added
    this.prev = function() {
        return _prevAndNext('prev', nodes);
    };

    // 获取下一个节点  added
    this.next = function() {
        return _prevAndNext('next', nodes);
    };

    // 获取指定节点  added
    this.eq = function(ind) {
        return _pack([nodes[ind]]);
    };

    // 删除当前节点  added
    this.remove = function() {
        for (var i = 0, len = nodes.length; i < len; i++) {
            var node = nodes[i];
            node.parentNode.removeChild(node);
        }
    };

    // 清空当前节点  added
    this.empty = function() {
        return this.html('');
    };

    /**
     * 在当前节点之前插入内容，支持生成自定义标签  added
     * @param {String} 插入的内容
     * @return {ToolElement} ToolElement对象
     */
    this.before = function(str) {
        this.each(function(ind, node) {
            _beforeAndAfter('before', str, node);
        });
        return _pack(nodes);
    };

    /**
     * 在当前节点之后插入内容，支持生成自定义标签  added
     * @param  {String} str 插入的内容   
     * @return {ToolElement}     ToolElement对象 
     */
    this.after = function(str) {
        this.each(function(ind, node) {
            _beforeAndAfter('after', str, node);
        });
        return _pack(nodes);
    };

    /**
     * 获取/修改当前节点的html
     * @param  {String} [str] 要修改成的html
     */
    this.html = function(str) {
        return _htmlAndText('html', str, nodes);
    };

    /**
     * 获取/修改当前节点text
     * @param  {String} [str] 要修改成的text
     */
    this.text = function(str) {
        return _htmlAndText('text', str, nodes);
    };

    /************************************************************
     * 属性相关操作
     ***********************************************************/

    this.attr = function() {

    };
}

module.exports = {
    ele: ele,
    ToolElement: ToolElement
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*************************************************************
 *
 * 本地存储模块
 * 
 *************************************************************/



var ls = window.localStorage;

var storage = {
    /**
     * 读取Cookie
     * @param  {String} cname Cookie的key
     * @return {String} Cookie的value
     */
    getCookie: function(cname) {
        var cvalue = "",
            cookies = document.cookie;
        if (cookies.length > 0) {
            var search = cname + "=",
                start = cookies.indexOf(search);
            if (start != -1) {
                start += search.length;
                var end = cookies.indexOf(";", start);
                if (end == -1) {
                    end = cookies.length;
                }
                cvalue = unescape(cookies.substring(start, end));
            }
        }
        return cvalue;
    },

    /**
     * 写入Cookie   
     * @param {String} cname  Cookie的key
     * @param {String} cvalue Cookie的value
     * @param {String} days   Cookie的存活天数
     */
    setCookie: function(cname, cvalue, days) {
        var date = new Date();
        date.setDate(date.getDate() + days);
        var exdate = "; expires=" + date.toGMTString();
        document.cookie = cname + "=" + escape(cvalue) + exdate;
    },

    /**
     * 获取本地存储中对应的值
     * @param  {String} key 本地数据的key
     * @return {String}     本地数据的value
     */
    getStorage: function(key) {
        var val = '';
        _checkStorageSupport(function() {
            val = ls.getItem(key);
        });
        return val;
    },

    /**
     * 设置本地存储数据
     * @param {String} key 本地数据的key
     * @param {String} val 本地数据的value   
     */
    setStorage: function(key, val) {
        _checkStorageSupport(function() {
            ls.setItem(key, val);
        });
    },

    /**
     * 移除指定的本地数据
     * @param  {String} key 本地数据的key
     */
    removeStorage: function(key) {
        _checkStorageSupport(function() {
            ls.removeItem(key);
        });
    },

    /**
     * 清除本地存储的所有数据      
     */
    clearStorage: function() {
        _checkStorageSupport(function() {
            ls.clear();
        });
    }
}

/**
 * 监测浏览器是否支持localStorage
 * @param  {Function} func 普通方法
 */
function _checkStorageSupport(func) {
    if (!ls) {
        alert('浏览器不支持localStorage！或者开启了隐私模式！');
    } else {
        func();
    }
}

module.exports = {
    getCookie: storage.getCookie,
    setCookie: storage.setCookie,
    getStorage: storage.getStorage,
    setStorage: storage.setStorage,
    removeStorage: storage.removeStorage,
    clearStorage: storage.clearStorage
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*************************************************************
 *
 * 字符串处理模块
 * 
 *************************************************************/



var string = {
	/**
	 * 过滤空格 added
	 * @param  {String} str 要过滤的字符串
	 * @return {String}     过滤后的字符串
	 */
	trim: function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
}

module.exports = {
	trim: string.trim
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// tool.js是个关注DOM的框架，不过度封装，旨在提高性能效率
// 模块间可以相互调用，以提高效率，但这样的话就要保证每个模块的正确性。
// DOM modules：DOM、CSS、AJAX、Attribute、Event 
// 目标：tool.js可以定位成原生JavaScript的加强形式，可以针对原生对象或方法进行拓展。

/*************************************************************
 *
 * 打包入口文件，负责各个模块间的整合。
 * 
 *************************************************************/



(function(w) {
	var dom = __webpack_require__(3);
	var util = __webpack_require__(0);
	var storage = __webpack_require__(4);
	var string = __webpack_require__(5);
	var bom = __webpack_require__(2);
	var array = __webpack_require__(1);

	var spaceName = typeof w.$ == 'undefined' ? '$' : 'tool';

	spaceName == 'tool' && console.warn('window.$命名空间已被使用，请用tool代替...');

	// 选择器 
	w[spaceName] = dom.ele;

	// 工具方法
	w[spaceName].dateFormat = util.dateFormat;
	w[spaceName].validate = util.validate;

	// 本地存储
	w[spaceName].getCookie = storage.getCookie;
	w[spaceName].setCookie = storage.setCookie;
	w[spaceName].getStorage = storage.getStorage;
	w[spaceName].setStorage = storage.setStorage;
	w[spaceName].removeStorage = storage.removeStorage;
	w[spaceName].clearStorage = storage.clearStorage;

	// 字符串处理
	w[spaceName].trim = string.trim;

	// 浏览器处理
	w[spaceName].browserVersion = bom.browserVersion;
	w[spaceName].getQueryString = bom.getQueryString;
})(window);

/***/ })
/******/ ]);