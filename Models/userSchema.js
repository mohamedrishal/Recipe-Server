const mongoose = require('mongoose')
const validator = require('validator')

// object create 
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        min : [3,`Must be at least 3, got {value}`]
    },
    email : {
        type : String,
        require : true,
        unique : true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password : {
        type : String,
        require : true
    },
    profile : {
        type : String,
    }

})


const users = mongoose.model("users",userSchema)
module.exports = users