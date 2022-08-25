const path=require('path')
const { v4: uuidv4 } = require('uuid');
const express=require("express")
const feedRoutes=require("./routes/feed")
require('dotenv').config()
const mongoose=require("mongoose")
const multer = require('multer')

const app=express()
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null, uuidv4()+ '-' + file.originalname)
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="image/png" ||
    file.mimetype==="image/jpg"){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/images",express.static(path.join(__dirname,"images")))

app.use(multer({storage:fileStorage,fileFilter:fileFilter})
.single('image'))

app.use("/feed",feedRoutes)
app.use((error,req,res,next)=>{
    console.log(error)
    const status=error.statusCode || 500
    const message=error.message

    res.status(status).json({message:message})
})
mongoose.connect(process.env.URL_MONGODB)
.then(app.listen(8080))
.catch(err=>console.log(err))


app.use((req,res,next)=>{
    res.setHeader(
        'Access-Control-Allow-Origin',
        // 'codepen.io',
        '*'
        )
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    )
    next();
})
