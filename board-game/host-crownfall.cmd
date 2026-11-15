@echo off
cd /d "%~dp0"
title Crownfall
echo Starting Crownfall. Leave this window open.
echo On the Quest, open the https Network address printed below.
echo.
npm run dev:ar
echo.
echo Server stopped.
pause
