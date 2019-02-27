tutor document

https://www.jianshu.com/p/ad14f4b0eec8



http://www.cocoachina.com/cms/wap.php?action=article&id=22592

install cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



dev tool



- Truffle v4.1.14 框架
- Ganache 以太坊测试环境
- TutorialToken 打包好的 ERC20 示例，我们只需要写很少的代码即可，而且包含了前端页面

```
cnpm install -g ganache-cli
cnpm install -g truffle@4.1.14
cnpm install -g lite-server
cnpm install zeppelin-solidity
```



start  Ganache

```
ganache-cli -p 8545
```





```
## 编译
$ truffle compile
## 部署
$ truffle migrate

```



```
# 进入控制台
$ truffle console
# 获取合约实例
truffle(development)> TutorialToken.deployed().then(instance => token = instance)
# 查看默认账户余额
truffle(development)> token.balanceOf(web3.eth.coinbase)
BigNumber { s: 1, e: 3, c: [ 9000 ] }
# 查看目标账户余额
truffle(development)> token.balanceOf(web3.eth.accounts[2])
BigNumber { s: 1, e: 3, c: [ 3000 ] }
```


```

0x3699bafc250b16121196ea242ec7274b1f9a4cbc

```