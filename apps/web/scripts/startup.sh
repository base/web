#!/bin/bash

# Wait for config service to map env vars
until [ -f /var/env/.env ]; do
  sleep 5
done
source /var/env/.env

# Start the application
yarn workspace @app/web next build
yarn workspace @app/web start -p 3000
