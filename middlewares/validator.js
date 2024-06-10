const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');



module.exports = (schema) => {
    return [
        checkSchema(schema),
        (req, res, next) => {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors: errors.array()});
            }
            next();
        }
    ]
}



