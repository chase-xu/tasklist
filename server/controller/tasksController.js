const Task = require('../model/Task')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllTasks = asyncWrapper (async (req, res)=>{
    const tasks = await Task.find({})
    res.status(200).json(tasks)
}) 

const createTask = asyncWrapper(async (req, res)=>{
    try{
        const task = await Task.create(req.body)
        //limit the task amout to 8
        // if (task.length > 8) return res.status(400).json({'status': 'error', message: 'Amount of Tasks exceeded 8.'});
        res.status(200).json({'status': 'success', data: {task, number: task.length}})
    
    } catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
    
})

const deleteTask = asyncWrapper( async (req, res, next)=>{
    const id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id: id})
        if(!task){
            const error = new Error(`Deleting task not exist with id: ${id}`)
            error.status = 404
            return next(error)
        }
        res.status(200).json({'status': 'success', data: task})
    }catch(err){
        console.log(err)
    }
    
} )

module.exports = { 
    getAllTasks,
    createTask,
    deleteTask,
}