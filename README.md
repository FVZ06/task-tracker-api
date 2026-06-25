# Task Tracker API

## Description
Task Tracker API is a backend REST API for managing tasks with user authentication using JWT. Users can register, log in, and manage their tasks securely.

## Features
- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Secure routes protected by JWT middleware
- MongoDB database for persistent storage
- Environment variable configuration

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB Atlas account

### Steps
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
4. Start the server in development mode:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Routes

### Authentication Routes (Public)
- **POST** `/api/auth/register` - Register a new user
  - Body: { name, email, password }
  - Returns: JWT token

- **POST** `/api/auth/login` - Login user
  - Body: { email, password }
  - Returns: JWT token

### Task Routes (Protected - Require JWT Token)
- **GET** `/api/tasks` - Get all tasks for logged-in user
  - Headers: Authorization: Bearer <token>
  - Returns: Array of tasks

- **POST** `/api/tasks` - Create a new task
  - Headers: Authorization: Bearer <token>
  - Body: { title, description }
  - Returns: Created task object

- **PUT** `/api/tasks/:id` - Update a task
  - Headers: Authorization: Bearer <token>
  - Body: { title, description, completed }
  - Returns: Updated task object

- **DELETE** `/api/tasks/:id` - Delete a task
  - Headers: Authorization: Bearer <token>
  - Returns: Success message

### Health Check (Public)
- **GET** `/api/health` - Check if API is running
  - Returns: { message: 'Task Tracker API is running' }

## Testing with Postman

1. **Register a user:**
   - POST http://localhost:5000/api/auth/register
   - Body: { "name": "Test User", "email": "test@example.com", "password": "password123" }
   - Save the returned token

2. **Login:**
   - POST http://localhost:5000/api/auth/login
   - Body: { "email": "test@example.com", "password": "password123" }
   - Save the returned token

3. **Create a task:**
   - POST http://localhost:5000/api/tasks
   - Headers: Authorization: Bearer <token>
   - Body: { "title": "My Task", "description": "Task description" }

4. **Get all tasks:**
   - GET http://localhost:5000/api/tasks
   - Headers: Authorization: Bearer <token>

## Project Structure

task-tracker-api/

├── config/

│   └── db.js (MongoDB connection)

├── middleware/

│   └── authMiddleware.js (JWT verification)

├── models/

│   ├── User.js (User schema)

│   └── Task.js (Task schema)

├── routes/

│   ├── authRoutes.js (Auth endpoints)

│   └── taskRoutes.js (Task endpoints)

├── .env (Environment variables)

├── .env.example (Example env file)

├── .gitignore (Git ignore rules)

├── package.json (Dependencies)

├── server.js (Express server)

└── README.md (This file)

## Technologies Used
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication token
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **nodemon** - Development server auto-reload

## Author
Created for WEB 215 Backend Development Course

## License
ISC
