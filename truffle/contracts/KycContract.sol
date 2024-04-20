// SPDX-License-Identifier: MIT
//contracts/MyToken.sol
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract  is Ownable{
   mapping(address => bool) allowed;

   constructor(address initialOwner) Ownable(initialOwner) {}

   function setKycCompleted(address _addr) public onlyOwner{
      allowed[_addr] = true;
   }

   function setKycRevoked(address _addr) public onlyOwner{
      allowed[_addr] = false;
   }

   function kycCompleted(address _addr) public view returns(bool) {
      return allowed[_addr];
   }
}