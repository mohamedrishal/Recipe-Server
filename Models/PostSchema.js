const mongoose = require('mongoose')


// object create 
const postSchema = new mongoose.Schema({
    recipename : {
        type : String,
        require : true
    },
    make : {
        type : String,
        require : true
    },
    recipeImage : {
        type : String,
        require : true
    },
    userId:{
        type:String,
        require:true
    }
 

})


const posts = mongoose.model("posts",postSchema)
module.exports = posts