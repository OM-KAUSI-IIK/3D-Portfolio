@echo off

:: Navigate to the script's directory
cd /d "%~dp0"

:: Install npm dependencies only once unless node_modules is missing
if not exist "node_modules" (
    echo node_modules not found. Installing npm dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo npm install failed with error %errorlevel%.
        pause
        exit /b %errorlevel%
    )
)

if not exist "node_modules" (
    echo Dependencies are still missing after install.
    pause
    exit /b 1
)

:: Start the development server
echo Starting development server...
npm run dev

pause
