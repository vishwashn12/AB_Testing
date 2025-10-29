# Node.js CI/CD Project

A Node.js project with complete CI/CD pipeline using GitHub Actions.

## Features
- Automated testing with Jest
- Code coverage reporting
- ESLint code quality checks
- Security vulnerability scanning
- MongoDB integration testing
- Automated deployment artifacts

## Setup
1. Clone the repository
2. Run `npm install`
3. Copy `.github/workflows/ci-cd.yml` to your project
4. Push to GitHub to trigger the pipeline

## Scripts
- `npm test` - Run test suite
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