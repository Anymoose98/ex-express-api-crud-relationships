const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Il titolo è obbligatorio"
        },
        isString: {
            bail: true,
            errorMessage: "Deve essere una stringa"
        }
    },
    slug: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Lo slug è obbligatorio"
        },
        isString: {
            bail: true,
            errorMessage: "Deve essere un testo"
        }
    },
    content: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Il contenuto è obbligatorio"
        },
        isString: {
            bail: true,
            errorMessage: "Deve essere un testo"
        },
        isLength: {
            errorMessage: 'Il contenuto deve avere una lunghezza compresa tra 15 e 450 caratteri',
            options: { min: 15, max: 450 }
        }
    }
};

module.exports = bodyData;