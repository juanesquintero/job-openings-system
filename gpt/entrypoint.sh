#!/bin/bash

# Install dependencies if requirements.txt has changed
if [ ! -f /code/gpt/.requirements_installed ]; then
    pip install -r /code/gpt/requirements.txt && touch /code/gpt/.requirements_installed
fi

# Start the application
cd /code/gpt
exec uvicorn main:app --reload --host 0.0.0.0 --port 80