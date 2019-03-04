/**
 * created by ttn on 8/31/2018
 * desc 交易所发四叶草
 */
const request = require('request');
const config = require("../../configs").exchangeInfo;
var mysql = db = require('../../content/model/mysql/index')('game');

//交易所API根目录地址
const root_url = config.root_url;

const grant_type = config.grant_type;
const appid = config.appid;
const secret = config.secret;
var token = null;

var that = module.exports;


/**
 * 获取当前的token
 */
module.exports.getToken = async function () {
    let getToken = async () => {
        return new Promise((resolve, reject) => {
            if (token == null || token.expires_time < new Date().getTime()) {
                request(`${root_url}/cubekit/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    let result = JSON.parse(res.body)
                    token = result.result;
                    resolve(token);
                });
            } else {
                resolve(token);
            }
        });
    };

    let curr_token = await getToken();
    return curr_token.access_token;
}

/**
 * 获取用户的openID
 */
module.exports.getOpenid = async function (tel) {
    let access_token = await that.getToken();
    let res = await HttpRequest('cubekit/getUserOpenid', {
        access_token, tel
    })
    return res;
}

/**
 * 用户发币
 */
module.exports.send = async function (openid, coin, amount, tag, description) {
    let access_token = await that.getToken();
    console.log("cubekit/sendCoin",{
        access_token, openid, coin, amount, tag, description
    });
    let res = await HttpRequest("cubekit/sendCoin", {
        access_token, openid, coin, amount, tag, description
    });
    return res;
}

/**
 * 通过openid当前的余额
 */
module.exports.getBalance = async function (openid, coin) {
    let access_token = await that.getToken();
    let res = await HttpRequest("cubekit/balance", {
        access_token, openid, coin
    });
    return res;
}

// 获取当前的剩余的斗牛卡
module.exports.getdnk = async function(){
    var res = await mysql.query("SELECT * FROM `dnk_config`");
    return res[0].leftnum;
}

// 当前今日需要发送的斗牛卡
module.exports.getTodayDnk = async function(){
    var leftnum = await module.exports.getdnk();
    return parseInt(leftnum*0.05/30);
}

// 获取当前斗牛卡市场行情
module.exports.getdnkMarket = async function(period){
    let market = "DNKMCC";
    period = period||86400;

    let res = await HttpRequest("cubekit/getLatestMarket", {
        market, period
    });
    return res;
}

// 获取当前斗牛卡K线
module.exports.getdnkKline = async function(start,end,interval){
    let market = "DNKMCC";
    let res = await HttpRequest("cubekit/market/kline", {
        market,start,end,interval
    });
    return res;
}


function HttpRequest(url, _data) {
    return new Promise((resolve, reject) => {
        let params = {
            url: `${root_url}/${url}`,
            method: 'POST',
            form: _data
        };
        request(params, (err, res) => {
            if (err) {
                console.log("http",params,err);
                reject(err);
                return;
            }
            let data = JSON.parse(res.body);
            
            console.log("http",params,data);

            if (data.error) {
                reject(data.error);
                return;
            }
            resolve(data.result);
        });
    });
}