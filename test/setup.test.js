// test/setup.test.js

const amqplib = require('amqplib');
const mongoose = require('mongoose');
const { setup } = require('../src/utils/setup.cjs');

// Mock the amqplib and mongoose modules
jest.mock('amqplib');
jest.mock('mongoose');

describe('Setup Utility', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully setup RabbitMQ and MongoDB connections', async () => {
        // Mock successful connection for RabbitMQ
        const mockRabbitMQConnection = { close: jest.fn() };
        amqplib.connect.mockResolvedValue(mockRabbitMQConnection);

        // Mock successful connection for MongoDB
        mongoose.connect.mockResolvedValue();

        await expect(setup()).resolves.not.toThrow();

        expect(amqplib.connect).toHaveBeenCalledWith(process.env.RABBITMQ_URL);
        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    it('should handle RabbitMQ connection error', async () => {
        const rabbitMQError = new Error('RabbitMQ connection failed');
        amqplib.connect.mockRejectedValue(rabbitMQError);

        await expect(setup()).rejects.toThrow(rabbitMQError);

        expect(amqplib.connect).toHaveBeenCalledWith(process.env.RABBITMQ_URL);
        expect(mongoose.connect).not.toHaveBeenCalled();
    });

    it('should handle MongoDB connection error', async () => {
        // Mock successful connection for RabbitMQ
        const mockRabbitMQConnection = { close: jest.fn() };
        amqplib.connect.mockResolvedValue(mockRabbitMQConnection);

        const mongoDBError = new Error('MongoDB connection failed');
        mongoose.connect.mockRejectedValue(mongoDBError);

        await expect(setup()).rejects.toThrow(mongoDBError);

        expect(amqplib.connect).toHaveBeenCalledWith(process.env.RABBITMQ_URL);
        expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
});
