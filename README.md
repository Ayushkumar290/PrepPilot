# 🚀 PrepPilot

**🌐 Live Demo:** [Click Here to Try PrepPilot](https://preppilot-4-72p4.onrender.com/)

PrepPilot is a simple MERN stack project that helps job seekers prepare for interviews. It uses AI to study the job description, resume, and user profile, then creates a custom interview plan with technical questions, behavioral questions, skill gaps, and a preparation roadmap.

This project has:
- a Node.js + Express backend
- a MongoDB database
- a React frontend
- AI-powered report generation using Google Gemini

## What this app does

A user can:
- create an account
- log in and log out
- upload a resume or write a short self-description
- paste a job description
- generate an interview report
- view technical and behavioral interview questions
- see skill gaps and preparation plan
- review previous reports

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT + cookies
- AI: Google Generative AI (Gemini)

## Project structure

```text
PrepPilot/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
└── .gitignore
```

## Features

### User authentication
Users can register, log in, and log out securely. The backend creates a JWT token and stores it in an HTTP-only cookie.

### Resume or self-description input
Users can either:
- upload a resume PDF
- or enter a quick self-description

### AI interview report generation
The app sends the resume, self-description, and job description to Gemini AI. It then returns:
- match score
- technical questions
- behavioral questions
- skill gap analysis
- day-by-day prep plan

### Previous reports
Users can open previous interview reports and compare them later.

## Setup instructions

### 1. Clone the project

```bash
git clone https://github.com/Ayushkumar290/PrepPilot.git
cd PrepPilot
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 4. Create environment variables

Create a `.env` file inside the Backend folder and add values like this:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/preppilot
JWT_SECRET=your_secret_key
GOOGLE_GENAI_API_KEY=your_google_ai_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Notes:
- `MONGO_URI` is your MongoDB connection string.
- `JWT_SECRET` is used to sign login tokens.
- `GOOGLE_GENAI_API_KEY` is required for the AI interview report generation.
- `FRONTEND_URL` helps with CORS for the React app.

## Run the project

### Live demo

The app is live here:

```text
https://preppilot-4-72p4.onrender.com
```

### Start the backend

```bash
cd Backend
npm run dev
```

### Start the frontend

Open a new terminal and run:

```bash
cd Frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Main API routes

### Auth

- `POST /api/auth/register` — create a new account
- `POST /api/auth/login` — log in a user
- `GET /api/auth/logout` — log out and clear cookie
- `GET /api/auth/get-me` — get current logged-in user

### Interview

- `POST /api/interview` — generate an interview report
- `GET /api/interview/report/:interviewId` — get one report
- `GET /api/interview` — get all reports for the logged-in user
- `POST /api/interview/resume/pdf/:interviewReportId` — generate resume PDF

## How the app works

1. User logs in.
2. User enters a job description and uploads a resume or writes a self-description.
3. Backend reads the resume and job details.
4. AI analyzes them and creates a custom interview report.
5. Frontend shows the technical questions, behavioral questions, gaps, and roadmap.
6. User can revisit past reports anytime.

## Future improvements

Some possible ideas for this project:
- add email verification
- add password reset
- support more file types
- add a dashboard with report history and analytics
- improve AI prompts for more accurate interviews

## License

This project is currently for personal or learning use. Please check the repository license before using it commercially.

## Contact

If you want to improve or extend this project, feel free to open an issue or work on the code in this repository.
