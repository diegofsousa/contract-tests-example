module.exports = function (joi, payload) {
    const schema = joi.object().keys({
        name: joi.string(),
    }).required();

    return schema.validate(payload);
};