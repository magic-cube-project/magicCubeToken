var error = require("../libs/error");
var config = require("../configs").server;

var web3 = require("../web3");



exports.balanceOf = async function(body){
    var address = body.address;
    return error.ok(web3.balanceOf(address));
}
