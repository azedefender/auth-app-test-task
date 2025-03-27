const express = require('express');
const cors = require('cors');
const redis = require('redis');
const routes = require('./routes');
const { REDIS_URL } = require('./config');

const app = express();
const redisClient = redis.createClient(REDIS_URL);

app.use(cors());
app.use(express.json());
app.use('/api', routes);

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
