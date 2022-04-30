const { validationResult } = require('express-validator');
const smartContractService = require('../services/SmartContractService');

exports.index = async (req, res) => {
    res.render('iot', {
        eventTypes: [
            {
                label: 'Temperature',
                value: 0,
            },
            {
                label: 'Humidity',
                value: 1,
            },
            {
                label: 'Pressure',
                value: 2,
            },
            {
                label: 'Speed',
                value: 3,
            },
            {
                label: 'Location',
                value: 4,
            },
        ],
    });
}

exports.send_event = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const transaction = await smartContractService.registerEvent(
            req.body.eventType,
            req.body.value,
            req.body.objectId,
        );

        res.status(200).json({
            txHash: transaction.transactionHash,
        });
    } catch (err) {
        console.log(err);
        
        res.status(500).json(err);
    }
}
