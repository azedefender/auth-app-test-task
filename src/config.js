require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
};
