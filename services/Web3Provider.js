const Web3 = require('web3');
const abi = require('../contracts/SupplyChain.abi');

class Web3Provider {
    static instance = null;

    getWeb3() {
        if (!Web3Provider.instance) {
            Web3Provider.instance = new Web3(
                new Web3.providers.HttpProvider(process.env.ETH_NODE_ENDPOINT)
            );
        }

        return Web3Provider.instance; 
    }

    getUserAccount(user) {
        const web3 = this.getWeb3();
        
        return web3.eth.accounts.privateKeyToAccount(user.privateKey);
    }

    getSystemAccount() {
        const web3 = this.getWeb3();
        
        return web3.eth.accounts.privateKeyToAccount(process.env.ADMIN_PANEL_PRIVATE_KEY);
    }

    getIoTDeviceAccount() {
        const web3 = this.getWeb3();
        
        return web3.eth.accounts.privateKeyToAccount(process.env.IOT_DEVICE_PRIVATE_KEY);
    }

    getContract(account) {
        const web3 = this.getWeb3();
        web3.eth.accounts.wallet.add(account);

        return new web3.eth.Contract(
            abi,
            process.env.CONTRACT_ADDRESS,
        );
    }
}

module.exports = new Web3Provider();
