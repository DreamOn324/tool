// tool.js是个关注DOM的框架，不过度封装，旨在提高性能效率
// 模块间可以相互调用，以提高效率，但这样的话就要保证每个模块的正确性。
// DOM modules：DOM、CSS、AJAX、Attribute、Event 
// 目标：tool.js可以定位成原生JavaScript的加强形式，可以针对原生对象或方法进行拓展。

/*************************************************************
 *
 * 打包入口文件，负责各个模块间的整合。
 * 
 *************************************************************/

'use strict';

(function(w) {
	var dom = require('./dom');
	var util = require('./util');
	var storage = require('./storage');

	var spaceName = typeof w.$ == 'undefined' ? '$' : 'tool';

	spaceName == 'tool' && console.warn('window.$命名空间已被使用，请用tool代替...');

	// 选择器 
	w[spaceName] = dom.ele;

	// 工具方法
	w[spaceName].trim = util.trim;
	w[spaceName].dateFormat = util.dateFormat;
	w[spaceName].getQueryString = util.getQueryString;
	w[spaceName].validate = util.validate;
	w[spaceName].browserVersion = util.browserVersion;

	// 本地存储
	w[spaceName].getCookie = storage.getCookie;
	w[spaceName].setCookie = storage.setCookie;
	w[spaceName].getStorage = storage.getStorage;
	w[spaceName].setStorage = storage.setStorage;
	w[spaceName].removeStorage = storage.removeStorage;
	w[spaceName].clearStorage = storage.clearStorage;
})(window);