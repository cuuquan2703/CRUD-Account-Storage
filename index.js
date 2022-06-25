require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRouter = require('./routers/User')
const storageRouter= require('./routers/Storage')
const app =express()
const PORT = process.env.PORT
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const Connect = async() => {
    try{
       await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.b5tko.mongodb.net/?retryWrites=true&w=majority`,
       {
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
       )
        console.log("MongoDB Connected")
    }catch (e){
        console.log(e.message)
        process.exit(1)
    }
}
console.log("Connecting MongoDB . . .")
Connect()
app.get("/",(req,res)=>res.send("Hello World"))
app.use(express.json())
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/storage',storageRouter)
app.listen(PORT,()=>{console.log(`App running on ${PORT}`)})
