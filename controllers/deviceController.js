const { PrismaClient } = require('@prisma/client');
const web3Provider = require('../services/Web3Provider');

const prisma = new PrismaClient();

exports.index = async (req, res) => {
    res.render('device');
}

exports.generate_keypair = async(req, res) => {
    try {
        const account = web3Provider.getWeb3().eth.accounts.create();

        res.status(200).json({
            address: account.address,
            privateKey: account.privateKey,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}