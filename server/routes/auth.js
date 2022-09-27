const express = require('express')
const router = express.Router()
const rateLimiterUsingThirdParty = require('../middleware/rateLimit')
const authMiddleWare = require('../middleware/authMiddleware')
const {login} = require('../controller/authController');



// router.route('/register').post(authMiddleWare, rateLimiterUsingThirdParty)
router.route('/login').post(authMiddleWare, rateLimiterUsingThirdParty, login)
 
module.exports = router