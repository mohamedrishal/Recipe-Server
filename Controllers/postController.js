const posts = require("../Models/PostSchema");

// addPost
exports.addPosts = async (req, res) => {
  console.log("Inside add post Function");
  const userId = req.payload;
  const recipeImage = req.file.filename;
  // console.log(recipeImage);
  const { recipename, make,likes } = req.body;
  // console.log(`${userId} , ${recipename}, ${make} , ${recipeImage}`);
  try {
    const existingPosts = await posts.findOne({ make });
    if (existingPosts) {
      res.status(406).json(`Recipe already  Exists!! Uploads another`);
    }else{
        const newPosts = new posts({
            recipename,make,recipeImage,userId,likes
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
  const searchKey = req.query.search
  const query = {
    recipename:{$regex:searchKey , $options:"i"}
  }
  try{
    const allPosts = await posts.find(query)
    res.status(200).json(allPosts)
  }catch(err){
    res.status(401).json(err);
  }
}

// edit Post 
exports.editPostController = async (req,res)=>{
  // get Post id     
  const {id} = req.params
  const userId = req.payload
  const {recipename,make, recipeImage,likes} = req.body

  const uploadPostImage = req.file?req.file.filename : recipeImage

  try{

    const updatePost = await posts.findByIdAndUpdate({_id:id},{recipename,make,recipeImage:uploadPostImage,userId,likes},{new:true})
    await updatePost.save()
    res.status(200).json(updatePost)

  }catch(err){
    res.status(401).json(`Request failed Error : ${err}`)
  }

}

// delete posts
exports.deletepostsController = async (req,res)=>{

  const {id} = req.params
  try{
    const removePost = await  posts.findByIdAndDelete({_id:id})
    res.status(200).json(removePost)
  }catch(err){
    res.status(401).json(err)
  }
}

// like Post
exports.likePostController = async (req, res) => {
  const {id} = req.params
  const userId = req.payload //Assuming you have user authentication

  try {
    const post = await posts.findById(id);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// unlike post
exports.unlikePostController = async (req, res) => {
  const {id} = req.params
  const userId = req.payload // Assuming you have user authentication

  try {
    const post = await posts.findById(id);
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString()
      
      );
      await post.save();
    }
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

};


