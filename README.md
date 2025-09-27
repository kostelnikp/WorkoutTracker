# 🏋️ WorkoutTracker

A simple application for tracking workouts, built as a SPA in React and a REST API using Node.js and Express.

## 📁 Project Structure

- `React SPA application/` – frontend application in React
- `NodeJS Express Server/` – backend REST API application

---

## 🧑‍💻 Running the Project

### 1. Clone the repository

```bash
git clone https://github.com/kostelnikp/WorkoutTracker.git
cd WorkoutTracker


```

---

### 2. Run the backend (NodeJS Express Server)

#### a) Navigate to the server folder:

```bash
cd "NodeJS Express Server"
```

#### b) Install dependencies:

```bash
npm install
```

#### c) Create the .env file

The application requires a .env file with database connection details. After cloning the project from GitHub:

1. Create a file named `.env` in the `NodeJS Express Server` folder
2. Copy the content from `.env.example` into this file
3. For a local SQLite database, use: `DATABASE_URL="file:./dev.db"`


#### d) Generate Prisma client:

```bash
npx prisma generate
```

#### e) Start the server (development mode):

```bash
npm run dev
```

The server runs at `http://localhost:3000/` (unless changed).

---

### 3. Run the frontend (React SPA)

#### a) Navigate to the React application folder:

```bash
cd "../React SPA application"
```

#### b) Install dependencies:

```bash
npm install
```

#### c) Start the development server:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173/` (by default using Vite).

---

## 🔗 API Communication

The frontend communicates with the backend REST API. Make sure both servers are running simultaneously.

### Homepage
![Homepage](/Screenshots/Homepage.jpg?raw=true "Homepage")

### Exercises
![Exercise](/Screenshots/Exersise.jpg?raw=true "Exercise")

### Workouts
![Workout](/Screenshots/Workout.jpg?raw=true "Workout")
