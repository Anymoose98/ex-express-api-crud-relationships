const { validationResult } = require('express-validator');
const { checkSchema } = require('express-validator');

// app.get('/ciao', query('nome').notEmpty(), (req, res) => {

// const result = validationResult(req);

// if (result.isEmpty()) {
// return res.send(`Ciao, ${req.query.nome}!`);
// }

// res.send({ errors: result.array() });
// });

module.exports = (schema) => {

    return (req, res, next) => {
        checkSchema(schema)(req, res, () => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors });
            }
            next();
        });
    };
};
