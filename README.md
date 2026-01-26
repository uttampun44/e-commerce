# E-Commerce Platform

A modern, full-stack e-commerce application built with TypeScript, React, and Node.js. Features a responsive frontend with a robust backend API, all containerized with Docker for easy deployment.

## 🎯 Features

- **User Authentication** - Secure login, registration, and logout functionality
- **Product Management** - Browse and manage products with advanced filtering
- **Order Management** - Create, track, and manage orders
- **Responsive Design** - Mobile-friendly UI built with modern React components
- **API-First Architecture** - RESTful API with proper error handling and validation
- **Docker Support** - Full containerization for seamless deployment

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Modern build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Server state management and data synchronization
- **React Hook Form** - Flexible, extensible forms with easy-to-use validation
- **Zod** - TypeScript-first schema validation with static type inference

### Backend
- **Node.js** with Express.js
- **TypeScript** - Type-safe JavaScript
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration
- **JWT (JSON Web Tokens)** - Secure user authentication and authorization
- **Chalk** - Terminal string styling for better logging and debugging

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📁 Project Structure

```
e-commerce/
├── e-commerce-backend/          # Node.js/Express backend
│   ├── src/
│   │   ├── server.ts           # Application entry point
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API route definitions
│   │   └── schemas/            # Data validation schemas
│   ├── Dockerfile              # Backend container image
│   └── package.json            # Dependencies
│
├── e-commerce-frontend/         # React/Vite frontend
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── routes/             # Route configuration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── contextapi/         # Context providers
│   │   ├── lib/                # Utility functions
│   │   └── types/              # TypeScript type definitions
│   ├── Dockerfile              # Frontend container image
│   └── package.json            # Dependencies
│
└── docker-compose.yml          # Service orchestration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Docker & Docker Compose (optional, for containerized setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install Backend Dependencies**
   ```bash
   cd e-commerce-backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../e-commerce-frontend
   npm install
   ```

### Environment Configuration

Create `.env` files in both backend and frontend directories with necessary environment variables.

**Backend (.env)**
```
PORT=8080
NODE_ENV=development
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:3000
```

## 💻 Running the Application

### Option 1: Local Development

**Terminal 1 - Backend:**
```bash
cd e-commerce-backend
npm run dev
```
Backend runs on `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd e-commerce-frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

### Option 2: Docker Compose

```bash
docker-compose up --build
```

This will start both services:
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

## 🧪 Testing

Run integration tests:
```bash
npm run test
```

## 📝 Available Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build TypeScript
npm run start    # Run production build
npm run test     # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
```



**Last Updated:** January 2026
