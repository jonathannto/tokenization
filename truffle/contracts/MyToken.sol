pragma solidity 0.6.1;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StarDucks Cappucino Token", "CAPPU", 0) {
        _mint(msg.sender, initialSupply);
    }
}