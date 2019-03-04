var error = require("../libs/error");
var config = require("../configs").server;


exports.version = async function(){
    let version = config.version;
    return error.ok({version});
}