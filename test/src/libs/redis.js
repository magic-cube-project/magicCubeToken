
var config = require("../configs").RedisInfo;

var redis = require("redis"),
    client = redis.createClient(config.port, config.host, {});
var connected = 0;

client.on("ready", function (err) {
    if (err) {
        console.log("err : " + err);
    } else {
        console.log("redis start ");
        connected = 1;
    }
})

function _connect() {
    return new Promise(function (resolve, reject) {
        client.on("ready", function (err) {
            if (err) {
                console.log("err : " + err);
                reject();s
            } else {
                console.log("redis start ");
                connected = 1;
                resolve();
            }
        })
    })
}

function _expire(key, id,second) {
    return new Promise(function (resolve, reject) {
        client.expire(key + ":" + id, second, function (err, rep) {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    });
}

function _set(key, id, value,second) {
    return new Promise(function (resolve, reject) {
        client.set(key + ":" + id, value, function (err, rep) {
            if (err) {
                reject(err)
            } else {
                if(second)
                _expire(key,id,second);
                resolve();
            }
        });
    });
}


function _get(key, id) {
    return new Promise(function (resolve, reject) {
        client.get(key + ":" + id, function (err, rep) {
            if (err) {
                reject(err)
            } else {
                resolve(rep);
            }
        });
    });
}

function _del(key, id) {
    return new Promise(function (resolve, reject) {
        client.del(key + ":" + id, function (err, rep) {
            if (err) {
                reject(err)
            } else {
                resolve(rep);
            }
        });
    });
}


async function set(key, id, value) {
    if (!connected) {
        await _connect();
    }
    let res = await _set(key, id, value);
    return res;
}

async function get(key, id) {
    if (!connected) {
        await _connect();
    }
    let res = await _get(key, id);
    return res;
}

exports.set = async function (key, id, value,second) {
    if(Object.prototype.toString.call(value) === '[object Object]'){
         value = JSON.stringify(value);
    }
    if (!connected) {
        await _connect();
    }
    let res = await _set(key, id, value,second);
    return res;
}

exports.get = async function (key, id) {
    if (!connected) {
        await _connect();
    }
    let res = await _get(key, id);
    try {
        res = JSON.parse(res);
    } catch (error) {
        return res;
    }
    return res;
}

exports.del = async function(key,id){
    if (!connected) {
        await _connect();
    }

    await _del(key,id);

}