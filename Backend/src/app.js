require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectToDB = require('./config/database');

const app = express();

// Needed so `secure` cookies work behind Vercel / Render proxies
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

connectToDB()

// FRONTEND_URL can be one URL or a comma-separated list, e.g.
// "http://localhost:5173,https://preppilot.vercel.app"
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);

app.use(cors({
    origin: (origin, cb) => {
        // No Origin header = same-origin request or curl/Postman -> allow
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true
}));

// Make sure MongoDB is connected before handling any request (serverless-safe)
app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (err) {
        res.status(500).json({ message: 'Database connection failed' });
    }
});

// Require all the routes here
const authRoutes = require('./routes/authRoutes');
const interviewRouter = require('./routes/interview.route');

app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRouter);

module.exports = app;
