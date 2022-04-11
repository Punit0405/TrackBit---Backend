const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors')
require('./DBconnection/connection');
const userRoutes=require('./Routes/userRouting')


//Server Creation
const app = express();

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }))

//Routing
app.use('/api/v1',userRoutes)

// Server Listening
app.listen(process.env.PORT,()=>{
    console.log("TrackBit  Server Running on Port 5000");
})