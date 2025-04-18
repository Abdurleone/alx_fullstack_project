import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import winston from "winston"

const app = express()
dotenv.config()

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

logger.info("Application started");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB, retrying in 5 seconds...");
    setTimeout(connect, 5000); // Retry after 5 seconds
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

app.listen(2704, ()=>{
    connect()
    console.log("Connected to backend!!")
})