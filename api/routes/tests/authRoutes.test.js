import express from 'express';
import request from 'supertest';
import authRouter from '../routes/auth.js'; // Adjust the path according to your project structure
import mockingoose from 'mockingoose';
import User from '../models/User.js'; // Adjust the path according to your project structure
import bcrypt from 'bcryptjs'; // Assuming you are using bcrypt for password hashing

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/auth', authRouter); // Mount the auth router on the '/auth' path

describe('Auth Routes', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockingoose.resetAll();
    });

    it('should register a new user', async () => {
        const userData = {
            username: "newuser",
            email: "newuser@example.com",
            password: "securepassword",
            country: "Testland",
            city: "Test City",
            phone: "1234567890",
        };

        // Mocking user creation
        mockingoose(User).toReturn(userData, 'save');

        const response = await request(app)
            .post('/auth/register')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            username: userData.username,
            email: userData.email,
        });
    });

    it('should login an existing user', async () => {
        const userData = {
            username: "existinguser",
            email: "existinguser@example.com",
            password: "securepassword",
            country: "Testland",
            city: "Test City",
            phone: "1234567890",
        };

        // Hash the password for the login
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Mock the user in the database
        mockingoose(User).toReturn({ ...userData, password: hashedPassword }, 'findOne');

        const response = await request(app)
            .post('/auth/login')
            .send({ email: userData.email, password: userData.password });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Assuming your login endpoint returns a token
    });

    it('should return error for invalid login', async () => {
        const userData = {
            email: "nonexistent@example.com",
            password: "wrongpassword",
        };

        // Mock the database query to return null
        mockingoose(User).toReturn(null, 'findOne');

        const response = await request(app)
            .post('/auth/login')
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
});