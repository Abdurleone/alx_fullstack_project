import request from 'supertest';
import mockingoose from 'mockingoose';
import Room from '../../models/Room.js'; // Adjust path
import Hotel from '../../models/Hotel.js'; // Adjust path
import express from 'express';
import {
  createRoom,
  updateRoom,
  updateRoomAvailability,
  deleteRoom,
  getRoom,
  getRooms
} from './roomController.test.js'; // Adjust path

const app = express();
app.use(express.json());

app.post('/hotels/:hotelid/rooms', createRoom);
app.put('/rooms/:id', updateRoom);
app.put('/rooms/availability/:id', updateRoomAvailability);
app.delete('/hotels/:hotelid/rooms/:id', deleteRoom);
app.get('/rooms/:id', getRoom);
app.get('/rooms', getRooms);

describe('Room Controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createRoom', () => {
    it('should create a new room and associate it with a hotel', async () => {
      const mockRoom = {
        _id: '12345',
        title: 'Deluxe Room',
        price: 100,
        maxPeople: 2,
      };
      const mockHotel = {
        _id: '67890',
        name: 'Test Hotel',
        rooms: [],
      };

      mockingoose(Room).toReturn(mockRoom, 'save');
      mockingoose(Hotel).toReturn(mockHotel, 'findByIdAndUpdate');

      const res = await request(app)
        .post('/hotels/67890/rooms')
        .send({
          title: 'Deluxe Room',
          price: 100,
          maxPeople: 2,
        });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(mockRoom.title);
      expect(res.body.price).toBe(mockRoom.price);
    });
  });

  describe('updateRoom', () => {
    it('should update the room details', async () => {
      const mockRoom = {
        _id: '12345',
        title: 'Updated Room',
        price: 120,
      };

      mockingoose(Room).toReturn(mockRoom, 'findByIdAndUpdate');

      const res = await request(app)
        .put('/rooms/12345')
        .send({ title: 'Updated Room', price: 120 });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Room');
      expect(res.body.price).toBe(120);
    });
  });

  describe('updateRoomAvailability', () => {
    it('should update room availability dates', async () => {
      const mockRoom = {
        _id: '12345',
        roomNumbers: [
          {
            _id: 'room1',
            unavailableDates: [],
          },
        ],
      };

      mockingoose(Room).toReturn(mockRoom, 'updateOne');

      const res = await request(app)
        .put('/rooms/availability/room1')
        .send({ dates: ['2024-10-23', '2024-10-24'] });

      expect(res.status).toBe(200);
      expect(res.text).toBe('Room status has been updated.');
    });
  });

  describe('deleteRoom', () => {
    it('should delete the room and remove it from the hotel', async () => {
      mockingoose(Room).toReturn({}, 'findByIdAndDelete');
      mockingoose(Hotel).toReturn({}, 'findByIdAndUpdate');

      const res = await request(app).delete('/hotels/67890/rooms/12345');

      expect(res.status).toBe(200);
      expect(res.text).toBe('Room has been deleted.');
    });
  });

  describe('getRoom', () => {
    it('should return a room by its ID', async () => {
      const mockRoom = {
        _id: '12345',
        title: 'Test Room',
        price: 100,
      };

      mockingoose(Room).toReturn(mockRoom, 'findById');

      const res = await request(app).get('/rooms/12345');

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Room');
      expect(res.body.price).toBe(100);
    });
  });

  describe('getRooms', () => {
    it('should return a list of rooms', async () => {
      const mockRooms = [
        { _id: '12345', title: 'Room 1', price: 100 },
        { _id: '67890', title: 'Room 2', price: 150 },
      ];

      mockingoose(Room).toReturn(mockRooms, 'find');

      const res = await request(app).get('/rooms');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].title).toBe('Room 1');
    });
  });
});