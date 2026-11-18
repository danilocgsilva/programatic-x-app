@echo off
call npm run build
if errorlevel 1 exit /b %errorlevel%
python3 -m uvicorn main:app --host 0.0.0.0 --port 8010 --reload