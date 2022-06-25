const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    from:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    url:{
        type: String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = mongoose.model('accounts',AccountSchema)
