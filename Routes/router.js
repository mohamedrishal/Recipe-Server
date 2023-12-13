const express = require('express')
const router = new express.Router()
const userController = require("../Controllers/userController")
const postController = require("../Controllers/postController")
const jwtMiddleware = require('../Middlewares/jwtMiddlewares')
const multerConfig = require('../Middlewares/multerMiddleware')

// register API
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// add-posts
router.post('/posts/add',jwtMiddleware,multerConfig.single('recipeImage'),postController.addPosts)


// getUserPosts
router.get('/user/all-posts',jwtMiddleware,postController.getUserPosts)

// getallPosts
router.get('/posts/all',jwtMiddleware,postController.getallUsersPosts)

// whopost
router.get('/user/:userid',userController.getWhoPost)

// edit posts 
router.put('/posts/edit/:id',jwtMiddleware,multerConfig.single("recipeImage"),postController.editPostController)

// delete posts 
router.delete('/posts/delete/:id',jwtMiddleware,postController.deletepostsController)

// edit user
router.put('/user/edit',jwtMiddleware,multerConfig.single("profile"),userController.editUser)


// like Post
router.post('/posts/like/:id',jwtMiddleware,postController.likePostController)

// unlike Post
router.post('/posts/unlike/:id',jwtMiddleware,postController.unlikePostController)




// export router
module.exports = router
