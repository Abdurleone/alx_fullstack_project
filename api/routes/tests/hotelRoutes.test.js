import express from 'express';
import request from 'supertest';
import hotelRouter from '../routes/hotel.js'; // Adjust the path according to your project structure
import mockingoose from 'mockingoose';
import Hotel from '../models/Hotel.js'; // Adjust the path according to your project structure
import { verifyAdmin } from '../utils/verifyToken.js'; // Adjust the path according to your project structure

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/hotels', hotelRouter); // Mount the hotel router on the '/hotels' path

// Mock the verifyAdmin middleware
jest.mock('../utils/verifyToken.js', () => ({
    verifyAdmin: jest.fn((req, res, next) => next()), // Allow all requests to pass through for testing
}));

describe('Hotel Routes', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        mockingoose.resetAll();
    });

    it('should create a new hotel', async () => {
        const hotelData = {
            name: "Test Hotel",
            type: "Luxury",
            city: "Test City",
            address: "123 Test St",
            distance: "5km",
            photos: ["photo1.jpg", "photo2.jpg"],
            title: "Best Hotel",
            desc: "A great place to stay.",
            rating: 4.5,
            rooms: ["Room1", "Room2"],
            cheapestPrice: 100,
            featured: true,
        };

        // Mock hotel creation
        mockingoose(Hotel).toReturn(hotelData, 'save');

        const response = await request(app)
            .post('/hotels')
            .send(hotelData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject({
            name: hotelData.name,
            type: hotelData.type,
        });
    });

    it('should update a hotel', async () => {
        const hotelId = "someHotelId";
        const updatedData = { name: "Updated Hotel" };

        // Mock hotel update
        mockingoose(Hotel).toReturn({ ...updatedData, _id: hotelId }, 'findOneAndUpdate');

        const response = await request(app)
            .put(`/hotels/${hotelId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            name: updatedData.name,
        });
    });

    it('should delete a hotel', async () => {
        const hotelId = "someHotelId";

        // Mock hotel deletion
        mockingoose(Hotel).toReturn({ _id: hotelId }, 'findOneAndDelete');

        const response = await request(app)
            .delete(`/hotels/${hotelId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            message: "Hotel deleted successfully",
        });
    });

    it('should get a hotel by ID', async () => {
        const hotelId = "someHotelId";
        const hotelData = {
            name: "Test Hotel",
            type: "Luxury",
            city: "Test City",
            address: "123 Test St",
            distance: "5km",
            photos: ["photo1.jpg", "photo2.jpg"],
            title: "Best Hotel",
            desc: "A great place to stay.",
            rating: 4.5,
            rooms: ["Room1", "Room2"],
            cheapestPrice: 100,
            featured: true,
        };

        // Mock getting a hotel by ID
        mockingoose(Hotel).toReturn(hotelData, 'findOne');

        const response = await request(app)
            .get(`/hotels/find/${hotelId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            name: hotelData.name,
        });
    });

    it('should get all hotels', async () => {
        const hotelData = [
            { name: "Test Hotel 1" },
            { name: "Test Hotel 2" },
        ];

        // Mock getting all hotels
        mockingoose(Hotel).toReturn(hotelData, 'find');

        const response = await request(app)
            .get('/hotels');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(hotelData.length);
    });

    it('should count hotels by city', async () => {
        const countData = [
            { city: "Test City", count: 5 },
            { city: "Another City", count: 3 },
        ];

        // Mock counting hotels by city
        mockingoose(Hotel).toReturn(countData, 'aggregate');

        const response = await request(app)
            .get('/hotels/countByCity');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(countData);
    });

    it('should count hotels by type', async () => {
        const countData = [
            { type: "Luxury", count: 5 },
            { type: "Budget", count: 3 },
        ];

        // Mock counting hotels by type
        mockingoose(Hotel).toReturn(countData, 'aggregate');

        const response = await request(app)
            .get('/hotels/countByType');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(countData);
    });

    it('should get rooms for a hotel', async () => {
        const hotelId = "someHotelId";
        const roomData = [
            { number: 101, unavailableDates: [] },
            { number: 102, unavailableDates: [new Date()] },
        ];

        // Mock getting rooms for a hotel
        mockingoose(Hotel).toReturn({ rooms: roomData }, 'findOne');

        const response = await request(app)
            .get(`/hotels/room/${hotelId}`);

        expect(response.status).toBe(200);
        expect(response.body.rooms).toEqual(roomData);
    });
});