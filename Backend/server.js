require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');

// Connect to the database
connectToDB();

// Local / Render / Railway: start a normal HTTP server.
// On Vercel the app is imported as a serverless function, so we must NOT listen.

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
module.exports = app;
