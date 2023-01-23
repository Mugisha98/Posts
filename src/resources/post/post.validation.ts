import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});

const update = Joi.object({
    title: Joi.string(),
    content: Joi.string()
});

export default {
    create,
    update
};