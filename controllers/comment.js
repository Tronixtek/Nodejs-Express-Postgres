const knex = require("../db/db");
const jwt = require("jsonwebtoken")


exports.create_comment = (req,res)=>{
    //const bearerHeader = req.headers["authorization"];
    //const token = bearerHeader && bearerHeader.split(" ")[1]
    //let decode = jwt.verify(token,"Secret").email
    const new_comment = {
        comment:req.body.comment,
        article_id:req.params.id,
      //  created_by:decode

    }
    knex("comments")
    .insert(new_comment)
    .then(
        res.status(200).json({message:"comment created"})
        )
}