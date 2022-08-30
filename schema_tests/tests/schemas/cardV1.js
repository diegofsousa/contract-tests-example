module.exports = function (joi, payload) {
    const schema = joi.object().keys({
        id: joi.number(),
        name: joi.string(),
        fee: joi.string(),
        details: joi.object().keys({
            type: joi.string(),
            active: joi.boolean(),
            days: joi.number(),
        })
    }).required();

    return schema.validate(payload);
};