require("dotenv").config()
const express = require("express")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

const SIGN = process.env.SIGN
console.log(SIGN)

//@route POST api/auth/register
//@acess Public
router.post("/register",async(req,res)=>{
    const {username,password,retypePassword} = req.body

    if(!username || !password || ! retypePassword){
        return res.status(400).json({
            success: false,
            message: 'missing username or password'
        })
    }else if (retypePassword != password){
        return res.status(400).json({
            success:false,
            message:'Retype password doesnt match'
        })
    }

    try{
        const user = await User.findOne({username})
        
        if(user){
            return res.status(400).json({
                success:false,
                message:'username has already exist'
            })
        }
        const Hashed = await argon2.hash(password)

        const newUser = new User({
            username,
            password: Hashed
        })

        newUser.save()

        const token = jwt.sign({userId:newUser._id},SIGN)
        return res.status(200).json({
            success: true,
            message: newUser,
            token
        })
    }catch(e){
        console.log(e.message)
    }
})


//@route POST /api/auth/login
//@acess Public
router.post("/login",async (req,res)=>{
    const {username,password} = req.body

    console.log("username",username)
    console.log("pass",password)
    if (!username || !password){
        return res.status(400).json({
            success:false,
            message: 'missing username or password'
        })
    }

    try{
        const user = await User.findOne({username})
        console.log("user",user)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username"
            })
        }
            const checkPassword = await argon2.verify(user.password,password)
            console.log("checkPassword",checkPassword)
            if (!checkPassword){
                return res.status(400).json({
                    success:false,
                    message: "Incorrect passwpord"
                })
            }

            const token = jwt.sign({userId:user._id},SIGN)
            return res.status(200).json({
                success: true,
                message: user,
                token
            })
    }catch(e){
        console.log("Message:",e.messsage)
    }
})

module.exports = router
