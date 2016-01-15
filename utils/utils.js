/**
 * Created by yuanguozheng on 15/10/9.
 */

/**
 * 是否为空
 *
 * @param {Object} obj 对象
 * @return {boolean} 是否为空
 */
function isNull(obj) {
    if (typeof obj === 'string') {
        obj = obj.trim();
    }
    return (obj === '' || obj === null || obj === undefined);
}

/**
 * 是否都不为空
 *
 * @return {boolean} 是否都不为空
 */
function isAllNotNull() {
    for (var i = 0; i < arguments.length; i++) {
        if (isNull(arguments[i])) {
            return false;
        }
    }
    return true;
}

/**
 * 对象是否含有fields字段,且都不为空
 *
 * @param {Object} obj 对象
 * @param {Array} fields 字段名数组
 * @return {boolean} 是否都不为空
 */
function isObjAllNotNull(obj, fields) {
    for (var i = 0; i < fields.length; i++) {
        if (!obj.hasOwnProperty(fields[i])) {
            return false;
        } else if (isNull(obj[fields[i]])) {
            return false;
        }
        if (i == fields.length - 1) {
            return true;
        }
    }
}

/**
 * Object的值是否都不为空
 *
 * @param {Object} obj 需要检测的对象
 * @return {boolean} 检测结果
 */
function isObjAllNotNullSimple(obj) {
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
            return false;
        }
        if (isNull(i)) {
            return false;
        }
    }
    return true;
}

/**
 * 对象数组的每项是否存在fields中的键,且都不为空
 *
 * @param {Array} arr 对象数组
 * @param {Array} fields 要求的字段名数组
 * @return {boolean} 是否都不为空
 */
function isObjArrayAllNotNull(arr, fields) {
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!isObjAllNotNull(item, fields)) {
            return false;
        }
        if (i == arr.length - 1) {
            return true;
        }
    }
}

/**
 * 是否全是空
 *
 * @return {boolean} 检测结果
 */
function isAllNull() {
    for (var i = 0; i < arguments.length; i++) {
        if (!isNull(arguments[i])) {
            return false;
        }
    }
    return true;
}

/**
 * 字符串是否是手机号
 *
 * @param {string} str 字符串
 * @return {|Boolean|{manufacturer}|Array|{index: number, input: string}}
 */
function isPhoneNumber(str) {
    return str.match(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};
function trim(str) { //删除左右两端的空格
    if (!isNull(str)) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}
function ltrim(str) { //删除左边的空格
    if (!isNull(str)) {
        return str.replace(/(^\s*)/g, "");
    }
}
function rtrim(str) { //删除右边的空格
    if (!isNull(str)) {
        return str.replace(/(\s*$)/g, "");
    }
}

var EXP_TIME = 300 * 1000;  // 5min

/**
 * 时间戳是否过期
 *
 * @param {number} timestamp 时间戳
 * @return {boolean} 是否过期
 */
function isExpire(timestamp) {
    var nowTime = new Date();
    return Math.abs(timestamp - nowTime) > EXP_TIME;
}

/**
 * 获取GET或POST中的参数
 *
 * @param {Object} req 请求
 * @param {string} key 参数名
 * @return {string} 参数值
 */
function getParam(req, key) {
    var param = req.query[key];
    if (isNull(param)) {
        param = req.body[key];
    }
    return param;
}

module.exports = {
    isNull: isNull,
    isAllNull: isAllNull,
    isAllNotNull: isAllNotNull,
    isObjAllNotNull: isObjAllNotNull,
    isObjArrayAllNotNull: isObjArrayAllNotNull,
    isObjAllNotNullSimple: isObjAllNotNullSimple,
    isPhoneNumber: isPhoneNumber,
    trim: trim,
    ltrim: ltrim,
    rtrim: rtrim,
    isExpire: isExpire,
    getParam: getParam
};