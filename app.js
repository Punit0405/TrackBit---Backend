const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


//Middlewares

//Server Creation
const app = express();


//Routing




// Server Listening
app.listen(process.env.PORT,()=>{
    console.log("TrackBit  Server Running on Port 5000");
})