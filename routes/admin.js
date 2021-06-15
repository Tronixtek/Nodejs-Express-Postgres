const express = require("express");
const route = express.Router()
const adminController = require("../controllers/admin");


route.post('/auth/admin/signin',adminController.admin_login)

route.post(`/create_users`,adminController.create_user);

//route.post(`/valid`,adminController.valid)

//route.delete(`/article-del`,adminController.del_post);

//route.delete(`/gif-del`,adminController.del_gif);

module.exports = route;