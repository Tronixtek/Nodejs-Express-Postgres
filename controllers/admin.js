const {knex} = require("../db/db");
const find = require("../services/helpers/queries");
const {signupValidation,loginValidation} = require("../services/helpers/validation");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");





exports.admin_login = (req,res,next)=>{
    if(loginValidation(req.body)){
    find.getAdminEmail(req.body.email).then(
        async (user)=>{
            if(!user){
                //this is an unknown email

                next(new Error("Login Failed"))
            }else{
                //compare password
               await bcrypt.compare(req.body.password,user.admin_password).then(
                   (result)=>{
                       if(result){
                           //set the jwt
                           let token = jwt.sign({email:user.email},"Secret",{expiresIn:"24h"});
                            res.status(200).json({
                                token:token,
                                message:"logging in",
                            })                      
                }else{
                    next(new Error("Invalid Username or Password"))
                }
                   }
               )

            }
        }
    )}else{
     //   next(new Error("Invalid User"))
    }
          
}


exports.create_user =  (req,res,next)=>{
    if(signupValidation(req.body)){
        find.getUserEmail(req.body.email).then(
            async (user)=>{
                if(!user){
                    //this is a new email
                    //hash the password
                    //insert to database
                    //redirect to login
                    const password = await bcrypt.hash(req.body.password,10);
                    const new_user ={
                        first_name:req.body.first_name,
                        last_name:req.body.last_name,
                        email:req.body.email,
                        gender:req.body.gender,
                        job_role:req.body.job_role,
                        department:req.body.department,
                        address:req.body.address,
                        password:password     
                   }
                    knex("users").insert(new_user)
                    .then(
                     res.json({
                       message:"Employee Has Been Added Successfully"  
                   })
                    )
                }else{
                    next(new Error("Email Already Registered"))
                }
           
            }
        )
        
}else{
    next(new Error("Some Fields Are Missing"));
}
}




