#!/bin/bash

# Navigate to the scripts directory
cd scripts

# Install dependencies
npm install

# Run the migration script
npm run migrate

# Return to the root directory
cd ..

echo "Migration process completed!"
