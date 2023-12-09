// import model
const users = require("../Models/userSchema");
// import jsonwebtoken 
const jwt = require('jsonwebtoken')

// register
exports.register = async (req, res) => {
  console.log("Inside Register Controller Function");
  const { username, email, password } = req.body;
  // console.log(`username : ${username} , email : ${email}, password : ${password}`);

  try {
    const existingUser = await users.findOne({ email: email });

    if (existingUser) {
      res.status(406).json("Account Already Exist!!!  Please Login...");
    } else {
      // model object
      const newUser = new users({ username, email, password, profile: "" });

      // store mongoDB
      await newUser.save();

      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`Register API Failed, Error: ${err}`);
  }
};

// Login
exports.login = async (req, res) => {
  console.log("Inside Login Controller Function");
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({email,password});

    if (existingUser) {
      
      const token = jwt.sign({userId:existingUser._id},"supersecretkeyrecipebook12")

      res.status(200).json({
        existingUser,token
      })

    } else {
      res.status(404).json("Incorrect Email Or Password 🤔");
    }
  } catch (err) {
    res.status(401).json(`Login api failed, Error : ${err}`)
  }

};

// getwhoPost
exports.getWhoPost = async (req,res)=>{
  const findUser = req.params.userid
  try{
    const userPosts = await users.findById(findUser)
    res.status(200).json(userPosts)
  }catch(err){
    res.status(401).json(err);
  }
}

// edit user 

exports.editUser = async (req,res)=>{

  const userId = req.payload
  
  const {username,email,password,profile} = req.body
  const uploadImage = req.file?req.file.filename:profile

  try{
    const updatedUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,profile:uploadImage},{new:true})
    await updatedUser.save()
    res.status(200).json(updatedUser)
  }catch(err){
    res.status(401).json(err)
  }

}