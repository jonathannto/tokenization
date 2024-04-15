const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
const { BN } = require("bn.js");

const chai = require("./setupchai.js");
const expect = chai.expect;


require("dotenv").config({path:"../.env"});

contract("TokenSale Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it('should not have any tokens in my deployerAccount', async () => {
      let instance = await Token.deployed();
      await expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(new BN(0));
    });

    it('all tokens should be in the TokenSale Smart Contract by default', async() => {
      let instance = await Token.deployed();
      let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
      let totalSupply = await instance.totalSupply();
      expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    
    
    
});

