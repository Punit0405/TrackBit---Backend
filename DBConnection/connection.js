const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("Connected To Trackbit Database")).catch((err)=>{console.log(err)});