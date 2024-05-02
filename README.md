# 🚀 tRPC-Express-Prisma-React-Vite Starter

A turn-key starter skeleton for a full-stack application built with tRPC, Express, Prisma, React, and Vite, containerized with Docker.

## ✨ Features

- User management:
  - Login, logout, and registration with JWT tokens
  - Protected routes on both client-side and server-side
- Containerization:  
  - Dockerfiles for client and server
  - docker-compose.yaml for easy deployment
  - Containerized Postgres database for development
- Example CRUD feature:
  - Simple ToDo list with client-side state management
  - Demonstrates usage of tRPC for client-server interaction and cache-invalidation patterns

## ✅  Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/jason-greenberg/trpc-express-prisma-react-vite-starter
   ```

2. Navigate to the project directory:
   ```
   cd trpc-express-prisma-react-vite-starter
   ```

3. Copy the `.env.example` file to `.env` and update the necessary environment variables.

4. Build and start the containers:
   ```
   yarn develop
   ```

5. Access the application at `http://localhost:5173` or your `VITE_APP_URL` if set differently in your `.env`

## 🛠️ Development

- Run database migrations (this will run automatically when inside Docker. You should only run this if you've updated the prisma schema after you have deployed Docker, and want to reflect those changes immediately):
   ```
   yarn prisma:migrate:dev
   ```

- To run type checks, use:
  ```
  yarn typecheck
  ```

## 📦 Build

To build the application for production, run:
```
yarn build
```

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 👨‍💻 Author

Jason Greenberg - [GitHub](https://github.com/jason-greenberg)

Feel free to reach out if you have any questions or suggestions!
