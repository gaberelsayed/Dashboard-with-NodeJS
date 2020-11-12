const validator = require('../Utils/Validate');

const residentID = (req, res, next) => {
    const validationRule = {
        "residentID": "required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = residentID;