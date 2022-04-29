require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const userRegistrator = require('./services/UserRegistrator');
const smartContractService = require('./services/SmartContractService');

const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors({ origin: 'http://localhost:8081' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/iot', async (req, res) => {
    res.render('iot');
});

app.get('/device', async (req, res) => {
    res.render('device');
});

app.post(
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

app.get('/', async (req, res) => {
    const businesses = await prisma.business.findMany();

    res.render('index', {
        businesses,
    });
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
