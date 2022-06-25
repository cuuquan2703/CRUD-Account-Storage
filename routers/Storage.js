require('dotenv').config()
const express = require('express')
const router = express.Router()
const Storage = require("../models/Storage")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const algorithm ="aes-256-gmc"
const encrpt = require("../middleware/encypt")


//@POST /api/storage/create
//@private
router.post("/create",encrpt,async(req,res)=>{
    const {from,username,password,url} = req.body
    console.log("Encrypted Body:",req.body)
})

module.exports = router


