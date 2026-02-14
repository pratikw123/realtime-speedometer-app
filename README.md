Project Overview:

This project implements a real-time speed monitoring system where speed data is generated every
second, stored in PostgreSQL, and streamed to a React frontend using WebSockets. The entire
system is containerized using Docker and orchestrated with Docker Compose.

Tech Stack:
- Backend: Node.js, Express, ws (WebSocket), pg
- Frontend: React
- Database: PostgreSQL
- DevOps: Docker, Docker Compose

Architecture Flow:
Browser -> WebSocket -> Backend (Node.js + Express) -> PostgreSQL Database

How to Run:
docker compose up --build

Access URLs:
Frontend: http://localhost:3000
Backend API: http://localhost:3001/history

Key Design Decisions:
- Used WebSockets for low-latency real-time updates.
- Implemented retry mechanism to handle database startup dependency.
- Separated frontend, backend, and database into isolated containers.
- Maintained clean Git commit history for development transparency