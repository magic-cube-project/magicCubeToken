pragma solidity ^0.4.2;
import "./standard/token/ERC20/StandardToken.sol";

contract MagicCubeToken is StandardToken {
    string public name = "MagicCubeToken"; // Current contract name
    string public symbol = "MCC"; // Current contract symbol
    uint public decimals = 4;  // Keep 4 digits after the decimal point
    uint public INITIAL_SUPPLY = 200000000000000;  // The initial reserves of 20 billion

    /* 
     * Initialize the contract and give all the initial tokens to the creator of the contract
     * @param initialSupply Total number of tokens
     */
    constructor() public{
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}