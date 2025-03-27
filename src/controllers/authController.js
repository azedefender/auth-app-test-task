const jwt = require('jsonwebtoken');
const redis = require('redis');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

const redisClient = redis.createClient();

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const user = new User(email, password);
    await user.hashPassword();

    
    // await db.saveUser (user);

    res.status(201).send({ message: 'User  registered successfully' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    
    // const user = await db.getUser ByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
};

exports.logout = async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    await redisClient.sadd('blacklist', token);
    res.status(200).send({ message: 'Logged out successfully' });
};
