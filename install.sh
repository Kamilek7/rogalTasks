#!/bin/bash
python3 -m venv venv
source venv/bin/activate
sudo apt install default-libmysqlclient-dev build-essential pkg-config
cd frontend
npm install 
cd ../
cd backend
pip install -r requirements.txt
deactivate
