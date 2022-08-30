module.exports = function (joi, payload) {
    const schema = joi.object().keys({
        text: joi.string(),
    }).required();

    return schema.validate(payload);
};