#!/usr/bin/env bash
# Render build script — runs on every deploy.
set -o errexit  # stop if any command fails

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py createcachetable

# Create the admin user automatically (only if it doesn't exist yet).
# Reads DJANGO_SUPERUSER_USERNAME / _EMAIL / _PASSWORD from the environment.
# The "|| true" keeps later deploys from failing once the user already exists.
python manage.py createsuperuser --noinput || true
