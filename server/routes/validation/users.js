import Joi from "joi";

const usersSchema = Joi.object({
  username: Joi.alternatives()
    .try(Joi.array().items(Joi.string().min(1)).min(1), Joi.string().min(1))
    .required(),
});

export default usersSchema;
