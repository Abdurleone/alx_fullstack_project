import express from 'express';
import request from 'supertest';
import roomRouter from '../routes/room.js'; // Adjust the path according to your project structure
import mockingoose from 'mockingoose';
import Room from '../models/Room.js'; // Adjust the path according to your project structure
import { verifyAdmin } from '../utils/verifyToken.js'; // Adjust the path according to your project structure

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/rooms', roomRouter); // Mount the room router on the '/rooms' path

// Mock the verifyAdmin middleware
jest.mock('../utils/verifyToken.js', () => ({
    verifyAdmin: jest.fn((req, res, next) => next()), // Allow all requests to pass through for testing
}));

describe('Room Routes', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockingoose.resetAll();
    });

    it('should create a new room', async () => {
        const roomData = {
            title: "Deluxe Room",
            price: 150,
            maxPeople: 2,
            desc: "A comfortable room for two.",
            roomNumbers: [{ number: 101, unavailableDates: [] }],
        };

        const hotelId = "someHotelId";

        // Mock room creation
        mockingoose(Room).toReturn(roomData, 'save');

        const response = await request(app)
            .post(`/rooms/${hotelId}`)
            .send(roomData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            title: roomData.title,
            price: roomData.price,
        });
    });

    it('should update a room', async () => {
        const roomId = "someRoomId";
        const updatedData = { title: "Updated Room" };

        // Mock room update
        mockingoose(Room).toReturn({ ...updatedData, _id: roomId }, 'findOneAndUpdate');

        const response = await request(app)
            .put(`/rooms/${roomId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: updatedData.title,
        });
    });

    it('should delete a room', async () => {
        const roomId = "someRoomId";
        const hotelId = "someHotelId";

        // Mock room deletion
        mockingoose(Room).toReturn({ _id: roomId }, 'findOneAndDelete');

        const response = await request(app)
            .delete(`/rooms/${roomId}/${hotelId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "Room deleted successfully",
        });
    });

    it('should get a room by ID', async () => {
        const roomId = "someRoomId";
        const roomData = {
            title: "Deluxe Room",
            price: 150,
            maxPeople: 2,
            desc: "A comfortable room for two.",
            roomNumbers: [{ number: 101, unavailableDates: [] }],
        };

        // Mock getting a room by ID
        mockingoose(Room).toReturn(roomData, 'findOne');

        const response = await request(app)
            .get(`/rooms/${roomId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: roomData.title,
        });
    });

    it('should get all rooms', async () => {
        const roomData = [
            { title: "Room 1", price: 100 },
            { title: "Room 2", price: 120 },
        ];

        // Mock getting all rooms
        mockingoose(Room).toReturn(roomData, 'find');

        const response = await request(app)
            .get('/rooms');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(roomData.length);
    });

    it('should update room availability', async () => {
        const roomId = "someRoomId";
        const availabilityData = { unavailableDates: [new Date()] };

        // Mock updating room availability
        mockingoose(Room).toReturn({ _id: roomId }, 'findOneAndUpdate');

        const response = await request(app)
            .put(`/rooms/availability/${roomId}`)
            .send(availabilityData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "Room availability updated successfully",
        });
    });
});