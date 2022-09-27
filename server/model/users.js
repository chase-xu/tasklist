const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Must provide user anme'],
    },
    salt: {
        type: String,
        require: [true, 'Must provide salt']
    },
    password: {
        type: String,
        require: [true, 'Must have hashed password']
    }
}, {timestamps: true})

module.exports = mongoose.model('Users', UserSchema) 