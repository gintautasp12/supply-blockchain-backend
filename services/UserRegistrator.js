const web3Provider = require('./Web3Provider');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient;

class UserRegistrator {
    async register(
        username,
        bussinessId
    ) {
        const account = web3Provider.getWeb3().eth.accounts.create();

        return await prisma.user.create({
            data: {
                username: username,
                address: account.address,
                privateKey: account.privateKey,
                password: await bcrypt.hash(
                    generator.generate({
                        length: 16,
                        numbers: true,
                        strict: true,
                    }),
                    await bcrypt.genSalt(10),
                ),
                businessId: bussinessId,
            }
        });
    }
}

module.exports = new UserRegistrator();
