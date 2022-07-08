const Task = require('../model/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
const { nextTick } = require('vue')

const getAllTasks = asyncWrapper (async (req, res)=>{
    // try{
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    // } catch (err){
    //     res.status(500).json({msg: err})
    // }
    
})

const createTask = asyncWrapper(async (req, res)=>{

    const task = await Task.create(req.body)
    res.status(201).json({'status': 'success', data: {task, number: task.length}})

})

const deleteTask = asyncWrapper( async (req, res)=>{
    
    const id = req.params.id
    const task = await Task.findOneAndDeleteOne({_id: id})
    if(!task){
        const error = new Error(`Deleting task not exist with id: ${id}`)
        error.status = 404
        return nextTick(error)
        // return res.status(404).json({msg: `Deleting task not exist with id: ${id}`})
    }
    // }catch(err){
    //     res.status(500).json({msg: err})
    // }
} )

module.exports = { 
    getAllTasks,
    createTask,
    deleteTask,
}