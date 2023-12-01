const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Successfully Connected with rbServer");
}).catch((err)=>{
    console.log(`MongoDB Connection failed !!! Error : ${err}`);
})