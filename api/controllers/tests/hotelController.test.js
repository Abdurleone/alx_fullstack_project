import request from 'supertest';
import mockingoose from 'mockingoose';
import Hotel from '../../models/Hotel.js'; // Adjust the path
import Room from '../../models/Room.js';  // Adjust the path
import express from 'express';
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms
} from './hotelController.test.js'; // Adjust the path

const app = express();
app.use(express.json());

app.post('/hotels', createHotel);
app.put('/hotels/:id', updateHotel);
app.delete('/hotels/:id', deleteHotel);
app.get('/hotels', getHotels);
app.get('/hotels/:id', getHotel);
app.get('/hotels/countByCity', countByCity);
app.get('/hotels/countByType', countByType);
app.get('/hotels/:id/rooms', getHotelRooms);

describe('Hotel Controller', () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset mocks between tests
  });

  describe('createHotel', () => {
    it('should create a new hotel', async () => {
      const mockHotel = {
        _id: '610c2d7b7b5b1c7e02a2bfa3',
        name: 'Test Hotel',
        city: 'Test City',
        address: '123 Test St',
        cheapestPrice: 100,
      };

      mockingoose(Hotel).toReturn(mockHotel, 'save');

      const res = await request(app)
        .post('/hotels')
        .send({
          name: 'Test Hotel',
          city: 'Test City',
          address: '123 Test St',
          cheapestPrice: 100,
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(mockHotel.name);
      expect(res.body.city).toBe(mockHotel.city);
    });
  });

  describe('updateHotel', () => {
    it('should update an existing hotel', async () => {
      const mockHotel = {
        _id: '610c2d7b7b5b1c7e02a2bfa3',
        name: 'Updated Hotel',
        city: 'Updated City',
      };

      mockingoose(Hotel).toReturn(mockHotel, 'findByIdAndUpdate');

      const res = await request(app)
        .put('/hotels/610c2d7b7b5b1c7e02a2bfa3')
        .send({ name: 'Updated Hotel', city: 'Updated City' });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(mockHotel.name);
      expect(res.body.city).toBe(mockHotel.city);
    });
  });

  describe('deleteHotel', () => {
    it('should delete a hotel', async () => {
      mockingoose(Hotel).toReturn({}, 'findByIdAndDelete');

      const res = await request(app).delete('/hotels/610c2d7b7b5b1c7e02a2bfa3');

      expect(res.status).toBe(200);
      expect(res.body).toBe('Hotel has been deleted.');
    });
  });

  describe('getHotel', () => {
    it('should return a hotel by id', async () => {
      const mockHotel = {
        _id: '610c2d7b7b5b1c7e02a2bfa3',
        name: 'Test Hotel',
        city: 'Test City',
      };

      mockingoose(Hotel).toReturn(mockHotel, 'findById');

      const res = await request(app).get('/hotels/610c2d7b7b5b1c7e02a2bfa3');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(mockHotel.name);
      expect(res.body.city).toBe(mockHotel.city);
    });
  });

  describe('getHotels', () => {
    it('should return a list of hotels', async () => {
      const mockHotels = [
        { _id: '1', name: 'Hotel 1', city: 'City 1' },
        { _id: '2', name: 'Hotel 2', city: 'City 2' },
      ];

      mockingoose(Hotel).toReturn(mockHotels, 'find');

      const res = await request(app).get('/hotels?limit=2');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe('Hotel 1');
    });
  });

  describe('countByCity', () => {
    it('should return the hotel count for each city', async () => {
      const mockCounts = [2, 3, 5];

      jest.spyOn(Hotel, 'countDocuments').mockResolvedValueOnce(2).mockResolvedValueOnce(3).mockResolvedValueOnce(5);

      const res = await request(app).get('/hotels/countByCity?cities=city1,city2,city3');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockCounts);
    });
  });

  describe('countByType', () => {
    it('should return the count of hotels by type', async () => {
      jest.spyOn(Hotel, 'countDocuments').mockResolvedValueOnce(10).mockResolvedValueOnce(5)
        .mockResolvedValueOnce(2).mockResolvedValueOnce(3).mockResolvedValueOnce(1);

      const res = await request(app).get('/hotels/countByType');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { type: 'hotel', count: 10 },
        { type: 'apartments', count: 5 },
        { type: 'resorts', count: 2 },
        { type: 'villas', count: 3 },
        { type: 'cabins', count: 1 },
      ]);
    });
  });

  describe('getHotelRooms', () => {
    it('should return the list of rooms for a hotel', async () => {
      const mockHotel = {
        _id: '610c2d7b7b5b1c7e02a2bfa3',
        rooms: ['room1', 'room2'],
      };

      const mockRooms = [
        { _id: 'room1', title: 'Room 1' },
        { _id: 'room2', title: 'Room 2' },
      ];

      mockingoose(Hotel).toReturn(mockHotel, 'findById');
      mockingoose(Room).toReturn(mockRooms[0], 'findById').toReturn(mockRooms[1], 'findById');

      const res = await request(app).get('/hotels/610c2d7b7b5b1c7e02a2bfa3/rooms');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].title).toBe('Room 1');
    });
  });
});
