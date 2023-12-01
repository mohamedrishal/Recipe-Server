const express = require('express')
const router = new express.Router()
const userController = require("../Controllers/userController")

// register API
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)




// export router
module.exports = router
