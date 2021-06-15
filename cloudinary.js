const cloudinary = require("cloudinary")

const dotenv = require("dotenv")

dotenv.config();

cloudinary.config({
    cloud_name:"tronix",
    api_key:"265764383312737",
    api_secret:"2H1m63HHm4RJhXXiH2XvckGv5dU"
})

exports.upload = (file,folder)=>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file,(result)=>{
            resolve({
                url:result.url,
                id:result.public_id
            })

        },{
            resource_type:"auto",
            folder:folder 
        }
        )
    })
}