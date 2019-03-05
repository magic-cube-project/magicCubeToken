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
var address = '0x47295f39f6da1d32ea353cdab4cd6efd13fdf448';
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
/**
 * start transfer
 */
exports.transfer = function(account_one,account_two,amount){
    try {
        var txhash = metacoin.transfer.sendTransaction(account_two, amount, {
            from: account_one
        }); 
    } catch (error) {
        throw error;
    }
  
    return txhash;
}



// get event object
var myEvent = metacoin.Transfer();
// Listen for events, callback functions are executed after the event is listened to
myEvent.watch(function (err, result) {
    if (!err) {
        console.log(result);
    } else {
        console.log(err);
    }
    // myEvent.stopWatching();
});

