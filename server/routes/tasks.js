const express = require('express')
const router = express.Router()
const rateLimiterUsingThirdParty = require('../middleware/rateLimit')
const {getAllTasks, createTask,deleteTask } = require('../controller/tasks')



router.route('/').get(getAllTasks, rateLimiterUsingThirdParty) 
router.route('/create').post(createTask, rateLimiterUsingThirdParty)
router.route('/delete/:id').delete(deleteTask, rateLimiterUsingThirdParty)
 
module.exports = router 