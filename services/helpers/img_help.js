const multer = require("multer");

//set storage engine
const storage = multer.diskStorage({
    destination:"../public/upload",
    filename:function (req,file,cb){
        cb(null,file.fieldname + '-' + Date.now()+ 
        path.extname(file.originalname));

    }

});

//init upload
module.exports = {
    upload : multer({
        storage:storage
        }).single("my_image")
}