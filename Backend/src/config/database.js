const mongoose = require('mongoose');

// Cache the connection promise so serverless invocations (Vercel) reuse it
let connectionPromise = null;

function connectToDB() {
    if (mongoose.connection.readyState === 1) return Promise.resolve();

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Connected to MongoDB'))
            .catch((error) => {
                connectionPromise = null; // allow retry on next request
                console.error('Error connecting to MongoDB:', error);
                throw error;
            });
    }
    return connectionPromise;
}

module.exports = connectToDB;
