const express = require("express");
const route = express.Router();
const auth = require("../services/auth/jwt");
const articleController = require("../controllers/article");
const upload = require("../multer");
//const {verify} = require("../services/helpers/verify");

route.get(`/feeds`,articleController.all_articles);

route.get(`/articles/:id`,articleController.one_article);

route.get(`/gif/:id`,auth,articleController.one_gif);

route.put(`/update/article/:id`,auth,articleController.update_article);

route.delete(`/del/article/:id`,auth,articleController.del_article);


route.post(`/articles/new`,auth,articleController.new_article);

route.use(`/new_gif`,auth,upload.array("image"),articleController.gif_upload);




module.exports = route;