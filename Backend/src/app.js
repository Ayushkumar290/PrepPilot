const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors") 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
            
    credentials:true
}))


// Require all the routes here 
const authRoutes = require('./routes/authRoutes');
const interviewRouter = require('./routes/interview.route')


app.use('/api/auth', authRoutes);

app.use('/api/interview', interviewRouter)

module.exports = app;