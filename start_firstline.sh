#!/bin/bash
echo "⚕️  Starting FirstLine Healthcare System..."
echo "=========================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed."
    exit 1
fi

# Check for backend .env
if [ ! -f backend/.env ]; then
    echo "⚠️  backend/.env not found. Creating from example..."
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env. Please edit it to add your HF_TOKEN if needed."
fi

# Install Backend Deps if needed
echo "📦 Checking backend dependencies..."
pip3 install -r backend/requirements.txt > /dev/null 2>&1

# Start Backend in background
echo "🚀 Starting Backend Server (FastAPI)..."
cd backend
python3 main.py &
BACKEND_PID=$!
cd ..

# Wait for backend to potentially start
sleep 3

# Start Frontend
echo "🌐 Starting Frontend Web Server..."
if command -v npm &> /dev/null; then
    cd web_app
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install > /dev/null 2>&1
    fi
    echo "✅ Launching Web App..."
    # npm run dev usually asks for confirmation or blocks, so we run it in background
    npm run dev -- --host &
    FRONTEND_PID=$!
    cd ..
else
    echo "⚠️  npm not found. You can open web_app/home.html directly in your browser,"
    echo "   but some features might require a web server."
    # mac open command
    open web_app/home.html || xdg-open web_app/home.html || echo "Please open web_app/home.html manually."
fi

echo ""
echo "🎉 FirstLine is running!"
echo "➡️  Open: http://localhost:5173/home.html"
echo ""
echo "Press Ctrl+C to stop all services."

# Wait for user to exit
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
