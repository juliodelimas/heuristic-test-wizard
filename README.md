# Heuristic Test Wizard API

Initial scaffold of a REST API using JavaScript, Express, JWT authentication and MongoDB connection, prepared to evolve with user stories from Jira.

## Tech stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Swagger (`swagger-ui-express`)

## Project structure

```text
src/
  config/        # environment and database setup
  controllers/   # request handlers
  docs/          # OpenAPI specification
  middleware/    # authentication and error handlers
  models/        # mongoose schemas
  routes/        # route declarations
  services/      # business logic layer
  app.js         # express app instance
  server.js      # server bootstrap
```

## Prerequisites

- Node.js 20+ (recommended)
- MongoDB running locally or a MongoDB Atlas connection string

## Environment variables

1. Copy `.env.example` to `.env`
2. Fill values according to your environment:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/heuristic_test_wizard
JWT_SECRET=change_me
JWT_EXPIRES_IN=1d
BASE_URL=http://localhost:3000
```

## Scripts

- `npm start`: starts API in static mode
- `npm run dev`: starts API with `nodemon` and auto-reload on file changes

## Running the project

```bash
npm install
npm run dev
```

## Endpoints in this initial scaffold

- `GET /api/health` - health check
- `POST /api/auth/register` - create user
- `POST /api/auth/login` - authenticate and receive JWT
- `GET /api/users/me` - protected route to fetch authenticated user profile

## Swagger documentation

After starting the API, access:

- [http://localhost:3000/docs](http://localhost:3000/docs)

The OpenAPI specification file is located at `src/docs/openapi.yaml`.

## Next steps

- Add tests (unit/integration)
- Add GitHub Actions workflow for CI
- Add Vercel deployment configuration
- Implement new endpoints from Jira user stories
