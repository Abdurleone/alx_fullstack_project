import mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import Room from '../models/Room.js'; // Adjust the path according to your project structure

describe('Room Model', () => {
    beforeAll(() => {
        // Set up a connection to a test database if needed
        mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new room', async () => {
        const roomData = {
            title: "Deluxe Room",
            price: 200,
            maxPeople: 3,
            desc: "A spacious room with a great view.",
            roomNumbers: [
                { number: 101, unavailableDates: [] },
                { number: 102, unavailableDates: [] }
            ],
        };

        // Mock the `save` method of Mongoose
        mockingoose(Room).toReturn(roomData, 'save');

        const room = await Room.create(roomData);

        expect(room.title).toBe(roomData.title);
        expect(room.price).toBe(roomData.price);
        expect(room.maxPeople).toBe(roomData.maxPeople);
    });

    it('should fail to create a room without required fields', async () => {
        const roomData = {
            // Missing required fields: title, price, maxPeople, desc
        };

        mockingoose(Room).toReturn(new Error('Validation failed'), 'save');

        try {
            await Room.create(roomData);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toMatch(/Validation failed/);
        }
    });

    it('should retrieve a room by ID', async () => {
        const roomData = {
            _id: "507f191e810c19729de860ea",
            title: "Deluxe Room",
            price: 200,
            maxPeople: 3,
            desc: "A spacious room with a great view.",
            roomNumbers: [
                { number: 101, unavailableDates: [] },
                { number: 102, unavailableDates: [] }
            ],
        };

        mockingoose(Room).toReturn(roomData, 'findById');

        const room = await Room.findById("507f191e810c19729de860ea");

        expect(room._id.toString()).toBe(roomData._id);
        expect(room.title).toBe(roomData.title);
    });

    it('should update a room', async () => {
        const roomData = {
            _id: "507f191e810c19729de860ea",
            title: "Deluxe Room",
            price: 200,
            maxPeople: 3,
            desc: "A spacious room with a great view.",
            roomNumbers: [
                { number: 101, unavailableDates: [] },
                { number: 102, unavailableDates: [] }
            ],
        };

        const updatedData = { price: 250 };

        mockingoose(Room).toReturn({ ...roomData, ...updatedData }, 'findByIdAndUpdate');

        const updatedRoom = await Room.findByIdAndUpdate("507f191e810c19729de860ea", updatedData, { new: true });

        expect(updatedRoom.price).toBe(250);
    });

    it('should delete a room', async () => {
        const roomId = "507f191e810c19729de860ea";

        mockingoose(Room).toReturn(roomId, 'findByIdAndDelete');

        const result = await Room.findByIdAndDelete(roomId);

        expect(result).toBe(roomId);
    });
});