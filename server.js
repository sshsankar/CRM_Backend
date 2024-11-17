const express = require('express');
const mongoose = require('mongoose');
const routes = require('./define.js');
var cors = require('cors')
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors())
const uri="mongodb+srv://varadagowrishankar:Gowrishankar@cluster0.e4hxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect('mongodb+srv://varadagowrishankar:Gowrishankar@cluster0.e4hxm.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("db connected"));

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });

// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       const dbconn=await client.db("test").collections()
//       console.log(dbconn)
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);


app.use('/api', routes);


app.listen(PORT, (error) =>{console.log("error or running")}
    
);
