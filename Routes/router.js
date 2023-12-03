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



// export router
module.exports = router
