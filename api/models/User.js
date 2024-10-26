import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },  // Ensure this field is defined
    city: { type: String, required: true },   // Ensure this field is defined
    country: { type: String, required: true }, // Ensure this field is defined
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
