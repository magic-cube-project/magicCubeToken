## ERC20 standard

We can view the standard API for ERC20 tokens at https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md.

### Method

All ERC20 tokens are defined in the following ways

1. name

   ```
   function name() constant returns (string name) 
   ```

   Returns the name of the ERC20 token of the string type, such as：MagicCubeToken

2. symbol

   ```
   function symbol() constant returns (string symbol)
   ```

   Returns the symbol of ERC20 token of string type, which is the abbreviation of token, for example：MCC。

3. decimals

   ```
   function decimals() constant returns (uint8 decimals)
   ```

   Supports several decimal places. If set to 3. That is to say, support 0.001 representation。

4. totalSupply

   ```
   function totalSupply() constant returns (uint256 totalSupply)
   ```

   The total amount of tokens issued can be obtained through this function. The total amount of tokens issued by all smart contracts is fixed, and the total Supply must set the initial value. If the initial value is not set, the issuance of the token indicates a problem.

5. balanceOf

   ```
   function balanceOf(address _owner) constant returns (uint256 balance)
   ```

   Enter the address to get the balance of the address token

6. transfer

   ```
   function transfer(address _to, uint256 _value) returns (bool success)
   ```

   Call the transfer function to transfer your token to the target address, value is the number of transfers

7. approve

   ```
   function approve(address _spender, uint256 _value) returns (bool success)
   ```

   Approve spender account to transfer value token from one's own account. It can be transferred several times.

8. transferFrom

   ```
   function transferFrom(address _from, address _to, uint256 _value) returns (bool success)
   ```

   With approve, after approve approval, transfer From function is called to transfer token.

9. allowance

   ```
   function allowance(address _owner, address _spender) constant returns (uint256 remaining)
   ```

   Returning _spender also extracts the number of tokens.



### Events

1. Transfer

   ```
   event Transfer(address indexed _from, address indexed _to, uint256 _value)
   ```

   When the token is successfully transferred, be sure to trigger the Transfer event.

2. Approval

   ```
   event Approval(address indexed _owner, address indexed _spender, uint256 _value)
   ```

   When the call to the approve function succeeds, be sure to trigger the Approval event.