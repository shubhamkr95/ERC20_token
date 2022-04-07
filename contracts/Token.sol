// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
 string public name = "Api Token";
 string public symbol = "ATN";

 uint256 public totalSupply = 1000 * 10**18;

 address public owner;

 mapping(address => uint256) balances;

 constructor() {
  balances[msg.sender] = totalSupply;
  owner = msg.sender;
 }

 function transfer(address to, uint256 amount) external {
  // check the minimum balance for transaction
  require(balances[msg.sender] >= amount, "not enough tokens");

  // Trasnfer the amount
  balances[msg.sender] -= amount;
  balances[to] += amount;
 }

 function balanceOf(address account) public view returns (uint256) {
  return balances[account];
 }
}
