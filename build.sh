#!/usr/bin/env bash
# Render build script — runs on every deploy.
set -o errexit  # stop if any command fails

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
