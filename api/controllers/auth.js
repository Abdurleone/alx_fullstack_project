import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res, next) => {
    try {
        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new user instance
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        // Save the user to the database
        await newUser.save();
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    }
};

// Login a user
export const login = async (req, res, next) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Incorrect Username/Password"));

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);

        // Destructure the user details, excluding password and isAdmin
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Set the cookie and respond with user details
        res.cookie("access_token", token, {
            httpOnly: true, // Helps mitigate the risk of client-side script accessing the token
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};