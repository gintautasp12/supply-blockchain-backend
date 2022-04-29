const express = require('express');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const userRegistrator = require('./services/UserRegistrator');
const smartContractService = require('./services/SmartContractService');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/iot', async (req, res) => {
    res.render('iot');
});

router.get('/device', async (req, res) => {
    res.render('device');
});

router.post(
    '/admin',
    body('username').not().isEmpty().trim(),
    body('username').isEmail(),
    body('businessId').isInt().not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const admin = await userRegistrator.register(req.body.username, req.body.businessId);
            const transaction = await smartContractService.registerAdministrator(admin.address);

            res.status(200).json({
                id: admin.id,
                username: admin.username,
                businessId: admin.businessId,
                txHash: transaction.transactionHash,
            });
        } catch (err) {
            console.log(err);

            res.status(500).json(err);
        }
    });

router.get('/', async (req, res) => {
    const businesses = await prisma.business.findMany();

    res.render('index', {
        businesses,
    });
});

module.exports = router;
