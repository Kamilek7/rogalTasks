#!/bin/bash
source venv/bin/activate
cd ~/projekty/rogalTasks/frontend
python3 ~/projekty/rogalTasks/backend/main.py | npm run dev -- --host 
