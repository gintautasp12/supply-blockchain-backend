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

    async registerDevice(address) {
        const systemAccount = web3Provider.getSystemAccount();
        
        // TODO: author should be currently logged in administrator
        const author = systemAccount.address;

        return await web3Provider
            .getContract(systemAccount)
            .methods
            .registerDevice(address, author)
            .send({ from: systemAccount.address, gas: 3000000 });
    }

    async registerEvent(eventType, value, objectId) {
        // Single fake account to simulate and IoT device sending events
        const deviceAccount = web3Provider.getIoTDeviceAccount();

        return await web3Provider
            .getContract(deviceAccount)
            .methods
            .registerEvent(eventType, value, objectId)
            .send({ from: deviceAccount.address, gas: 3000000 });
    }
}

module.exports = new SmartContractService();
