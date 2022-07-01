require("dotenv").config()
const crypto = require("crypto")
const iv = crypto.randomBytes(16);
const secretKey = process.env.KEY
//Encrype
const encrypt = (text,secretKey) => {
let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
 let cipher = crypto.createCipheriv('aes-256-cbc',key, iv);
 let encrypted = cipher.update(text,"utf-8","hex");
 encrypted +=cipher.final("hex")
    return { iv: iv.toString('hex'), content: encrypted.toString('hex') };}
;
const decrypt = (text,secretKey) => {

let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

let decryptedData = decipher.update(text, "hex", "utf-8");

decryptedData += decipher.final("utf8");
    return decryptedData
};

const encrpt = (req,res,next) =>{
    try{
        let {password} = req.body
        
        const data = encrypt(password,secretKey)
        console.log("encryptedData", data)
        console.log("De",decrypt(data.content,secretKey))  
        req.body.password = data.content
        next()
    }catch(e){
        console.log(e.message)
    }
}

module.exports = encrpt
