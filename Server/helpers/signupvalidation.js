import Joi from 'joi';


const signupvalidation = {

  validation(user) {
    const uservalidation = {
      first_name: Joi.string().min(2).max(25).required(),
      last_name: Joi.string().min(2).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(15).required(),
      is_admin: Joi.boolean(),
      address: Joi.string().required().max(25),
    };

    return Joi.validate(user, uservalidation);
  },

};


export default signupvalidation;