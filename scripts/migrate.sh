#!/bin/bash

# This script runs database migrations to set up the initial schema using the SQL file.

# Load environment variables
source .env

# Run the migration
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -f migrations/001_initial_schema.sql

echo "Database migration completed."