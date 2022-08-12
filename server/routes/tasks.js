const express = require('express')
const router = express.Router()
const rateLimiterUsingThirdParty = require('../middleware/rateLimit')
const {getAllTasks, createTask,deleteTask } = require('../controller/tasks')



router.route('/').get(rateLimiterUsingThirdParty, getAllTasks) 
router.route('/create').post(rateLimiterUsingThirdParty, createTask)
router.route('/delete/:id').delete(rateLimiterUsingThirdParty, deleteTask)
 
module.exports = router 