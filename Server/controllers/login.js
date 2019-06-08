import Joi from 'joi'; 

import jwt from 'jsonwebtoken';

import bcrybt from 'bcrypt';

import users from '../models/users';

import loginvalidation from '../helpers/loginvalidation';

const login = (req,res) => {
    const {error} =  loginvalidation.validation(req.body);

    if (error){
        return res.status(400).json({
            status:400,
            error:error.details[0].message
        })
    }
    else{
        const user = users.find(e => e.email == req.body.email);
        console.log(user);
        if (!user){
            return res.status(401).json({
                status:401,
                error:'please check your email and try again'
            })
        }
        else{
            const checkpassword = bcrybt.compareSync(req.body.password.trim(), user.password);
            
            if (checkpassword){
                const token = jwt.sign({id: user.id, email:user.email},'12345olly',{expiresIn:'10m'});
                user.token = token;
                delete user.password;
                return res.status(200).json({
                status:200,
                data:user
                })
            }
            else{
                return res.status(401).json({
                    status:401,
                    error:'please check password and try again'
                });
            }

            
        }
    }

}

export default login