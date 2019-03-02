let fs = require("fs");
let Web3 = require('web3');
let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

let from = web3.eth.accounts[0];

console.log(web3.eth.accounts);

var abi = fs.readFileSync("./standard.json").toString();
abi = JSON.parse(abi);
var address = '0xae2da9d7818d4f705aaac426bf138d8fc5fa57ef';
// Get deployed contract objects through ABI and address
var metacoin = web3.eth.contract(abi).at(address);

var account_one = web3.eth.accounts[0];
var account_two = web3.eth.accounts[1];
var account_one_balance = metacoin.balanceOf.call(account_one);
console.log("account one balance: ", account_one_balance.toNumber());

// start transfer
var txhash = metacoin.transfer.sendTransaction(account_two, 10000000, {
    from: account_one
});
console.log("txhash", txhash);

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