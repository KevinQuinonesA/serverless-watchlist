#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Install dependencies
npm install

# Deploy the application using Serverless Framework
npx serverless deploy

# Output the deployment information
echo "Deployment completed."