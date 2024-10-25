import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET a hotel by ID
router.get("/find/:id", getHotel);

// GET all hotels
router.get("/", getHotels);

// GET count of hotels by city
router.get("/countByCity", countByCity);

// GET count of hotels by type
router.get("/countByType", countByType);

// GET hotel rooms by hotel ID
router.get("/room/:id", getHotelRooms);

export default router;
