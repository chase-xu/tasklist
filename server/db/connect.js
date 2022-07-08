

const mongoose = require('mongoose')
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const connectDB =(url)=>{
  return mongoose.connect(
    url).then(()=>console.log('Connected to the DB...'))
  .catch((err)=>{
    console.log(err)})
}

module.exports = connectDB

