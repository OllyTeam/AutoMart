import Joi from 'joi';


const loginvalidation = {

  validation(user) {
    const uservalidation = {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(15).required()
    };

    return Joi.validate(user, uservalidation);
  },

};


export default loginvalidation;