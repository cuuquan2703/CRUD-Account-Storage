require('dotenv').config()
const express = require('express')
const router = express.Router()
const Storage = require("../models/Storage")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const algorithm ="aes-256-gmc"
const encrpt = require("../middleware/encypt")
const verifytoken = require("../middleware/verifyToken")

//@POST /api/storage/create
//@private
router.post("/create",verifytoken,encrpt,async(req,res)=>{
    const {from,username,password,url} = req.body
    console.log("Encrypted Body:",req.body)

    if (!from  || !username || !password){
        return res.status(400).json({
            success:false,
            message:"Missing information"
        })
    }

    try {
        const newAccount = new Storage({
            from,
            username,
            password,
            url: url.startsWith('https://') ? url : `https://${url}`,
            user:req.userId
        })

        await newAccount.save()
        return res.status(200).json({
            success: true,
            message: newAccount
        })

    }catch(e){ 
        res.status(400).json({
            success: false,
            message:e.message
        })
    }
})

router.get("/",verifytoken,async(req,res)=>{
    try{
        const userId = req.userId
        const accounts = await Storage.find({user:userId}).populate('user',['_id','username'])
        return res.json({
            success: true,
            message: accounts
        })    
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
})

router.put("/update/:id",verifytoken,encrpt,async(req,res)=>{
    const {from,username,password,url} = req.body
    const userId = req.userId
    try{
        if (!userId){
            return res.json({
                success:false,
                message:"unauthorize"
            })
        }
            let UpdateInformation = {
                from,
                username,
                password,
                url: url.startsWith('https://') ? ur : `https:\\${url}`
            }
            UpdateInformation = await Storage.findOneAndUpdate({_id:req.params.id,user:userId},UpdateInformation,{new:true})
            res.json({
                success:true,
                message:UpdateInformation
            })
    }catch(e){
        res.json({
            success:false,
            message:e.message
        })
    }
})

router.delete("/delete/:id",verifytoken,async(req,res)=>{
    try {
        const DeleteOne = await Storage.findOneAndDelete({_id:req.params.id,user:req.userId})
        if (!req.userId){
            return req.json({
                success:false,
                message:"unauthorized"
            })
        }
        res.json({
            success:true,
            message:DeleteOne
        })
    }catch(e){
        res.json({
            success:false,
            message:e.message
        })
    }
})
module.exports = router


