# A/B Testing Platform

Full-stack A/B testing platform with Node.js backend and React frontend.

## Stack

**Backend:** Node.js, Express, MongoDB Atlas, Jest  
**Frontend:** React, Vite, Tailwind CSS  
**Monorepo:** npm workspaces

## Quick Start

```bash
# Install
npm install

# Configure
cp apps/backend/.env.example apps/backend/.env
# Add your MONGODB_ATLAS_URI

# Run
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Commands

```bash
npm run dev              # Run both apps
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm test                 # Run all tests
npm run build            # Build all
npm run lint             # Lint all
```

## Structure

```
apps/backend/     - Node.js API
apps/frontend/    - React UI
packages/shared/  - Shared utilities
docs/             - Documentation
```

## Docs

- [Setup Guide](./docs/SETUP.md)
- [API Docs](./docs/API.md)
- [Deployment](./docs/DEPLOYMENT.md)

## Author

**vishwashn12** - [GitHub](https://github.com/vishwashn12)
- `npm run lint` - Run ESLint
- `npm run build` - Build project
- `npm run coverage` - Generate coverage report

## Pipeline Stages
1. 🏗️ Build
2. 🧪 Test
3. 📊 Coverage
4. 🔍 Lint
5. 🛡️ Security Scan
6. 🚀 Deployment Artifact