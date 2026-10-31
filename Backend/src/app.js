const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors") 

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "https://preppilot-git-get-started-ayush33kumar3-2174s-projects.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Require all the routes here 
const authRoutes = require('./routes/authRoutes');
const interviewRouter = require('./routes/interview.route')


app.use('/api/auth', authRoutes);

app.use('/api/interview', interviewRouter)

module.exports = app;