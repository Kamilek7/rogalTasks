#!/bin/bash

cd ~/projekty/rogalTasks
source venv/bin/activate
cd backend
current_date=$(date +"%Y-%m-%d %H:%M:%S")
echo "Current date: $current_date" >> output.txt
python3 harmo.py >> output.txt 
deactivate
