@echo off
echo Starting Corticon Rules Management System...
echo.

REM Check Node.js version
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)

echo Starting Backend Server...
start "Corticon Backend" cmd /k "cd backend && npm run start:dev"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "Corticon Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Servers are starting...
echo Backend: http://localhost:3001/api
echo Frontend: http://localhost:3000
echo.
pause
