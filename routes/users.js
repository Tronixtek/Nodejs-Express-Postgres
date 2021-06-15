const express= require("express");
const usersController = require("../controllers/users")

const route = express.Router();




route.post("/auth/signin",usersController.userLogin);




module.exports = route;