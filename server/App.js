const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config();
const rateLimit = require('./middleware/rateLimit')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const path = require('path')


// const notFound = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);

// middleware 
app.use(cookieParser());
app.use(notFound);
app.use(errorHandler);
// app.use(rateLimit);

const port = process.env.PORT;
const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        const server = app.listen(port, ()=> console.log(`App is listening on port ${server.address().port}`));
    } catch(err){
        console.log(err)
    }
}

 
start()

