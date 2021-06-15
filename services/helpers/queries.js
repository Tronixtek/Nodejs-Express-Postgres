const knex = require("../../db/db")


module.exports = {
    getOne: (id)=>{
        return knex("users").where("id",id).first();
    },
    getUserEmail: (email)=>{
        return knex("users").where("email",email).first();
    },
    getAdminEmail:(email)=>{
        return knex("admin").where("email",email).first();
    },
    getGifById:(id)=>{
        return knex("gif_upload").where("id",id).first();
    },
    getUserId:(id)=>{
        return knex("users").where("id",id).first();
    }


}