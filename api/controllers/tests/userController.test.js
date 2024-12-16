import request from 'supertest';
import mockingoose from 'mockingoose';
import User from '../models/User.js'; // Adjust the path to your User model
import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers
} from './userController.test.js'; // Adjust path to your userController

const app = express();
app.use(express.json());

app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users/:id', getUser);
app.get('/users', getUsers);

describe('User Controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('updateUser', () => {
    it('should update the user details', async () => {
      const mockUser = {
        _id: '12345',
        username: 'UpdatedUser',
        email: 'updateduser@example.com',
      };

      mockingoose(User).toReturn(mockUser, 'findByIdAndUpdate');

      const res = await request(app)
        .put('/users/12345')
        .send({ username: 'UpdatedUser', email: 'updateduser@example.com' });

      expect(res.status).toBe(200);
      expect(res.body.username).toBe('UpdatedUser');
      expect(res.body.email).toBe('updateduser@example.com');
    });
  });

  describe('deleteUser', () => {
    it('should delete the user', async () => {
      mockingoose(User).toReturn({}, 'findByIdAndDelete');

      const res = await request(app).delete('/users/12345');

      expect(res.status).toBe(200);
      expect(res.text).toBe('User has been deleted.');
    });
  });

  describe('getUser', () => {
    it('should return a user by ID', async () => {
      const mockUser = {
        _id: '12345',
        username: 'TestUser',
        email: 'testuser@example.com',
      };

      mockingoose(User).toReturn(mockUser, 'findById');

      const res = await request(app).get('/users/12345');

      expect(res.status).toBe(200);
      expect(res.body.username).toBe('TestUser');
      expect(res.body.email).toBe('testuser@example.com');
    });
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { _id: '12345', username: 'User1', email: 'user1@example.com' },
        { _id: '67890', username: 'User2', email: 'user2@example.com' },
      ];

      mockingoose(User).toReturn(mockUsers, 'find');

      const res = await request(app).get('/users');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].username).toBe('User1');
    });
  });
});