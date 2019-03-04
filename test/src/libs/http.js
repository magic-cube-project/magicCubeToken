var http = require('http');
var https = require('https');
var qs = require('querystring');
/**
 * 创建一个get的数据请求
 * @param {*} url 
 * @param {*} data 
 * @param {*} sucFn 
 * @param {*} errFn 
 */
function GetReq(url, data, sucFn, errFn) {
    var context = qs.stringify(data);
    url = url + "?" + context;
    var req = http.get(url, function(res) {
        res.setEncoding('utf-8');
        res.on('data', function(chunk) {
         var json = eval("("+chunk+")");
            !sucFn || sucFn(json);
        });
    });

    req.on('error', function(e) {
        !errFn || errFn(e);
    });
    req.end();
}

exports.get = function(data) {
    var url = data.root + data.path
    var sucFn = data.sucFn || new Function();
    var errFn = data.errFn || new Function();
    new GetReq(url, data.data, sucFn, errFn);
}

function postReq(host,port,path,data,callback) {
    var postData=qs.stringify(data);
    var options={
        hostname:host,
        path:path,
        method:'POST',
        port:port,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length':Buffer.byteLength(postData)
        }
    }
    var req=http.request(options, function(res) {
        //  console.log('Status:',res.statusCode);
        //  console.log('headers:',JSON.stringify(res.headers));
        res.setEncoding('utf-8');
        res.on('data',function(chunk){
            var json = eval("("+chunk+")");
            !callback || callback(json);
        });
        res.on('end',function(){
        });
    });
    req.on('error',function(err){
        console.error(err);
    });
    req.write(postData);
    req.end();
};

exports.post = function(data) {
    var host = data.root;
    var port = data.port;
    var path = data.path;
    var callback = data.callback || new Function();
    new postReq(host,port,path,data.data,callback);
}