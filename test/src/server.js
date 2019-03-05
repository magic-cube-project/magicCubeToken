/**
 * [crypto 客户端账户的基本登陆所要的信息]
 * @type {[type]}
 */

var express = require('express');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var bodyParser = require('body-parser');

var config = require("./configs").server;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname+'/static'))




exports.start = function (cfg) {
    config = cfg;
    app.listen(config.port);
    console.log("server is listening on " + config.port);
}


//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With,user-token,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header('Access-Control-Allow-Credentials','true');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.get("/*/*", function (req, res) {
    handerReq(req, res);
});

app.post("/*/*", multipartMiddleware, function (req, res) {
    handerReqPost(req, res);
});


function handerReq(req, res) {
    var url = req.originalUrl.split("?")[0];
    var urlArr = url.split("/");
    var model = urlArr[1];
    var action = urlArr[2];
    try {
        if (!action || !model) {
            throw action + " " + " " + model + " no exist"
        }
        require("./run/" + model + ".js")[action](req.query).then(function (data) {
            res.send(data);
        }).catch(function (data) {
            
            if (isPromise(data)) {
                data.then(function (data) {
                    res.send(data);
                });
            } else {
                console.error(url,data);
                res.send(data);
            }

        });
    } catch (err) {
        console.error("Expection", err);
        res.send(err);
    }
}

function handerReqPost(req, res) {
    var url = req.originalUrl.split("?")[0];
    var urlArr = url.split("/");
    var model = urlArr[1];
    var action = urlArr[2];
    try {
        if (!action || !model) {
            throw action + " " + " " + model + " no exist";
        }
        require("./run/" + model + ".js")[action](req.body).then(function (data) {
            res.send(data);
        }).catch(function (data) {
            if (isPromise(data)) {
                data.then(function (data) {
                    res.send(data);
                });
            } else {
                res.send(data);
            }
        });
    } catch (err) {
        console.error("Expection", err);
        res.send(err);
    }
}

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}