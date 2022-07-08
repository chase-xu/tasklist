const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Must provide task text'],
        trim: true,
        maxlength: [50, 'Task text should not be more than 50 characters']
    }
})

module.exports = mongoose.model('Task', TaskSchema) 