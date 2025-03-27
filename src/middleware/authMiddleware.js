const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const redis = require('redis');

const redisClient = redis.createClient();

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(403).send({ message: 'No token provided' });

    redisClient.sismember('blacklist', token, (err, response) => {
        if (response === 1) {
            return res.status(401).send({ message: 'Token is blacklisted' });
        }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).send({ message: 'Unauthorized' });
            req.userId = decoded.id;
            next();
        });
    });
};
