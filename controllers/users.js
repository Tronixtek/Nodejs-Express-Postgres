require("dotenv").config();
//const knex = require("../db/db");
const bcrypt = require("bcrypt");
const {loginValidation} = require("../services/helpers/validation");
const find = require("../services/helpers/queries");
const jwt = require("jsonwebtoken");


//exports.create_user = async (req,res)=>{
//   
//     }

exports.userLogin = (req,res,next)=>{
    if(loginValidation(req.body)){
   find.getUserEmail(req.body.email).then(
       (user)=>{
           if(!user){
               res.status(401).json({message:"Email Does't Exist SignUp"})
           }else{
               //compare password
               bcrypt.compare(req.body.password,user.password).then(
                   (result)=>{
                       if(result){
                            //sign token
                            console.log(result)
                           let token = jwt.sign({email:user.email,name:user.first_name},"Secret",{expiresIn:"24h"});
                           res.json({
                               token:token,
                               message:"loggin..."
                            })
                       }else{
                           res.status(501).json({message:"Invalid Username or Password"})
                       }
                   }
               )
           }
       }
   )
    }else{
        next(new Error("Invalid User"))
    }
}

