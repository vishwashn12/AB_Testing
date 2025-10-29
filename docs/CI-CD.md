# CI/CD Pipeline Guide

## Overview

The pipeline is fully automated and **NOT hardcoded**. It automatically detects and processes all files in the monorepo structure.

## Pipeline Stages

1. **Build** - Installs dependencies, builds backend and frontend
2. **Test** - Runs all tests (backend + frontend)
3. **Coverage** - Generates code coverage reports
4. **Lint** - Checks code quality
5. **Security** - Runs npm audit
6. **Deploy** - Creates 2 artifacts: `source-code` + `ci-reports`

## Project Structure

```
AB_Testing/
├── apps/
│   ├── backend/
│   │   ├── src/              # Backend source code
│   │   ├── tests/            # Backend tests (Jest)
│   │   ├── package.json
│   │   └── jest.config.js
│   └── frontend/
│       ├── src/              # Frontend source code
│       │   └── *.test.jsx    # Frontend tests (Vitest) - place tests alongside components
│       ├── package.json
│       └── vitest.config.js
├── packages/
│   └── shared/               # Shared code between apps
├── docs/                     # Documentation
├── package.json              # Root workspace config
└── .github/workflows/
    └── ci-cd.yml             # CI/CD pipeline
```

## Adding Tests

### Backend Tests (Jest)

Place tests in `apps/backend/tests/`:

```
apps/backend/
├── src/
│   └── app.js
└── tests/
    ├── unit/
    │   └── app.test.js      # ✓ Tests auto-discovered
    └── integration/
        └── api.test.js      # ✓ Tests auto-discovered
```

Jest automatically finds all `*.test.js` files in the `tests/` directory.

### Frontend Tests (Vitest)

Place tests alongside components with `.test.jsx` extension:

```
apps/frontend/src/
├── components/
│   ├── Button.jsx
│   ├── Button.test.jsx      # ✓ Auto-discovered
│   ├── Header.jsx
│   └── Header.test.jsx      # ✓ Auto-discovered
├── App.jsx
└── App.test.jsx             # ✓ Auto-discovered
```

Vitest automatically finds all `*.test.jsx` and `*.test.js` files.

## Adding New Apps

To add a new app (e.g., `mobile`, `admin`):

```bash
mkdir apps/new-app
cd apps/new-app
npm init -y
```

Update `apps/new-app/package.json`:
```json
{
  "name": "@ab-testing/new-app",
  "scripts": {
    "dev": "...",
    "build": "...",
    "test": "...",
    "lint": "..."
  }
}
```

Update root `package.json` scripts:
```json
{
  "scripts": {
    "dev:new-app": "npm run dev -w @ab-testing/new-app",
    "build:new-app": "npm run build -w @ab-testing/new-app",
    "test:new-app": "npm run test -w @ab-testing/new-app"
  }
}
```

**Pipeline will automatically**:
- Install dependencies
- Run tests if `npm run test` exists
- Run linting if `npm run lint` exists
- Generate reports

## Artifacts Generated

### 1. `source-code` Artifact
- Complete repository (no node_modules, .git, .github)
- Includes package-lock.json for consistent installs
- Ready to deploy anywhere

### 2. `ci-reports` Artifact
```
ci-reports/
├── README.md
├── backend/
│   ├── test-results/junit.xml
│   ├── coverage/lcov-report/index.html
│   └── lint/report.html
├── frontend/
│   ├── test-results/junit.xml
│   ├── coverage/index.html
│   └── lint/report.html
└── security-report.json
```

## Environment Variables

Set in GitHub: `Settings` → `Secrets` → `Actions`

Required:
- `MONGODB_ATLAS_URI` - MongoDB connection string

## Modifying Pipeline

### Add New Stage

Edit `.github/workflows/ci-cd.yml`:

```yaml
new-stage:
  name: New Stage
  runs-on: ubuntu-latest
  needs: [build]  # Dependencies
  
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npm run your-command
```

### Add New Report Type

In the `Generate all reports` step, add:

```bash
# Your new report
echo "Generating new report..."
your-report-command > reports/new-report.json
```

Then in `Create reports artifact` step, copy it:

```bash
if [ -f "reports/new-report.json" ]; then
  cp reports/new-report.json ci-reports/
fi
```

## Triggering Pipeline

Automatically runs on:
- Push to `main` or `develop` branches
- Pull requests to `main`

Manual trigger:
```bash
git push origin main
```

## Best Practices

1. **Tests** - Always write tests alongside code
2. **Naming** - Use `*.test.js` or `*.test.jsx` for test files
3. **Scoped packages** - Name packages `@ab-testing/app-name`
4. **Dependencies** - Install in correct workspace:
   ```bash
   npm install package-name -w @ab-testing/backend
   ```
5. **Commit package-lock** - Always commit updated package-lock.json

## Troubleshooting

**Tests not running?**
- Ensure `test` script exists in package.json
- Check test file naming: `*.test.js` or `*.test.jsx`

**Build failing?**
- Check Node.js version compatibility (requires 20+)
- Verify all dependencies in package.json

**Reports missing?**
- Check if tests/coverage commands run successfully
- Verify report paths in CI/CD script

**New app not detected?**
- Ensure workspace is listed in root `package.json`
- Run `npm install` after adding workspace
