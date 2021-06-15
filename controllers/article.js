const knex = require("../db/db");
const {articleValidation} = require("../services/helpers/validation")

const cloudinary = require("../cloudinary");
const fs = require("fs")
const jwt = require("jsonwebtoken")


exports.all_articles = (req,res)=>{
    knex
    .select()
    .from("articles")
    .then(
        (articles)=>{
            res.json(articles)
            
        }
     
    )
    
}
exports.one_article = (req,res)=>{
    knex
    .select()
    .from("articles")
    .where("id",req.params.id)
    .then(
        (article)=>{
            if(!article){
                return res.send({message:"Article Not Found"})
            }     res.send(article)
        }
    )
}

exports.one_gif = (req,res)=>{
    knex.select()
        .from("gif_upload")
        .where("id",req.params.id)
        .then(
            (gif)=>{
                if(!gif){
                    return res.status(401).json({message:"Image Not Found"})
                }
            }
        )
}


exports.new_article =  (req,res)=>{
  

    if(articleValidation(req.body)){
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1]
    let decode = jwt.verify(token,"Secret").email; 
    console.log(decode)
        knex("articles").insert({
            title:req.body.title,
            article:req.body.article,
            Created_by: decode
        }).then(
                res.json({message:"Article created"})
        )
    }else{
        res.json({message:"Cannot Submit Article with Empty Fields"})
    }
   }


exports.del_article = (req,res)=>{
    knex("articles").delete().where("id",req.params.id).then(
        (res.send({message:"Article Deleted"}))
    )
}


exports.update_article = (req,res)=>{
    if(articleValidation(req.body)){
     knex("articles")
    .update(
        {
            title:req.body.title,
            article:req.body.article,
        }
    )
    .where("id",req.params.id).then(
        res.json({message:"Article Updated"})
    )
}}


exports.gif_upload = async(req,res)=>{
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1]
    let decode = jwt.verify(token,"Secret").email; 
    console.log(decode)
    const uploader = async (path)=> await cloudinary.upload(path,"images")
    if(req.method === "POST"){
        const urls = []

        const files = req.files
        if(files){
        for (const file of files){
            const {path} = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
           
        }
        console.log(urls)
        knex("gif_upload")
        .insert({
            title:req.body.title,
            url:urls[0],
            Created_by: decode
        }).then(
            res.status(200).json({
                message:"images Uploaded Successfully",
                data:urls
            })
        )
    
    }
   
}else{
    res.status(405).json({
        err:"images not uploaded"
    })
}

}

exports.del_gif = (req,res)=>{
    knex("gif_upload")
    .delete()
    .where("id",req.params.id)
    .then((gif)=>{
        if(!gif){
            return res.json({message:"Image not found"})
        }
        res.json({message:"Image Deleted"})
    })}
    