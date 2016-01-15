/**
 * Created by yuanguozheng on 15/12/31.
 */
var mongoose = require('mongoose');
var mongoosePages = require('mongoose-pages');

var constants = require('../utils/constants');
var utils = require('../utils/utils');

var config;
var DB_URL = config.database;
var dbConn;

/**
 * 获取数据库操作
 *
 * @param {mongoose.Schema} schema Mongoose的Schema
 * @param {string} modelName model名
 * @returns {Operation}
 */
module.exports = function (schema, modelName) {
    if (!dbConn) {
        getConnection();
    }
    return new Operation(schema, modelName);
};

/**
 * 数据库操作类
 *
 * @class Operation
 * @param schema
 * @param modelName
 * @constructor
 */
function Operation(schema, modelName) {
    /**
     * 保证可分页查询
     */
    mongoosePages.skip(schema);

    var DbModel = dbConn.model(modelName, schema);

    /**
     * Model
     */
    this.getModel = DbModel;

    /**
     * 查询所有
     *
     * @param callback
     */
    this.findAll = function (callback) {
        this.findWithCondition(null, callback);
    };

    /**
     * 查询符合条件的所有
     *
     * @param condition
     * @param callback
     */
    this.findWithCondition = function (condition, callback) {
        DbModel.find(condition, {__v: 0}, function (err, result) {
            callback(result);
        });
    };

    /**
     * 分页查询
     *
     * @param condition
     * @param pageSize
     * @param page
     * @param callback
     */
    this.findWithPages = function (condition, pageSize, page, callback) {
        DbModel.findPaginated(condition, {__v: 0}, function (err, result) {
            if (err) {
                console.log(err);
                callback(constants.ERROR);
                return;
            }
            callback(result);
        }, pageSize, page);
    };

    /**
     * 查询一条记录
     *
     * @param condition
     * @param option
     * @param callback
     */
    this.findOne = function (condition, option, callback) {
        if (utils.isNull(condition)) {
            callback(constants.NONE);
            return;
        }
        var query = DbModel.findOne(condition, {__v: 0}, option);
        query.exec(function (err, result) {
            if (err) {
                console.log(err);
                callback(constants.ERROR);
                return;
            }
            callback(result);
        })
    };

    /**
     * 更新
     *
     * @param condition
     * @param newValue
     * @param callback
     */
    this.update = function (condition, newValue, callback) {
        DbModel.findOneAndUpdate(condition, {$set: newValue}, function (result) {
            callback(result);
        })
    };

    /**
     * 插入
     *
     * @param obj
     * @param callback
     */
    this.save = function (obj, callback) {
        var newInfo = new DbModel(obj);
        newInfo.save(function (err) {
            if (err) {
                console.log(err);
                callback(constants.ERROR);
            } else {
                callback(constants.OK);
            }
        });
    };

    /**
     * 检查是否存在,并插入
     *
     * @param obj
     * @param uniqueKey
     * @param callback
     */
    this.saveUnique = function (obj, uniqueKey, callback) {
        if (!obj.hasOwnProperty(uniqueKey)) {
            callback(constants.ERROR);
            return;
        }
        this.findOne(obj[uniqueKey], null, function (result) {
            if (result) {
                callback(constants.DUPLICATE);
            } else {
                this.save(obj, function (result) {
                    callback(result);
                })
            }
        });
    }
}

/**
 * 建立并获得数据库连接
 *
 * @returns {*}
 */
function getConnection() {
    if (dbConn) {
        return dbConn;
    }
    try {
        dbConn = mongoose.createConnection(DB_URL, {server: {poolSize: config.dbPoolSize}});
        return dbConn;
    } catch (e) {
        console.error(e);
    }
}