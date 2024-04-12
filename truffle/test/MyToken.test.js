const Token = artifacts.require("MyToken");
const { BN } = require("web3-utils"); // Adicionando importação para BN

var chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;

require("dotenv").config({path:"../.env"});

contract("Token Test", async (accounts) => {
    const [deployerAccount, recipient] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        let balance = await instance.balanceOf(deployerAccount);
        expect(balance.toString()).to.equal(totalSupply.toString());
    });

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = this.myToken
        let totalSupply = await instance.totalSupply();
        let initialSenderBalance = await instance.balanceOf(deployerAccount);
        let initialRecipientBalance = await instance.balanceOf(recipient);

        // Realiza a transferência de tokens
        await instance.transfer(recipient, sendTokens);

        // Verifica os saldos após a transferência
        let finalSenderBalance = await instance.balanceOf(deployerAccount);
        let finalRecipientBalance = await instance.balanceOf(recipient);

        // Verifica se os saldos foram ajustados corretamente
        expect(finalSenderBalance.toNumber()).to.equal(initialSenderBalance.toNumber() - sendTokens);
        expect(finalRecipientBalance.toNumber()).to.equal(initialRecipientBalance.toNumber() + sendTokens);
    });

    it("não é possível enviar mais tokens do que o disponível no total de tokens", async () => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        // Tenta transferir mais tokens do que o disponível no saldo do remetente
        await expect(instance.transfer(recipient, balanceOfDeployer.add(new BN(1)))).to.be.rejected;

        // Verifica se o saldo do remetente permanece inalterado
        let finalBalanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(finalBalanceOfDeployer.toString()).to.equal(balanceOfDeployer.toString());
    });
});
