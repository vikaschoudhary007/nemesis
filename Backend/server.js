const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

// Server Config

const app = express()
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors({
  origin:["http://presale.nemesisdownfall.com/", "http://admin.nemesisdownfall.com/"],
  methods:['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

// connecting mongodb ******* change the mongodb connection ID in the .env file **********************
mongoose.connect(process.env.MDB_CONNECT, 
  (err) => {
    if(err){
      return console.log(err)
    }
    console.log("Connected to MongoDB")
})

// calling apis
app.use("/api", require("./routers/userRouter"));

app.listen(PORT, () => {
  console.log(`Server listening on PORT : ${PORT}`);
})