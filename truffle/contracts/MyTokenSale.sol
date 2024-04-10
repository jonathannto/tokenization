// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Crowdsale.sol";

contract MyTokensale is Crowdsale {
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
        public
    {

    }
}