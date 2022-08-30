module.exports = function (joi, payload) {
    const schema = joi.object().keys({
        name: joi.string(),
        type: joi.string(),
        order: joi.number()
    }).required();

    return schema.validate(payload);
};