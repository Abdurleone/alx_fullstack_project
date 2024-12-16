import mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import User from '../models/User.js'; // Adjust the path according to your project structure

describe('User Model', () => {
    beforeAll(() => {
        // Set up a connection to a test database if needed
        mongoose.connect('mongodb://localhost:2704/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const userData = {
            username: "testuser",
            email: "testuser@example.com",
            country: "Testland",
            city: "Test City",
            phone: "1234567890",
            password: "securepassword",
        };

        // Mock the `save` method of Mongoose
        mockingoose(User).toReturn(userData, 'save');

        const user = await User.create(userData);

        expect(user.username).toBe(userData.username);
        expect(user.email).toBe(userData.email);
        expect(user.country).toBe(userData.country);
        expect(user.city).toBe(userData.city);
        expect(user.phone).toBe(userData.phone);
    });

    it('should fail to create a user without required fields', async () => {
        const userData = {
            // Missing required fields: username, email, country, city, phone, password
        };

        mockingoose(User).toReturn(new Error('Validation failed'), 'save');

        try {
            await User.create(userData);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toMatch(/Validation failed/);
        }
    });

    it('should retrieve a user by ID', async () => {
        const userData = {
            _id: "507f191e810c19729de860ea",
            username: "testuser",
            email: "testuser@example.com",
            country: "Testland",
            city: "Test City",
            phone: "1234567890",
            password: "securepassword",
        };

        mockingoose(User).toReturn(userData, 'findById');

        const user = await User.findById("507f191e810c19729de860ea");

        expect(user._id.toString()).toBe(userData._id);
        expect(user.username).toBe(userData.username);
    });

    it('should update a user', async () => {
        const userData = {
            _id: "507f191e810c19729de860ea",
            username: "testuser",
            email: "testuser@example.com",
            country: "Testland",
            city: "Test City",
            phone: "1234567890",
            password: "securepassword",
        };

        const updatedData = { email: "updated@example.com" };

        mockingoose(User).toReturn({ ...userData, ...updatedData }, 'findByIdAndUpdate');

        const updatedUser = await User.findByIdAndUpdate("507f191e810c19729de860ea", updatedData, { new: true });

        expect(updatedUser.email).toBe("updated@example.com");
    });

    it('should delete a user', async () => {
        const userId = "507f191e810c19729de860ea";

        mockingoose(User).toReturn(userId, 'findByIdAndDelete');

        const result = await User.findByIdAndDelete(userId);

        expect(result).toBe(userId);
    });
});