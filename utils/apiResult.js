/**
 * Copyright (c) 2015 ibenchu.com. All Rights Reserved.
 *
 * @file API结果处理类
 * @author yuanguozheng
 */
var NOT_FOUND = 'not_found';
var SERVER_ERROR = 'server_error';
var PARAM_ERROR = 'param_error';
var SIGN_ERROR = 'signature_error';
var DB_ERROR = 'db_error';
var NOT_LOGIN = 'not_login';
var METHOD_NOT_ALLOW = 'method_not_allow';
var TIMESTAMP_EXPIRED = 'timestamp_expired';

/**
 * 获取API结果
 *
 * @param {number} status 状态码
 * @param {Object} data 数据
 * @param {string} err 错误
 * @return {{status: *, data: *, err: *}} JSON对象
 */
function getResult(status, data, err) {
    return {
        status: status,
        data: data,
        err: err
    };
}

/**
 * 返回成功结果
 *
 * @param {Object} data 数据
 * @return {{status, data, err}|{status: *, data: *, err: *}} JSON对象
 */
function getSuccessResult(data) {
    return getResult(0, data, null);
}

/**
 * 返回错误结果
 *
 * @param {number} status 状态码
 * @param {string} err 错误信息
 * @return {{status, data, err}|{status: *, data: *, err: *}} JSON对象
 */
function getFailedResult(status, err) {
    return getResult(status, null, err);
}

/**
 * 默认成功结果
 *
 * @return {{status, data, err}|{status: *, data: *, err: *}} JSON对象
 */
function defaultResult() {
    return getSuccessResult(null);
}

function notFound() {
    return getFailedResult(-1, NOT_FOUND);
}

function serverError() {
    return getFailedResult(-2, SERVER_ERROR);
}

function paramError() {
    return getFailedResult(-1, PARAM_ERROR);
}

function signError() {
    return getFailedResult(-1, SIGN_ERROR);
}

function dbError() {
    return getFailedResult(-3, DB_ERROR);
}

function notLogin() {
    return getFailedResult(-1, NOT_LOGIN);
}

function methodNotAllow() {
    return getFailedResult(-1, METHOD_NOT_ALLOW);
}

function timestampExpired() {
    return getFailedResult(-1, TIMESTAMP_EXPIRED);
}

module.exports = {
    getResult: getResult,
    getSuccessResult: getSuccessResult,
    getFailedResult: getFailedResult,
    defaultResult: defaultResult,
    notFound: notFound,
    serverError: serverError,
    paramError: paramError,
    signError: signError,
    dbError: dbError,
    notLogin: notLogin,
    methodNotAllow: methodNotAllow,
    timestampExpired: timestampExpired
};