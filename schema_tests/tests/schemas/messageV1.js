module.exports = function (joi, payload) {
    const schema = joi.object().keys({
        fee: joi.number(),
    }).required();

    return schema.validate(payload);
};