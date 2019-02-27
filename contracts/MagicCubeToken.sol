pragma solidity ^0.4.2;
import "./standard/token/ERC20/StandardToken.sol";

contract MagicCubeToken is StandardToken {
    string public name = "MagicCubeToken";
    string public symbol = "MCC";
    uint public decimals = 4;  // 保留小数点后4位
    uint public INITIAL_SUPPLY = 200000000000000;  // 一开始的储量 200亿

    /* 
     * 初始化合约，并且把初始的所有代币都给这合约的创建者
     * @param initialSupply 代币的总数
     */
    constructor() public{
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}