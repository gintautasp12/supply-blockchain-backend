const web3Provider = require('./Web3Provider');

class SmartContractService {
    async registerAdministrator(address) {
        const systemAccount = web3Provider.getSystemAccount();
        
        return await web3Provider
            .getContract(systemAccount)
            .methods
            .registerAdministrator(address)
            .send({ from: systemAccount.address, gas: 3000000 });
    }
}

module.exports = new SmartContractService();
