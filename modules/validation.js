const {Joi} = require('../config/packagerequirement');
const {formatDate} = require('../modules/customfunction');

module.exports = {
    validateUserRegister: function validateUser(user) {
        const schema = {
            userName: Joi.string().min(3).max(20).regex(/^[A-Z a-z]*$/).required(),
            userAccount: Joi.string().alphanum().min(5).max(20).required(),
            email: Joi.string().email({minDomainSegments: 2}).required(),
            password: Joi.string().min(6).max(25).required(),
            teamName: Joi.string().min(3).max(30),
            DOB: Joi.string().min(10).max(10),
            isOver18: Joi.boolean()
        }
        return Joi.validate(user, schema);
    },
    validateUserLogin: function validateUser(user) {
        const schema = {
            userAccount: Joi.string().min(5).max(20).required(),
            password: Joi.string().min(6).max(25).required()
        }
        return Joi.validate(user, schema);
    },
    validateUserModify: function validateUser(user) {
        const schema = {
            userName: Joi.string().min(3).max(20).regex(/^[A-Z a-z]*$/),
            email: Joi.string().email({minDomainSegments: 2}),
            password: Joi.string().min(6).max(25),
            teamName: Joi.string().min(3).max(30),
            DOB: Joi.string().min(10).max(10)
        }
        return Joi.validate(user, schema);
    },
}