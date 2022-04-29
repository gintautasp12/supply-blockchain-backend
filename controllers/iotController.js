const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const userRegistrator = require('../services/UserRegistrator');
const smartContractService = require('../services/SmartContractService');

const prisma = new PrismaClient();

exports.index = async (req, res) => {
    res.render('iot');
}
