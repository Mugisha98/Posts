import Joi from "joi";

const register = Joi.object({
    nameFirst: Joi.string().max(30).required(),
    nameLast: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const update = Joi.object({
    nameFirst: Joi.string().max(30).required(),
    nameLast: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export default {
    register,
    login,
    update,
};