import express from 'express';
import request from 'supertest';
import userRouter from '../routes/user.js'; // Adjust the path according to your project structure
import mockingoose from 'mockingoose';
import User from '../models/User.js'; // Adjust the path according to your project structure

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/users', userRouter); // Mount the user router on the '/users' path

describe('User Routes', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockingoose.resetAll();
    });

    it('should update a user', async () => {
        const userId = 'someUserId';
        const updatedData = { username: 'updatedUser' };

        // Mock user update
        mockingoose(User).toReturn({ ...updatedData, _id: userId }, 'findOneAndUpdate');

        const response = await request(app)
            .put(`/users/${userId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            username: updatedData.username,
        });
    });

    it('should delete a user', async () => {
        const userId = 'someUserId';

        // Mock user deletion
        mockingoose(User).toReturn({ _id: userId }, 'findOneAndDelete');

        const response = await request(app)
            .delete(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: 'User deleted successfully',
        });
    });

    it('should get a user by ID', async () => {
        const userId = 'someUserId';
        const userData = {
            username: 'testUser',
            email: 'test@example.com',
            country: 'Testland',
            city: 'Test City',
            phone: '1234567890',
        };

        // Mock getting a user by ID
        mockingoose(User).toReturn(userData, 'findOne');

        const response = await request(app)
            .get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            username: userData.username,
        });
    });

    it('should get all users', async () => {
        const usersData = [
            { username: 'User1', email: 'user1@example.com' },
            { username: 'User2', email: 'user2@example.com' },
        ];

        // Mock getting all users
        mockingoose(User).toReturn(usersData, 'find');

        const response = await request(app)
            .get('/users');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(usersData.length);
    });
});