import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mockingoose from 'mockingoose';
import User from '../../models/User.js';
import express from 'express';
import { register, login } from './authController.js';

const app = express();
app.use(express.json());

app.post('/register.js', register);
app.post('/login.js', login);

describe('Auth Controller', () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset mocks between tests
  });

  describe('Register', () => {
    it('should create a new user and return success message', async () => {
      mockingoose(User).toReturn(null, 'findOne'); // Mock findOne to return no user
      mockingoose(User).toReturn({}, 'save'); // Mock save to succeed

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('password123', salt);

      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(200);
      expect(res.text).toBe('User has been created');
    });

    it('should return an error if user registration fails', async () => {
      mockingoose(User).toReturn(new Error('Failed to create user'), 'save');

      const res = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        });

      expect(res.status).toBe(500);
      expect(res.body.message).toBeDefined(); // Assumes you handle errors and send JSON response
    });
  });

  describe('Login', () => {
    it('should log in the user and return a JWT token', async () => {
      const mockUser = {
        _id: '610c2d7b7b5b1c7e02a2bfa3',
        username: 'testuser',
        email: 'testuser@example.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
      };

      mockingoose(User).toReturn(mockUser, 'findOne'); // Mock findOne to return user
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Mock password comparison
      jest.spyOn(jwt, 'sign').mockReturnValue('mockJwtToken'); // Mock JWT sign

      const res = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'password123',
        });

      expect(res.status).toBe(200);
      expect(res.body.details.username).toBe(mockUser.username);
      expect(res.body.isAdmin).toBe(false);
      expect(res.headers['set-cookie']).toBeDefined(); // Check if the token cookie is set
    });

    it('should return an error if user not found', async () => {
      mockingoose(User).toReturn(null, 'findOne'); // Mock findOne to return no user

      const res = await request(app)
        .post('/login')
        .send({
          username: 'wronguser',
          password: 'password123',
        });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('User not found');
    });

    it('should return an error if the password is incorrect', async () => {
      const mockUser = {
        _id: '610c2d7b7b5b1c7e02a2bfa3',
        username: 'testuser',
        email: 'testuser@example.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
      };

      mockingoose(User).toReturn(mockUser, 'findOne'); // Mock findOne to return user
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Mock password comparison to fail

      const res = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Incorrect Username/Password');
    });
  });
});
