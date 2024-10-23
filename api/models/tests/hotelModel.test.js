import mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import Hotel from '../models/Hotel.js'; // Adjust the path according to your project structure

describe('Hotel Model', () => {
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

    it('should create a new hotel', async () => {
        const hotelData = {
            name: "Hotel California",
            type: "Resort",
            city: "Los Angeles",
            address: "123 Sunset Blvd",
            distance: "5 km",
            photos: ["photo1.jpg", "photo2.jpg"],
            title: "Hotel California",
            desc: "A lovely place to stay",
            rating: 4.5,
            rooms: ["Room1", "Room2"],
            cheapestPrice: 150,
            featured: true,
        };

        // Mock the `create` method of Mongoose
        mockingoose(Hotel).toReturn(hotelData, 'save');

        const hotel = await Hotel.create(hotelData);

        expect(hotel.name).toBe(hotelData.name);
        expect(hotel.type).toBe(hotelData.type);
        expect(hotel.city).toBe(hotelData.city);
    });

    it('should fail to create a hotel without required fields', async () => {
        const hotelData = {
            type: "Resort",
            // Missing required fields: name, city, address, distance, photos, title, desc, cheapestPrice
        };

        mockingoose(Hotel).toReturn(new Error('Validation failed'), 'save');

        try {
            await Hotel.create(hotelData);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.message).toMatch(/Validation failed/);
        }
    });

    it('should retrieve a hotel by ID', async () => {
        const hotelData = {
            _id: "507f191e810c19729de860ea",
            name: "Hotel California",
            type: "Resort",
            city: "Los Angeles",
            address: "123 Sunset Blvd",
            distance: "5 km",
            photos: ["photo1.jpg", "photo2.jpg"],
            title: "Hotel California",
            desc: "A lovely place to stay",
            rating: 4.5,
            rooms: ["Room1", "Room2"],
            cheapestPrice: 150,
            featured: true,
        };

        mockingoose(Hotel).toReturn(hotelData, 'findById');

        const hotel = await Hotel.findById("507f191e810c19729de860ea");

        expect(hotel._id.toString()).toBe(hotelData._id);
        expect(hotel.name).toBe(hotelData.name);
    });

    it('should update a hotel', async () => {
        const hotelData = {
            _id: "507f191e810c19729de860ea",
            name: "Hotel California",
            type: "Resort",
            city: "Los Angeles",
            address: "123 Sunset Blvd",
            distance: "5 km",
            photos: ["photo1.jpg", "photo2.jpg"],
            title: "Hotel California",
            desc: "A lovely place to stay",
            rating: 4.5,
            rooms: ["Room1", "Room2"],
            cheapestPrice: 150,
            featured: true,
        };

        const updatedData = { name: "Hotel Paradise" };

        mockingoose(Hotel).toReturn({ ...hotelData, ...updatedData }, 'findByIdAndUpdate');

        const updatedHotel = await Hotel.findByIdAndUpdate("507f191e810c19729de860ea", updatedData, { new: true });

        expect(updatedHotel.name).toBe("Hotel Paradise");
    });

    it('should delete a hotel', async () => {
        const hotelId = "507f191e810c19729de860ea";

        mockingoose(Hotel).toReturn(hotelId, 'findByIdAndDelete');

        const result = await Hotel.findByIdAndDelete(hotelId);

        expect(result).toBe(hotelId);
    });
});