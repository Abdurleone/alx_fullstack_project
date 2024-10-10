import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express()
dotenv.config()

const connect = async ()=>{
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("Conneted to MongoDB")
  } catch (error) {
    throw error;
  }
};

// listeners
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!!")
})

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB Connected!!")
})

app.listen(2704, ()=>{
    connect()
    console.log("Connected to backend!!")
})