var mongoClient = require('mongodb').MongoClient;
var config = require("../configs").mongodb;

var url = config.host + ':' + config.port;
var isConnected = false;
let mongo;

var db = null;

// function _connect() {
//     return new Promise(function (resolve, reject) {
//         MongoClient.connect(url, { useNewUrlParser: true }, function (err, _db) {
//             if (err) {
//                 reject(err);
//                 throw err;
//             } else {
//                 console.log("db is load");
//                 resolve();
//                 connected = 1;
//                 db = _db;
//             }
//         });
//     })
// }
//
// function _insert(dbname, collection, data) {
//     return new Promise(function (resolve, reject) {
//         var dbo = db.db(dbname);
//         dbo.collection(collection).insertOne(data, function (err, res) {
//             if (err) {
//                 reject(err);
//                 throw err;
//             } else {
//                 console.log("db is insert");
//                 resolve();
//             }
//         });
//     });
// }
//
// function _del(dbname, collection, data) {
//     return new Promise(function (resolve, reject) {
//         var dbo = db.db(dbname);
//         dbo.collection(collection).deleteOne(data, function (err, res) {
//             if (err) {
//                 reject(err);
//                 throw err;
//             } else {
//                 console.log("db is del");
//                 resolve();
//             }
//         });
//     });
// }
//
// function _update(dbname, collection,app_id, data) {
//     return new Promise(function (resolve, reject) {
//         var dbo = db.db(dbname);
//         // console.log(app_id);
//         // console.log(data);
//         dbo.collection(collection).updateOne(app_id,data, function (err, res) {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//                 throw err;
//
//             } else {
//                 console.log(res.result.nModified + " 条文档被更新");
//                 console.log("db is update");
//                 resolve();
//             }
//         });
//     });
// }
//
// function _get(dbname, collection,data) {
//     return new Promise(function (resolve, reject) {
//         var dbo = db.db(dbname);
//         console.log(data);
//         dbo.collection(collection). find(data).toArray(function (err, res) {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//                 throw err;
//             } else {
//                 resolve(res);
//                 return(res);
//             }
//         });
//     });
// }
//
// exports.insert = async function (dbname, collection, data) {
//     if (!connected) {
//         await _connect();
//     }
//     await _insert(dbname, collection, data);
// }
//
//
// exports.del = async function (dbname, collection, data) {
//     if (!connected) {
//         await _connect();
//     }
//     await _del(dbname, collection, data);
// }
//
// exports.update = async function (dbname, collection, app_id,data) {
//     if (!connected) {
//         await _connect();
//     }
//     await _update(dbname, collection, app_id,data);
// }
//
// exports.get = async function (dbname, collection,data) {
//     if (!connected) {
//         await _connect();
//     }
//     var res = await _get(dbname, collection,data);
//     return res;
// }


//连接数据库
async  function  _connect() {
    return new Promise(function (resolve, reject) {
        mongoClient.connect(url,{ useNewUrlParser: true },function (err,connect) {
            if(err){
                console.log('mongodb connection err :' + err);
                reject();
            }
            isConnected = true;
            console.log('mongodb 已经成功连接');
            mongo =  connect;
            resolve(mongo);
        })
    })
}

//连接表
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @returns {Promise<any>}
 * @private
 */
async  function _getTable(dbname,collection) {
    return new Promise(async function (resolve, reject) {
        let dbo = mongo.db(dbname);
        dbo.collection(collection,function (err,db) {
            if (err || db == null) {
                console.log('DatabaseError: ' + err);
                reject();
            }
            resolve(db);
        })

    })

}


//查询单个数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query   查找条件
 * @param field   显示条件
 * @returns {Promise<any>}
 * @private
 */
async  function _get(dbname,collection,query,field) {
    return new Promise(async function (resolve, reject) {
        let db = await _getTable(dbname,collection);
        db.findOne(query, field, function (err, data) {
            if (err) {
                console.log('find data err '+err);
                reject(err);
            }
            resolve(data);
        });

    })

}

//获取全部数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query   查找条件
 * @param field   显示条件
 * @param other   排序 限制等条件
 * @returns {Promise<any>}
 * @private
 */
async  function  _getAll(dbname,collection,query,field,other) {
    return new Promise(async function (resolve, reject) {
        let db = await _getTable(dbname,collection);
        let limit = other.limit || 0;
        db.find(query, field).sort(other.sort).limit(limit).toArray(function (err, data) {
            if (err) {
                console.log('findAll data err '+err);
                reject(err);
            }
            resolve(data);
        });

    })

}

//插入数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query 插入数据
 * @returns {Promise<any>}
 * @private
 */
async function _insert(dbname,collection,query) {
    return new Promise(async function (resolve, reject) {
        let db = await _getTable(dbname,collection);
        db.insertOne(query, function (err, data) {
            if (err) {
                console.log('insert data err '+err);
                reject(err);
            }
            console.log("mongo 数据插入成功");
            resolve(data);
        })
    })
}

//更新数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query 条件
 * @param updatefield  更新内容
 * @param deletefield  删除内容
 * @returns {Promise<any>}
 * @private
 */
async function _updateOne(dbname,collection,query,updatefield,deletefield) {
    return new Promise(async function (resolve, reject) {
        var bupdate = false;
        for(var i in updatefield)
        {
            bupdate = true;
            break;
        }

        var bdelete = false;
        for(var i in deletefield)
        {
            bdelete = true;
            break;
        }
        var field = {};
        if(bupdate) field["$set"] = updatefield;
        if(bdelete) field["$unset"] = deletefield;

        let db = await _getTable(dbname,collection);

        db.updateOne(query, field,function (err, data) {
            if (err) {
                console.log('updateOne data err '+err);
                reject(err);
            }
            console.log("mongo 数据修改成功");
            resolve(data);
        })
    })
}


//更新多条数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query 条件
 * @param updatefield  更新内容
 * @param deletefield  删除内容
 * @returns {Promise<any>}
 * @private
 */
async function _updateMany(dbname,collection,query,updatefield,deletefield) {
    return new Promise(async function (resolve, reject) {
        var bupdate = false;
        for(var i in updatefield)
        {
            bupdate = true;
            break;
        }

        var bdelete = false;
        for(var i in deletefield)
        {
            bdelete = true;
            break;
        }
        var field = {};
        if(bupdate) field["$set"] = updatefield;
        if(bdelete) field["$unset"] = deletefield;

        let db = await _getTable(dbname,collection);

        db.updateMany(query, field,function (err, data) {
            if (err) {
                console.log('updateOne data err '+err);
                reject(err);
            }
            console.log("mongo 数据修改成功");
            resolve(data);
        })
    })
}



//删除数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query  删除条件
 * @returns {Promise<any>}
 * @private
 */
async function _removeOne(dbname,collection,query) {
    return new Promise(async function (resolve, reject) {
        let db = await _getTable(dbname,collection);
        db.deleteOne(query, function (err, data) {
            if (err) {
                console.log('delete data err '+err);
                reject(err);
            }
            console.log("mongo 删除数据成功");
            resolve(data);
        })
    })
}

//删除多条数据
/**
 *
 * @param dbname  DB名字
 * @param collection 表名
 * @param query  删除条件
 * @returns {Promise<any>}
 * @private
 */
async function _removeMany(dbname,collection,query) {
    return new Promise(async function (resolve, reject) {
        let db = await _getTable(dbname,collection);
        db.deleteMany(query, function (err, data) {
            if (err) {
                console.log('delete data err '+err);
                reject(err);
            }
            console.log("mongo 删除数据成功");
            resolve(data);
        })
    })
}



exports.Get = async function(dbname,collection,query,field) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _get(dbname,collection,query,field);
    return result;
}

exports.GetAll = async function(dbname,collection,query,field,other) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _getAll(dbname,collection,query,field,other);
    return result;
}

exports.Insert = async function(dbname,collection,query) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _insert(dbname,collection,query);
    return result;
}

exports.UpdateOne = async function(dbname,collection,query,updatefield,deletefield) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _updateOne(dbname,collection,query,updatefield,deletefield);
    return result;
}

exports.UpdateMany = async function(dbname,collection,query,updatefield,deletefield) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _updateMany(dbname,collection,query,updatefield,deletefield);
    return result;
}

exports.RemoveOne = async function(dbname,collection,query) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _removeOne(dbname,collection,query);
    return result;
}

exports.RemoveMany = async function(dbname,collection,query) {
    if(!isConnected){
        await _connect();
    }
    let result = await  _removeMany(dbname,collection,query);
    return result;
}

// MongoClient.getTable ;



