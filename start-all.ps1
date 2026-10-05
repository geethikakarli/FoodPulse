# FoodPulse Unified PowerShell Launcher
Write-Host "========================================================" -ForegroundColor Green
Write-Host "          STARTING ALL FOODPULSE SERVICES               " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green

$baseDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Start Python ML Service
Write-Host "`n[1/3] Starting Python ML Service (Port 8000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$baseDir\ml-service'; if (Test-Path 'venv\Scripts\Activate.ps1') { . .\venv\Scripts\Activate.ps1 }; pip install -r requirements.txt; uvicorn main:app --reload --port 8000"

# 2. Start Java Spring Boot Backend
Write-Host "[2/3] Starting Java Spring Boot Backend (Port 8080)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$baseDir\backend'; .\mvnw.cmd spring-boot:run"

# 3. Start React Frontend
Write-Host "[3/3] Starting React Frontend (Port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$baseDir\frontend'; npm run dev"

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  ALL 3 SERVICES LAUNCHED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "  Frontend   : http://localhost:5173" -ForegroundColor Yellow
Write-Host "  ML Service : http://localhost:8000" -ForegroundColor Yellow
Write-Host "  Backend    : http://localhost:8080" -ForegroundColor Yellow
Write-Host "========================================================`n" -ForegroundColor Green
