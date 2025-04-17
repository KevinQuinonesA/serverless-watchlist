# Serverless CRUD API

This project is a serverless CRUD API for managing a stock watchlist using AWS Lambda, PostgreSQL, and API Gateway. It allows users to create, read, and delete watchlist items.

## Test an EP
You can test this endpoint since it does not need any extra param or body.

https://qfnjrphgbe.execute-api.us-east-1.amazonaws.com/dev/watchlist

## Features

- **Create Watchlist Item**: Add a stock to the watchlist.
- **Read Watchlist Items**: Retrieve the list of stocks in the watchlist.
- **Delete Watchlist Item**: Remove a stock from the watchlist.

## Technologies Used

- AWS Lambda
- AWS API Gateway
- PostgreSQL (Supabase)
- TypeScript
- Serverless Framework
- Mocha/Chai for Testing

## Project Structure

```
serverless-crud-api
├── src
│   ├── functions          # Lambda functions for CRUD operations
│   │   ├── create.ts      # Add stocks to watchlist
│   │   ├── read.ts        # Get watchlist items
│   │   ├── delete.ts      # Remove stocks from watchlist
│   │   └── common         # Shared utilities
│   │       ├── db.ts      # Database connection
│   │       └── responses.ts # Response formatters
├── test                   # Unit and integration tests
│   ├── functions          # Unit tests for Lambda functions
│   │   ├── create.test.ts
│   │   ├── read.test.ts
│   │   └── delete.test.ts
│   ├── mocks              # Test mocks
│   │   └── db-mock.ts     # Database mocks
├── .github                # GitHub Actions workflows
├── migrations             # SQL migration files
├── serverless.yml         # Serverless Framework configuration
├── package.json           # npm configuration
├── tsconfig.json          # TypeScript configuration
└── .mocharc.json          # Mocha configuration
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd serverless-crud-api
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables: Create a .env file in the root directory:**:
   ```
   DATABASE_URL=postgresql://postgres.username:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

4. **Set up your database: Run the following SQL in your Supabase SQL editor:**:
   ```
   migrations/001_initial_schema.sql
   ```

5. **Deploy the application:**
   ```
   # Store database connection in AWS SSM Parameter Store
   aws ssm put-parameter --name "/watchlist-app/database-url" --type "SecureString" --value "your-db-connection-string"

   # Deploy with Serverless Framework
   npx serverless deploy
   ```
## Local Development
   ```
   # Start the local development server
   npx serverless offline start
   ```

## Running Tests

To run the unit and integration tests, use:
```
npm test
```


## User Authentication

Note: This API does not include authentication. By default, it uses a `user_id` of 123. You can override this by providing a custom `userId` as a query parameter:

```
GET /watchlist?userId=456

```


## AWS Services Used
- Lambda: Serverless functions for API endpoints
- API Gateway: HTTP API endpoints
- Systems Manager Parameter Store: Secure storage of database credentials

## License

This project is licensed under the MIT License.