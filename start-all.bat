@echo off
title FoodPulse Multi-Service Launcher
echo ========================================================
echo           STARTING ALL FOODPULSE SERVICES
echo ========================================================
echo.

set "BASE_DIR=%~dp0"

echo [1/3] Starting Python ML Service (Port 8000)...
start "FoodPulse - ML Service" cmd /k "cd /d %BASE_DIR%ml-service && if exist venv\Scripts\activate.bat (call venv\Scripts\activate.bat) && pip install -r requirements.txt && uvicorn main:app --reload --port 8000"

echo [2/3] Starting Java Spring Boot Backend (Port 8080)...
start "FoodPulse - Spring Boot Backend" cmd /k "cd /d %BASE_DIR%backend && mvnw.cmd spring-boot:run"

echo [3/3] Starting React Frontend (Port 5173)...
start "FoodPulse - React Frontend" cmd /k "cd /d %BASE_DIR%frontend && npm run dev"

echo.
echo ========================================================
echo   ALL 3 SERVICES HAVE BEEN LAUNCHED!
echo   Frontend : http://localhost:5173
echo   ML Service: http://localhost:8000
echo   Backend   : http://localhost:8080
echo ========================================================
echo.
pause
