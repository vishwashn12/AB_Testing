# Backend - A/B Testing Platform API

Node.js + Express + MongoDB Atlas backend for A/B testing platform.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and configure:
- `MONGODB_ATLAS_URI` - MongoDB Atlas connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production/test)

## Development

```bash
npm run dev
```

## Testing

```bash
npm test
npm run test:watch
npm run coverage
```

## Linting

```bash
npm run lint
npm run lint:fix
```

## API Endpoints

- `GET /health` - Health check
- `GET /` - API information
- `GET /api/users` - Get users (example)
