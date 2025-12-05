# API Setup Guide

## Registration API is Ready! ✓

The alumni registration API has been created at:
```
POST /api/alumni/register
```

## Current Status

The API is currently in **development mode** and will:
- ✓ Validate all required fields
- ✓ Validate email format
- ✓ Log registration data to console
- ✓ Return simulated success response
- ✓ Handle errors properly

## To Connect to Your Database

### Step 1: Install Database Driver

**For PostgreSQL:**
```bash
npm install pg @types/pg
```

**For MySQL:**
```bash
npm install mysql2
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kvs_alumni
DB_USER=postgres
DB_PASSWORD=your_password
```

### Step 3: Update Database Configuration

Edit `src/lib/db.ts` and uncomment the appropriate database connection code.

**For PostgreSQL:**
```typescript
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const db = {
  query: (sql: string, params?: any[]) => pool.query(sql, params),
};
```

### Step 4: Enable Database Insertion

In `src/app/api/alumni/register/route.ts`, uncomment the database insertion code (lines marked with comments).

### Step 5: Add Password Hashing (Recommended)

Install bcrypt:
```bash
npm install bcrypt @types/bcrypt
```

Update the `hashPassword` function in `route.ts`:
```typescript
import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
```

## API Request Format

```json
{
  "name": "John Doe",
  "email_id": "john@example.com",
  "password": "securePassword123",
  "mobile_no": "9876543210",
  "father_name": "Father Name",
  "admission_no": "KVS12345",
  "state_id": 1,
  "school_id": 1,
  "tc_year": 2020,
  "tc_class": "12th",
  "gender": "Male",
  "dob": "2000-01-01",
  "public_display": true
}
```

## API Response Format

**Success (201):**
```json
{
  "message": "Registration successful! Please check your email for verification.",
  "data": {
    "alumni_id": 123,
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email_id": "john@example.com",
    "public_url": "alumni/550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Error (400):**
```json
{
  "message": "Name, email, and password are required"
}
```

**Error (409):**
```json
{
  "message": "Email already registered"
}
```

## Testing the API

You can test the API using:

1. **The Registration Form** - Just fill out and submit
2. **Postman/Thunder Client** - Send POST request to `http://localhost:3000/api/alumni/register`
3. **cURL:**
```bash
curl -X POST http://localhost:3000/api/alumni/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email_id": "test@example.com",
    "password": "password123",
    "mobile_no": "9876543210",
    "father_name": "Father Name"
  }'
```

## Next Steps

1. Set up your database connection
2. Install bcrypt for password hashing
3. Test the registration flow
4. Add email verification (optional)
5. Add JWT authentication for login
6. Create login API endpoint
