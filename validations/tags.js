const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            bail: true,
            errorMessage: "Il nome del tag è obbligatorio"
        },
        isString: {
            bail: true,
            errorMessage: "Deve essere un testo"
        }
    }
};

module.exports = bodyData;