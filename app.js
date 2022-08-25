const express=require("express")
const feedRoutes=require("./routes/feed")
const app=express()
app.use(express.json());

app.use("/feed",feedRoutes)
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
app.listen(8080)