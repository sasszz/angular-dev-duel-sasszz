import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9][a-zA-Z0-9-]*$/)
    .min(1)
    .max(39)
    .required()
});

export default userSchema;
