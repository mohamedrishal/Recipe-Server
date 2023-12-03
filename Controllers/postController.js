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
