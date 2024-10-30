import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price is a positive number
    },
    maxPeople: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one person can stay
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ 
      number: Number, 
      unavailableDates: { type: [Date] }
    }],
    type: {
      type: String,
      enum: ['single', 'double', 'suite'],
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);