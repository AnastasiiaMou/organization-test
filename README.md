# Organization API

This is a Node.js-based RESTful API for user management. It provides endpoints to register users, authenticate users, retrieve user information, and change a user's boss.

## Prerequisites

Before running the API, make sure you have the following installed:

- [Node.js](https://nodejs.org/en)
- MongoDB (with a running instance)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/AnastasiiaMou/organization-test.git
   ```

2. Install the dependencies:

   ```bash
   cd organization-api
   npm install
   ```

4. Run the application:

   ```bash
   npm start
   ```

5. The API should now be running on `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- `POST /register` - Register a new user.
- `POST /authenticate` - Authenticate a user and generate a JWT token.
- `GET /users` - Retrieve user information (requires authentication).
- `PUT /users/:userId/change-boss` - Change a user's boss (requires authentication and authorization).

## Built With

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens (JWT)](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
