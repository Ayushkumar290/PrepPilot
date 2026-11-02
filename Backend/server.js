require('dotenv').config();

const connectToDB = require('./src/config/database');

// Connect to the database
const startServer = async () => {
    try {
        await connectToDB();

        
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
startServer();

