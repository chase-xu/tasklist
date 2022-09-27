const express = require('express')
const router = express.Router()
const rateLimiterUsingThirdParty = require('../middleware/rateLimit')
const {getAllTasks, createTask,deleteTask } = require('../controller/tasksController')
const authMiddleWare = require('../middleware/authMiddleware')





router.route('/').get(authMiddleWare, rateLimiterUsingThirdParty, getAllTasks)
router.route('/create').post(authMiddleWare, rateLimiterUsingThirdParty, createTask)
router.route('/delete/:id').delete(authMiddleWare, rateLimiterUsingThirdParty, deleteTask)
 
module.exports = router