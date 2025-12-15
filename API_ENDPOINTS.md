# API Endpoints Configuration

## Backend Server
- **Network URL**: http://10.199.165.225:5000
- **Local URL**: http://localhost:5000
- **Database**: PostgreSQL with Prisma
- **Status**: ✅ Running

## Environment Variables
```env
NEXT_PUBLIC_API_URL=http://10.199.165.225:5000
API_BASE_URL=http://10.199.165.225:5000
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Frontend API Routes (Next.js)

### Authentication Endpoints

#### 1. Login
- **Route**: `POST /api/alumni/login`
- **Backend**: `POST http://10.199.165.225:5000/api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "type": "alumni"
  }
  ```

#### 2. Register
- **Route**: `POST /api/alumni/register`
- **Backend**: `POST http://10.199.165.225:5000/api/auth/register`

#### 3. Forgot Password
- **Route**: `POST /api/alumni/forgot-password`
- **Backend**: `POST http://10.199.165.225:5000/api/auth/forgot-password`

### Alumni Profile Endpoints

#### 4. Get Alumni Profile
- **Route**: `GET /api/alumni/[id]`
- **Backend**: `GET http://10.199.165.225:5000/api/alumni/{id}`

#### 5. Update Alumni Profile
- **Route**: `PUT /api/alumni/[id]`
- **Backend**: `PUT http://10.199.165.225:5000/api/alumni/{id}`

### Chat Endpoints

#### 6. Get Chat History
- **Route**: `GET /api/chat`
- **Backend**: `GET http://10.199.165.225:5000/api/chat/history`

#### 7. Send Message
- **Route**: `POST /api/chat`
- **Backend**: `POST http://10.199.165.225:5000/api/chat/send`

## ✅ Network Integration Complete

Your Next.js frontend is now configured to communicate with your backend server using the network IP address `http://10.199.165.225:5000`. This allows other devices on the same network to access your backend API.

## Testing

Test the integration by accessing your frontend and trying authentication features. The API calls will now go to your network-accessible backend server.