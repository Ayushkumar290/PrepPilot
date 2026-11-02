require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT ;
const connectToDB = require('./src/config/database');

// Connect to the database
const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
startServer();

