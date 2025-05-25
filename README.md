# Restaurant Management App Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [API Documentation](#api-documentation)
7. [Authentication and Authorization](#authentication-and-authorization)
8. [Database Schema](#database-schema)
9. [Frontend Usage](#frontend-usage)
10. [Backend Usage](#backend-usage)
11. [How to Run](#how-to-run)
12. [Environment Variables](#environment-variables)
13. [Future Improvements](#future-improvements)

---

## 1. Project Overview

The **Restaurant Management App** is a full-stack application designed to help restaurant managers efficiently manage their restaurants, menus, and customer reviews. Users can browse restaurants, leave comments, and authenticated users can add, update, or delete their own restaurants.

The app supports role-based access with two main roles:

- **Admin**: Manage all users, restaurants, menu items, and comments.
- **Customer**: Manage only their own restaurants and comments.

---

## 2. Technology Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | Next.js, Tailwind CSS          |
| Backend        | Express.js                     |
| Database       | PostgreSQL with Prisma ORM     |
| Authentication | JWT (JSON Web Tokens), cookies |
| API Calls      | Axios, React Query             |

---

## 3. Setup and Installation

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL (latest stable)
- npm or yarn

### Backend Setup

1. Go to the backend directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

Create `.env` with:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yourdbname
JWT_SECRET=your_jwt_secret
```

4. Initialize Prisma and database:

```bash
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

---

## 4. Project Structure

```
next-express-app/
├── client/                    # Next.js frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── pages/             # Route pages
│   │   ├── components/        # React components
│   │   ├── styles/            # Tailwind and other styles
│   │   ├── utils/             # Helpers, API clients
│   ├── next.config.js
│   └── package.json
│
├── server/                    # Express backend
│   ├── controllers/           # Route handlers
│   ├── middlewares/           # Authentication, error handling
│   ├── routes/                # API routes
│   ├── config/                # Database, constants
│   ├── app.ts                 # Express app entry
│   └── .env                   # Environment variables
│
├── README.md
├── .gitignore
└── package.json
```

---

## 5. Features

### Public Features

- List all restaurants sorted by newest
- Search restaurants by name, location, or cuisine
- View restaurant details including menu, reviews, hours, and contact info

### Authenticated User Features

- Register/Login with JWT authentication
- Add new restaurants
- Edit or delete only own restaurants
- Leave comments and reviews on restaurants

### Admin Features

- View all users
- Manage (edit/delete) all restaurants, menu items, and comments
- Access admin dashboard with full controls

---

## 6. API Documentation

### Authentication

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register a new user         |
| POST   | `/auth/login`    | User login                  |
| POST   | `/auth/logout`   | User logout (clears cookie) |

### Restaurants

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/restaurants`     | List all restaurants             |
| POST   | `/api/restaurants`     | Add a new restaurant (auth only) |
| GET    | `/api/restaurants/:id` | Get restaurant details           |
| PUT    | `/api/restaurants/:id` | Edit restaurant (owner only)     |
| DELETE | `/api/restaurants/:id` | Delete restaurant (owner only)   |

### Menu Items

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| GET    | `/api/menu-items`     | List all menu items       |
| POST   | `/api/menu-items`     | Add menu item (auth only) |
| PUT    | `/api/menu-items/:id` | Update menu item          |
| DELETE | `/api/menu-items/:id` | Delete menu item          |

### Comments

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/comments`     | List all comments           |
| POST   | `/api/comments`     | Add comment (auth only)     |
| DELETE | `/api/comments/:id` | Delete comment (admin only) |

### Users

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/api/users` | List all users (admin) |

---

## 7. Authentication and Authorization

- JWT tokens are issued on login and stored securely in HTTP-only cookies.
- Logout clears the cookie to invalidate session.
- Middleware protects routes by verifying JWT and role.
- Users can only modify their own restaurants.
- Admin role has full access.

---

## 8. Database Schema (Prisma)

\`\`\`prisma
model User {
id Int @id @default(autoincrement())
name String
email String @unique
password String
role String @default("customer") // or "admin"
restaurants Restaurant[]
comments Comment[]
}

model Restaurant {
id Int @id @default(autoincrement())
name String
address String
description String
image String?
cuisineType String
openingHours String
userId Int
user User @relation(fields: [userId], references: [id])
menuItems MenuItem[]
comments Comment[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model MenuItem {
id Int @id @default(autoincrement())
name String
price Float
restaurantId Int
restaurant Restaurant @relation(fields: [restaurantId], references: [id])
}

model Comment {
id Int @id @default(autoincrement())
text String
userId Int
restaurantId Int
user User @relation(fields: [userId], references: [id])
restaurant Restaurant @relation(fields: [restaurantId], references: [id])
createdAt DateTime @default(now())
}
\`\`\`

---

## 9. Frontend Usage

- Browse restaurants on the homepage.
- Use search filters to narrow results.
- Login/Register via auth pages.
- Authenticated users can add, edit, delete restaurants.
- Leave comments on restaurant pages.
- Admin dashboard accessible via `/admin`.

---

## 10. Backend Usage

- Express routes handle CRUD operations.
- Middleware for authentication (`authRoutes`) and protected routes.
- Image uploads handled via `/api/upload`.
- API returns JSON data consumed by frontend.

---

## 11. How to Run

From the project root, run backend and frontend concurrently or separately:

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

## 12. Environment Variables

| Key          | Description                        |
| ------------ | ---------------------------------- |
| DATABASE_URL | PostgreSQL connection string       |
| JWT_SECRET   | Secret key for JWT token           |
| PORT         | Backend server port (default 5000) |

---

## 13. Future Improvements

- User profile management.
- More advanced admin analytics.
- Notifications system.
- Mobile responsive enhancements.

---
