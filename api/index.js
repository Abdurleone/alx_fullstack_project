import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
const app = express()
dotenv.config()

const connect = async ()=>{
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB")
  } catch (error) {
    throw error;
  }
};

// listeners
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!!")
})

// api setup
app.get("/", (req,res)=>{
    res.send("Beginning of something spectacular")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB Connected!!")
})

//middlewares
app.use("/auth", authRoute)

app.listen(2704, ()=>{
    connect()
    console.log("Connected to backend!!")
})