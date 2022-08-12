const express = require('express')
const router = express.Router()
const rateLimiterUsingThirdParty = require('../middleware/rateLimit')
const {getAllTasks, createTask,deleteTask } = require('../controller/tasks')



router.route('/').get(getAllTasks) 
router.route('/create').post(createTask)
router.route('/delete/:id').delete(deleteTask)
 
module.exports = router 