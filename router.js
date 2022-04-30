const express = require('express');
const { body } = require('express-validator');
const adminController = require('./controllers/adminController');
const deviceController = require('./controllers/deviceController');
const iotController = require('./controllers/iotController');

const router = express.Router();

router.get('/iot', iotController.index);
router.post(
    '/iot/events',
    body('objectId').trim().isString().notEmpty(),
    body('eventType').isInt().notEmpty(),
    body('value').trim().isString().notEmpty(),
    iotController.send_event
);

router.post('/device/generate-keypair', deviceController.generate_keypair);
router.post(
    '/device',
    body('address').trim().isEthereumAddress().notEmpty(),
    deviceController.add_new
);
router.get('/device', deviceController.index);

router.post(
    '/admin',
    body('username').trim().notEmpty().isEmail(),
    body('businessId').isInt().notEmpty(),
    adminController.create_new,
);
router.get('/', adminController.index);

module.exports = router;
