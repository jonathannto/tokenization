var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale");
var KycContract = artifacts.require("KycContract");
require("dotenv").config({path:"../.env"});
console.log(process.env);

module.exports = async function(deployer) {

   let addr = await web3.eth.getAccounts();

   const ownerAddress = addr[0];

   await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
   await deployer.deploy(KycContract, ownerAddress);

   await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address);
   
   let instance = await MyToken.deployed();
   await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
}