import Joi from 'joi'; 

import jwt from 'jsonwebtoken';

import bcrybt from 'bcrypt';

import users from '../models/users';

import signupvalidation from '../helpers/signupvalidation';

const signup = (req,res) => {
    const {error} =  signupvalidation.validation(req.body);

    if (error){
        return res.status(400).json({
            status:400,
            error:error.details[0].message
        })
    }
    else{
        const email= users.find(e => e.email == req.body.email);

        if (email){
            return res.status(409).json({
                status:409,
                error:'Email already exists'
            })
        }
        else{
            const newUser = {
                id : users.length+1,
                email : req.body.email,
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                password : bcrybt.hashSync(req.body.password, 10),
                address : req.body.address,
                is_admin : req.body.is_admin
            }

            const token = jwt.sign({id: newUser.id, email:newUser.email},'12345olly',{expiresIn:'5m'});
            newUser.token = token;
            users.push(newUser);
            delete newUser.password;
            return res.status(201).json({
                status:201,
                data:newUser
            })

        }
    }

}

export default signup