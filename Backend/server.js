require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');
const PORT = process.env.PORT || 3000;
// Connect to the database
const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};
startServer();

