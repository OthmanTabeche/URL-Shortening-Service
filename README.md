# 🔗 URL Shortening Service

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1+-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.18+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

A scalable, and production-ready URL shortening service built with modern web technologies. This service provides a complete REST API for creating, managing, and tracking short URLs with comprehensive analytics and validation.

## ✨ Features

### Core Functionality
- **🔗 URL Shortening**: Generate unique 6-character short codes for any valid URL
- **↩️ URL Redirection**: Retrieve and redirect to original URLs using short codes
- **📊 Analytics**: Track access count and view detailed statistics
- **🔄 CRUD Operations**: Full Create, Read, Update, Delete functionality
- **✅ Input Validation**: Comprehensive URL validation with proper error handling
- **📝 Logging**: Centralized logging system for monitoring and debugging

### Technical Features
- **🛡️ Type Safety**: Built with TypeScript for enhanced development experience
- **🏗️ Clean Architecture**: Modular design with separation of concerns
- **🔧 Environment Configuration**: Secure configuration management
- **📦 Modern Dependencies**: Latest stable versions of all packages
- **🎯 Error Handling**: Comprehensive error handling and validation
- **⚡ Performance**: Optimized database queries and efficient algorithms

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/url-shortening-service.git
   cd url-shortening-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   ```

4. **Start the application**
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

The server will start on `http://localhost:3000` (or your configured PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
This API does not require authentication for basic operations.

---

### 🔗 Create Short URL

Creates a new short URL from a provided long URL.

**Endpoint:** `POST /shorten`

**Request Body:**
```json
{
  "url": "https://www.example.com/very/long/url/that/needs/shortening"
}
```

**Success Response (201 Created):**
```json
{
  "_id": "68b76e89a648a01be70cbc43",
  "accessCount": 0,
  "url": "https://www.example.com/very/long/url/that/needs/shortening",
  "shortCode": "gZZBAU",
  "createdAt": "2025-09-02T22:24:09.150Z",
  "updatedAt": "2025-09-02T22:24:09.150Z",
  "__v": 0
}
```

**Error Responses:**
- `400 Bad Request` - Invalid URL format or missing URL
- `500 Internal Server Error` - Server error

---

### 🔍 Retrieve Original URL

Retrieves the original URL and increments the access counter.

**Endpoint:** `GET /shorten/:shortCode`

**Parameters:**
- `shortCode` (string, required) - The 6-character short code

**Success Response (200 OK):**
```json
{
  "_id": "68b76e89a648a01be70cbc43",
  "accessCount": 1,
  "url": "https://www.example.com/very/long/url/that/needs/shortening",
  "shortCode": "gZZBAU",
  "createdAt": "2025-09-02T22:24:09.150Z",
  "updatedAt": "2025-09-02T22:24:13.604Z",
  "__v": 0
}
```

**Error Responses:**
- `404 Not Found` - Short code not found
- `400 Bad Request` - Invalid short code format

---

### ✏️ Update Short URL

Updates the original URL for an existing short code.

**Endpoint:** `PUT /shorten/:shortCode`

**Parameters:**
- `shortCode` (string, required) - The 6-character short code

**Request Body:**
```json
{
  "url": "https://www.updated-example.com/new/url"
}
```

**Success Response (200 OK):**
```json
{
  "_id": "68b76e89a648a01be70cbc43",
  "accessCount": 1,
  "url": "https://www.updated-example.com/new/url",
  "shortCode": "gZZBAU",
  "createdAt": "2025-09-02T22:24:09.150Z",
  "updatedAt": "2025-09-02T22:24:23.774Z",
  "__v": 0
}
```

**Error Responses:**
- `400 Bad Request` - Invalid URL format or missing URL
- `404 Not Found` - Short code not found

---

### 🗑️ Delete Short URL

Deletes an existing short URL.

**Endpoint:** `DELETE /shorten/:shortCode`

**Parameters:**
- `shortCode` (string, required) - The 6-character short code

**Success Response (204 No Content):**
```
No content returned
```

**Error Responses:**
- `404 Not Found` - Short code not found

---

### 📊 Get URL Statistics

Retrieves detailed statistics for a short URL.

**Endpoint:** `GET /shorten/:shortCode/stats`

**Parameters:**
- `shortCode` (string, required) - The 6-character short code

**Success Response (200 OK):**
```json
{
  "_id": "68b76e89a648a01be70cbc43",
  "accessCount": 15,
  "url": "https://www.example.com/very/long/url/that/needs/shortening",
  "shortCode": "gZZBAU",
  "createdAt": "2025-09-02T22:24:09.150Z",
  "updatedAt": "2025-09-02T22:30:45.123Z",
  "__v": 0
}
```

**Error Responses:**
- `404 Not Found` - Short code not found

## 🏗️ Project Architecture

```
src/
├── app.ts                 # Express application setup and middleware
├── index.ts              # Application entry point and server startup
├── controllers/          # Request handlers and business logic
│   └── shortUrl.controllers.ts
├── services/             # Business logic and data processing
│   └── shortUrl.service.ts
├── models/               # Database models and schemas
│   └── shortUrl.ts
├── routes/               # API route definitions
│   └── shortUrl.routes.ts
├── db/                   # Database connection and configuration
│   └── connect.ts
└── utils/                # Utility functions and helpers
    ├── config.ts         # Environment configuration
    ├── generateShortCode.ts  # Short code generation algorithm
    └── logger.ts         # Centralized logging system
```

### Architecture Principles

- **Separation of Concerns**: Clear separation between controllers, services, and models
- **Dependency Injection**: Services are injected into controllers for better testability
- **Error Handling**: Comprehensive error handling at all layers
- **Validation**: Input validation at both controller and model levels
- **Logging**: Structured logging throughout the application

## 🛠️ Technology Stack

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[MongoDB](https://www.mongodb.com/)** - NoSQL document database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling for Node.js

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality assurance
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Nodemon](https://nodemon.io/)** - Development server with hot reload
- **[ts-node](https://typestrong.org/ts-node/)** - TypeScript execution for Node.js

### Validation & Utilities
- **[Validator.js](https://github.com/validatorjs/validator.js)** - String validation library
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |

### Database Schema

The `ShortUrl` model includes the following fields:

```typescript
{
  _id: ObjectId,           // MongoDB document ID
  url: string,             // Original URL (required, validated)
  shortCode: string,       // 6-character unique short code
  accessCount: number,     // Number of times accessed (default: 0)
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

EXPOSE 3000

CMD ["npm", "start"]
```

### Environment Setup for Production

1. Set up MongoDB Atlas or a production MongoDB instance
2. Configure environment variables
3. Set up reverse proxy (nginx) if needed
4. Configure SSL certificates
5. Set up monitoring and logging

## 🧪 Testing

### Manual Testing

You can test the API using curl or any HTTP client:

```bash
# Create a short URL
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.example.com"}'

# Retrieve original URL
curl http://localhost:3000/shorten/YOUR_SHORT_CODE

# Get statistics
curl http://localhost:3000/shorten/YOUR_SHORT_CODE/stats
```

### API Testing Tools

- **Postman** - GUI-based API testing
- **Insomnia** - Modern API client
- **curl** - Command-line HTTP client
- **Thunder Client** - VS Code extension

## 📈 Performance Considerations

- **Database Indexing**: Short codes are indexed for fast lookups
- **Connection Pooling**: MongoDB connection pooling for better performance
- **Error Handling**: Graceful error handling prevents crashes
- **Logging**: Efficient logging without performance impact
- **Validation**: Fast client-side and server-side validation

## 🔒 Security Features

- **Input Validation**: Comprehensive URL validation
- **Error Handling**: Secure error messages without information leakage
- **Environment Variables**: Sensitive data stored in environment variables
- **Type Safety**: TypeScript prevents many runtime errors
- **Database Security**: Mongoose provides protection against NoSQL injection

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Use meaningful commit messages

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as part of the [roadmap.sh Backend Projects](https://roadmap.sh/backend/projects)
- Inspired by modern URL shortening services
- Thanks to the open-source community for the amazing tools

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/your-username/url-shortening-service/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/url-shortening-service/discussions)
- **Email**: your-email@example.com

---

<div align="center">

[⭐ Star this repo](https://github.com/your-username/url-shortening-service) | [🐛 Report Bug](https://github.com/your-username/url-shortening-service/issues) | [💡 Request Feature](https://github.com/your-username/url-shortening-service/issues)

</div>