require('dotenv').config();
const app = require('./src/app');

// Local / Render / Railway: start a normal HTTP server.
// On Vercel the app is imported as a serverless function, so we must NOT listen.
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
