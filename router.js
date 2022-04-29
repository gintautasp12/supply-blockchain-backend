const express = require('express');
const { body } = require('express-validator');
const adminController = require('./controllers/adminController');
const deviceController = require('./controllers/deviceController');
const iotController = require('./controllers/iotController');

const router = express.Router();

router.get('/iot', iotController.index);

router.post('/device/generate-keypair', deviceController.generate_keypair);
router.get('/device', deviceController.index);

router.post(
    '/admin',
    body('username').not().isEmpty().trim(),
    body('username').isEmail(),
    body('businessId').isInt().not().isEmpty(),
    adminController.create_new,
);
router.get('/', adminController.index);

module.exports = router;
