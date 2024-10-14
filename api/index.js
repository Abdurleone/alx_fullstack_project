import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
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

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)

app.listen(2704, ()=>{
    connect()
    console.log("Connected to backend!!")
})