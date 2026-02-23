# AI CCTV Hub — Backend

This is the **backend server** for the AI CCTV Hub platform, built with **Node.js + Express**.

## 📁 Folder Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers (business logic)
│   ├── routes/          # API route definitions
│   ├── models/          # Database models / schemas
│   ├── middleware/       # Auth, error handling, validation middleware
│   ├── services/        # External services (email, SMS, AI APIs)
│   ├── utils/           # Helper functions
│   └── index.js         # App entry point
├── .env.example         # Environment variable template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies
└── README.md            # You are here
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Then edit .env with your actual values
```

### 3. Run the development server
```bash
npm run dev
```

Server will start on `http://localhost:5000` by default.

## 🔌 API Endpoints (Planned)

| Method | Endpoint              | Description                     |
|--------|-----------------------|---------------------------------|
| POST   | `/api/leads`          | Submit a customer lead/enquiry  |
| GET    | `/api/leads`          | Get all leads (admin only)      |
| POST   | `/api/contact`        | Contact form submission         |
| POST   | `/api/auth/login`     | Admin login                     |
| GET    | `/api/health`         | Health check                    |

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose) or PostgreSQL
- **Auth**: JWT (JSON Web Tokens)
- **Email**: Nodemailer / SendGrid
- **Validation**: Joi / express-validator

## 📞 Frontend Integration

The frontend (React + Vite) is in the `/` root of this repo.  
API base URL for development: `http://localhost:5000/api`  
Set `VITE_API_URL` in the frontend `.env` accordingly.
