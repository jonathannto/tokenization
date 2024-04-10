// SPDX-License-Identifier: MIT
//contracts/MyToken.sol
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20('StarDucks Cappucino Token', 'CAPPU') {
        _mint(msg.sender, initialSupply);
    }
}