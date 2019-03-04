let fs = require("fs");
let Web3 = require('web3');
let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

var abi = fs.readFileSync(__dirname+"/standard.json").toString();
abi = JSON.parse(abi);
var address = '0xdbbb657093d82b9f380d618f858d974592946523';
// Get deployed contract objects through ABI and address
var metacoin = web3.eth.contract(abi).at(address);

function balanceOf(address){
    var account_one_balance = metacoin.balanceOf.call(address);
    var balance = account_one_balance.toNumber();
    return { address,balance}
}

/**
 * Get the current address, currency balance
 */
exports.balanceOf = function(address){
    var balances = [];
    if(address){
        balances.push(balanceOf(address));
    }else{
        web3.eth.accounts.forEach(a => {
            balances.push(balanceOf(a));
        });
    }
    return balances;
}


var account_one = web3.eth.accounts[0];
var account_two = web3.eth.accounts[1];

// start transfer
var txhash = metacoin.transfer.sendTransaction(account_two, 10000000, {
    from: account_one
});
console.log("txhash", txhash);


