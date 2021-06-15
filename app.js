require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/article");
const adminRoute = require("./routes/admin");
const commentRoute = require("./routes/comment");


const api = process.env.api

app.use(express.urlencoded({extended:false}));
app.use(express.static("../public"));
app.use(express.json());
app.use(morgan("tiny"));

app.use(`${api}/`,usersRouter);
app.use(`${api}/`,articlesRouter);
app.use(`${api}/`,adminRoute);
app.use(`${api}/`,commentRoute);
  
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        message:err.message,
        
    })
next()
})

 let PORT = 5000;
module.exports = app.listen(PORT,console.log(`Server Running on ${PORT}...`))
