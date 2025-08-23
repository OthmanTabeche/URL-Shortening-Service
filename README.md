# URL Shortening Service

A robust and scalable backend API for shortening URLs, built with Node.js, Express, TypeScript, and MongoDB. This project is part of the [roadmap.sh Backend Projects](https://roadmap.sh/backend/projects) and is designed to help you learn and demonstrate backend development best practices.

## Features

- **Shorten URLs:** Generate unique, short codes for any valid URL.
- **Redirect:** Retrieve and redirect to the original URL using the short code.
- **Statistics:** Track access count and view statistics for each short URL.
- **CRUD Operations:** Create, read, update, and delete short URLs.
- **Validation:** Input validation and error handling for robust API usage.
- **Logging:** Centralized logging for requests and errors.
- **Environment Config:** Secure configuration using environment variables.

## Tech Stack

- **Node.js** & **Express** — Fast, unopinionated, minimalist web framework
- **TypeScript** — Type safety and modern JavaScript features
- **MongoDB** & **Mongoose** — Flexible, scalable NoSQL database
- **ESLint & Prettier** — Code quality and formatting
- **dotenv** — Environment variable management

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/url-shortening-service.git
cd url-shortening-service

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory and set the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortener
```

### Running the Project

```bash
# For development (with hot reload)
npm run dev

# For production
npm run build
npm start
```

## API Endpoints

## API Endpoints

Given below are the details for each API operation.

### Create Short URL
Create a new short URL using the POST method

**POST** `/shorten`
**Body:**
```json
{
  "url": "https://www.example.com/some/long/url"
}
```
**Responses:**
- `201 Created`
  ```json
  {
    "id": "1",
    "url": "https://www.example.com/some/long/url",
    "shortCode": "abc123",
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
  }
  ```
- `400 Bad Request` (validation errors)

### Retrieve Original URL
Retrieve the original URL from a short URL using the GET method

**GET** `/shorten/:shortCode`
**Responses:**
- `200 OK`
  ```json
  {
    "id": "1",
    "url": "https://www.example.com/some/long/url",
    "shortCode": "abc123",
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z"
  }
  ```
- `404 Not Found`

### Update Short URL
Update an existing short URL using the PUT method

**PUT** `/shorten/:shortCode`
**Body:**
```json
{
  "url": "https://www.example.com/some/updated/url"
}
```
**Responses:**
- `200 OK`
  ```json
  {
    "id": "1",
    "url": "https://www.example.com/some/updated/url",
    "shortCode": "abc123",
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:30:00Z"
  }
  ```
- `400 Bad Request` (validation errors)
- `404 Not Found`

### Delete Short URL
Delete an existing short URL using the DELETE method

**DELETE** `/shorten/:shortCode`
**Responses:**
- `204 No Content`
- `404 Not Found`

### Get URL Statistics
Get statistics for a short URL using the GET method

**GET** `/shorten/:shortCode/stats`
**Responses:**
- `200 OK`
  ```json
  {
    "id": "1",
    "url": "https://www.example.com/some/long/url",
    "shortCode": "abc123",
    "createdAt": "2021-09-01T12:00:00Z",
    "updatedAt": "2021-09-01T12:00:00Z",
    "accessCount": 10
  }
  ```
- `404 Not Found`

## Project Structure

```
src/
  app.ts            # Express app setup
  index.ts          # Entry point
  db/               # Database connection
  controllers/      # Route controllers
  models/           # Mongoose models
  routes/           # API routes
  services/         # Business logic
  utils/            # Utilities (logger, config, etc)
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

---

Built with ❤️ for the backend community and as part of the [roadmap.sh Backend Projects](https://roadmap.sh/backend/projects).