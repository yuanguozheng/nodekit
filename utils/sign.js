/**
 * Copyright (c) 2015 ibenchu.com. All Rights Reserved.
 *
 * @file 用于进行参数签名
 * @author yuanguozheng
 */
var constants = require('./constants');

function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort();
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}

function sign(str) {
    var jsSHA = require('jssha');
    var shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(str + constants.SECRET_KEY);
    return shaObj.getHash('HEX');
}

/**
 * 签名
 *
 * @param {Object} args 参数对象
 * @return {string} 签名字符串
 */
module.exports = function (args) {
    var str = raw(args);
    return sign(str);
};