#!/bin/bash

cd ~/projekty/rogalTasks/frontend
touch output.log
touch ~/projekty/rogalTasks/backend/output.log
python3 ~/projekty/rogalTasks/backend/main.py > ~/projekty/rogalTasks/backend/output.log 2>&1 & 
npm run dev -- --host > output.log 2>&1 &
