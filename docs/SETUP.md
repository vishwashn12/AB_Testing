# Setup Guide

## Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account

## Install

```bash
git clone https://github.com/vishwashn12/AB_Testing.git
cd AB_Testing
npm install
```

## Configure

**Backend:**
```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:
```env
MONGODB_ATLAS_URI=your_mongodb_uri
NODE_ENV=development
PORT=3000
```

**Frontend:**
```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Edit `apps/frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

## Run

```bash
# Both apps
npm run dev

# Individually
npm run dev:backend
npm run dev:frontend
```

## Test

```bash
npm test                 # All tests
npm run test:backend     # Backend only
npm run test:frontend    # Frontend only
```

## Build

```bash
npm run build            # All
npm run build:backend    # Backend only
npm run build:frontend   # Frontend only
```

## Troubleshooting

**Port conflicts:**
- Change `PORT` in backend `.env`
- Frontend uses Vite default (5173)

**MongoDB issues:**
- Verify connection string
- Check IP whitelist in Atlas
- Ensure database user permissions
