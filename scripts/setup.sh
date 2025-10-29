#!/bin/bash

# Setup script for A/B Testing Platform

echo "🚀 Setting up A/B Testing Platform..."

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Node.js 18 or higher is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Setup backend
echo ""
echo "🔧 Setting up backend..."
if [ ! -f "apps/backend/.env" ]; then
    echo "Creating backend .env file..."
    cp apps/backend/.env.example apps/backend/.env
    echo "⚠️  Please configure apps/backend/.env with your MongoDB URI"
else
    echo "✅ Backend .env already exists"
fi

# Setup frontend
echo ""
echo "🎨 Setting up frontend..."
if [ ! -f "apps/frontend/.env" ]; then
    echo "Creating frontend .env file..."
    cp apps/frontend/.env.example apps/frontend/.env
    echo "✅ Frontend .env created"
else
    echo "✅ Frontend .env already exists"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure apps/backend/.env with your MongoDB Atlas URI"
echo "2. Run 'npm run dev' to start both frontend and backend"
echo "3. Visit http://localhost:5173 for frontend"
echo "4. Visit http://localhost:3000 for backend API"
echo ""
echo "For more info, see docs/SETUP.md"
