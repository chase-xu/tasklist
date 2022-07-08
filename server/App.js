const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/notfound')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config();
const rateLimit = require('./middleware/rateLimit')
// const notFound = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware 

app.use(express.static('../public'));
app.use(express.json());

// // routes

app.use('/api/v1/tasks', tasks);
app.use(notFound)
app.use(errorHandler)
app.use(rateLimit)

// app.use(notFound);
// app.use(errorHandlerMiddleware);
// const port = process.env.PORT || 5000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => 
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();


const port = process.env.PORT || 8000;

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=> console.log(`App is listening on port ${port}`));
    } catch(err){
        console.log(err)
    }
}

 
start()

