const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors") 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://preppilot-git-get-started-ayush33kumar3-2174s-projects.vercel.app",

    credentials:true
}))


// Require all the routes here 
const authRoutes = require('./routes/authRoutes');
const interviewRouter = require('./routes/interview.route')


app.use('/api/auth', authRoutes);

app.use('/api/interview', interviewRouter)

module.exports = app;