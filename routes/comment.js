const express = require("express");
const route = express.Router();
const commentController = require("../controllers/comment");


route.post(`/comment`,commentController.create_comment)



module.exports =route;