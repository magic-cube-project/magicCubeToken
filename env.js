"use strict";

var Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var BigNumber = require('bignumber.js');

var eth = web3.eth;
var async = require('async');

var MagicCubeToken = require('./dist/MagicCubeToken.js');

var gcb = function(err, res) {
    if (err) {
        console.log("ERROR: "+err);
    } else {
        console.log(JSON.stringify(res,null,2));
    }
}

var MagicCubeToken;

function deployExample(cb) {
    cb = cb || gcb;
    async.series([
        function(cb) {
            MagicCubeToken.deploy(web3, {
                tokenName: "MagicCube Test Token",
                decimalUnits: 18,
                tokenSymbol: "MMT",
            }, function(err, _MagicCubeToken) {
                if (err) return err;
                MagicCubeToken = _MagicCubeToken;
                console.log("MagicCube Token: " + MagicCubeToken.contract.address);
                cb();
            });
        },
        function(cb) {
            MagicCubeToken.generateTokens({
                owner: eth.accounts[ 1 ],
                amount: 10,
                from: eth.accounts[ 0 ],
            },cb);
        },
    ], cb);

}
