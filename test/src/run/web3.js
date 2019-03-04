var error = require("../libs/error");

var web3 = require("../web3");



exports.balanceOf = async function(body){
    var address = body.address;
    return error.ok(web3.balanceOf(address));
}

exports.transfer = async function(body){
    var transfer_address = body.transfer_address;
    var target_address = body.target_address;
    var amount = body.amount;
    try {
        web3.transfer(transfer_address,target_address,amount);
    } catch (er) {
        return error.error(-1,er.toString());
    }
    return error.ok(); 
}
