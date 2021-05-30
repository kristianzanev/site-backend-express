module.exports = class ParseBody  {
    constructor({ allowedFields = [] }) {
        this.allowedFields = allowedFields;
        this.checkFields = this.checkFields.bind(this);
    }

    checkFields (req, res, next) {
        try {
            const foreignField = Object.keys(req.body).find(field => !this.allowedFields.includes(field));

            if (foreignField) return res.status(400).json({ error: `Requesting a foreign field: ${foreignField}` });

            next()
        } catch(err) {
            res.status(400).json({ error: err.message })
        }
    }
}