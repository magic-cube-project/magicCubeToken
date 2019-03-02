
![MgaicCube Token](readme-header.png)

The MagicCubeToken contract is a standard ERC20 token with extra game functionality:

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





## ERC20 standard

我们可以在[https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fethereum%2FEIPs%2Fblob%2Fmaster%2FEIPS%2Feip-20-token-standard.md)查看ERC20代币的标准API。



### Method

所有的ERC20代币都是按照下面这些方法来定义的。

1. name

   ```
   function name() constant returns (string name) 
   ```

   返回string类型的ERC20代币的名字，例如：MagicCubeToken

2. symbol

   ```
   function symbol() constant returns (string symbol)
   ```

   返回string类型的ERC20代币的符号，也就是代币的简称，例如：MCC。

3. decimals

   ```
   function decimals() constant returns (uint8 decimals)
   ```

   支持几位小数点后几位。如果设置为3。也就是支持0.001表示。

4. totalSupply

   ```
   function totalSupply() constant returns (uint256 totalSupply)
   ```

   发行代币的总量，可以通过这个函数来获取。所有智能合约发行的代币总量是一定的，totalSupply必须设置初始值。如果不设置初始值，这个代币发行就说明有问题。

5. balanceOf

   ```
   function balanceOf(address _owner) constant returns (uint256 balance)
   ```

   输入地址，可以获取该地址代币的余额。

6. transfer

   ```
   function transfer(address _to, uint256 _value) returns (bool success)
   ```

   调用transfer函数将自己的token转账给_to地址，_value为转账个数

7. approve

   ```
   function approve(address _spender, uint256 _value) returns (bool success)
   ```

   批准_spender账户从自己的账户转移_value个token。可以分多次转移。

8. transferFrom

   ```
   function transferFrom(address _from, address _to, uint256 _value) returns (bool success)
   ```

   与approve搭配使用，approve批准之后，调用transferFrom函数来转移token。

9. allowance

   ```
   function allowance(address _owner, address _spender) constant returns (uint256 remaining)
   ```

   返回_spender还能提取token的个数。
