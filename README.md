# Serverless CRUD API

This project is a serverless CRUD API for managing a stock watchlist using AWS Lambda, PostgreSQL, and API Gateway. It allows users to create, read, update, and delete watchlist items.

## Features

- **Create Watchlist Item**: Add a stock to the watchlist.
- **Read Watchlist Items**: Retrieve the list of stocks in the watchlist.
- **Update Watchlist Item**: Modify an existing stock in the watchlist.
- **Delete Watchlist Item**: Remove a stock from the watchlist.

## Technologies Used

- AWS Lambda
- AWS API Gateway
- PostgreSQL
- TypeScript
- Terraform for Infrastructure as Code

## Project Structure

```
serverless-crud-api
├── src
│   ├── functions          # Lambda functions for CRUD operations
│   ├── models             # Data models
│   └── types              # TypeScript types and interfaces
├── infrastructure          # Terraform configuration files
├── scripts                # Deployment and migration scripts
├── migrations             # SQL migration files
├── test                   # Unit and integration tests
├── .github                # GitHub Actions workflows
├── serverless.yml         # Serverless Framework configuration
├── package.json           # npm configuration
├── tsconfig.json          # TypeScript configuration
└── jest.config.js         # Jest configuration
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

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add your AWS and database configuration.

4. **Deploy the application**:
   Run the deployment script:
   ```
   ./scripts/deploy.sh
   ```

5. **Run migrations**:
   To set up the initial database schema, run:
   ```
   ./scripts/migrate.sh
   ```

## Running Tests

To run the unit and integration tests, use:
```
npm test
```

## License

This project is licensed under the MIT License.