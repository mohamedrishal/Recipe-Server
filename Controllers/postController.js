const posts = require("../Models/PostSchema");

// addPost
exports.addPosts = async (req, res) => {
  console.log("Inside add post Function");
  const userId = req.payload;
  const recipeImage = req.file.filename;
  // console.log(recipeImage);
  const { recipename, make } = req.body;
  // console.log(`${userId} , ${recipename}, ${make} , ${recipeImage}`);
  try {
    const existingPosts = await posts.findOne({ make });
    if (existingPosts) {
      res.status(406).json(`Recipe already  Exists!! Uploads another`);
    }else{
        const newPosts = new posts({
            recipename,make,recipeImage,userId
        })
        await newPosts.save()
        res.status(200).json(newPosts)
    }
  } catch (err) {
    res.status(401).json(`Request Failed,Error : ${err}`);
  }
};


// getUserPosts 
exports.getUserPosts = async (req,res)=>{
  const userId = req.payload
  try{
    const userPosts = await posts.find({userId})
    res.status(200).json(userPosts)
  }catch(err){
    res.status(401).json(err);
  }
}

// allPosts
exports.getallUsersPosts = async (req,res)=>{
  try{
    const allPosts = await posts.find()
    res.status(200).json(allPosts)
  }catch(err){
    res.status(401).json(err);
  }
}