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
  utils/         # shared helpers (e.g. payload validation)
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
- `npm test`: runs unit tests (Jest)

## Running the project

```bash
npm install
npm run dev
```

## Endpoints in this initial scaffold

- `GET /api/health` - health check
- `POST /api/users/register` - register a new visitor (nome, e-mail e senha; e-mail único; senha em hash; usuário criado como ativo) — implementation source: `SCRUM-4`
- `POST /api/auth/register` - same behavior as `/api/users/register` (legacy alias)
- `POST /api/auth/login` - authenticate and receive JWT
- `GET /api/users/me` - protected route to fetch authenticated user profile

### Register responses (SCRUM-4)

- **201** — usuário criado; corpo não inclui senha; inclui `active: true`.
- **400** — `{ "errors": [ { "field", "message" }, ... ] }` quando obrigatórios faltam ou são inválidos.
- **409** — `{ "message": "O e-mail informado já está em uso." }` quando o e-mail já existe.

## Swagger documentation

After starting the API, access:

- [http://localhost:3000/docs](http://localhost:3000/docs)

The OpenAPI specification file is located at `src/docs/openapi.yaml`.

## Next steps

- Add integration/E2E tests if needed
- Add GitHub Actions workflow for CI
- Add Vercel deployment configuration
- Implement new endpoints from Jira user stories
