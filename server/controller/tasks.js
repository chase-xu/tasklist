const Task = require('../model/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
// const next = require('express')

const getAllTasks = asyncWrapper (async (req, res)=>{

    const tasks = await Task.find({})
    res.status(200).json(tasks)
    
})

const createTask = asyncWrapper(async (req, res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({'status': 'success', data: {task, number: task.length}})

})

const deleteTask = asyncWrapper( async (req, res, next)=>{
    
    console.log(req.params)
    const id = req.params.id
    const task = await Task.findOneAndDelete({_id: id})
    console.log(task)
    if(!task){
        const error = new Error(`Deleting task not exist with id: ${id}`)
        error.status = 404
        return next(error)
    }
    res.status(200).json({'status': 'success', data: task})
} )

module.exports = { 
    getAllTasks,
    createTask,
    deleteTask,
}