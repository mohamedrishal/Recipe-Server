const express = require('express')
const router = new express.Router()
const userController = require("../Controllers/userController")

// register API
router.post('/user/register',userController.register)


// export router
module.exports = router
