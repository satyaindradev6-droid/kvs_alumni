# External API Integration Complete ✓

## Your API Endpoint
```
POST http://localhost:5000/api/alumni/register-student
```

## Configuration

The frontend is now configured to use your external API:

**Environment Variable (.env):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Redux Slice:**
- Updated to call `${NEXT_PUBLIC_API_URL}/api/alumni/register-student`
- Handles all HTTP methods and error responses
- Manages loading, success, and error states

## Request Format

The form will send data in this format:
```json
{
  "name": "John Doe",
  "father_name": "Robert Doe",
  "mobile_no": "9876543210",
  "email_id": "john.doe@example.com",
  "state_id": 1,
  "school_id": 101,
  "tc_year": 2018,
  "tc_class": "12th",
  "admission_no": "KVS12345",
  "profile_image": "/uploads/john-doe-photo.jpg",
  "password": "hashedPassword",
  "public_display": true
}
```

## Expected Response Format

**Success Response (200/201):**
```json
{
  "message": "Registration successful",
  "data": {
    "alumni_id": 123,
    "name": "John Doe",
    "email_id": "john.doe@example.com"
  }
}
```

**Error Response (400/409/500):**
```json
{
  "message": "Error message here"
}
```

## How It Works

1. **User fills registration form**
2. **Form data stored in Redux state**
3. **User clicks "REGISTER" button**
4. **Redux dispatches `registerAlumni` thunk**
5. **API call made to:** `http://localhost:5000/api/alumni/register-student`
6. **Response handled:**
   - Success → Show success message, redirect to login
   - Error → Show error message in form

## Testing

1. **Start your backend API** (make sure it's running on port 5000)
2. **Start Next.js dev server:**
   ```bash
   npm run dev
   ```
3. **Navigate to:** http://localhost:3000/register
4. **Fill the form and submit**
5. **Check:**
   - Browser console for Redux actions
   - Network tab for API calls
   - Backend logs for received data

## CORS Configuration

If you encounter CORS errors, make sure your backend API allows requests from `http://localhost:3000`:

**Express.js example:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**NestJS example:**
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

## Field Mapping

| Form Field | API Field | Type | Required |
|------------|-----------|------|----------|
| Name | name | string | ✓ |
| Father Name | father_name | string | ✓ |
| Mobile Number | mobile_no | string | ✓ |
| Email ID | email_id | string | ✓ |
| Password | password | string | ✓ |
| State | state_id | number | - |
| School | school_id | number | - |
| Year of TC | tc_year | number | - |
| Class | tc_class | string | - |
| Admission No | admission_no | string | - |
| Profile Image | profile_image | string | - |
| Public Display | public_display | boolean | - |

## Additional Fields Available

The Redux state also supports these fields (add to form if needed):
- gender
- dob
- relationship_status
- wedding_anniversary
- add1, add2, add3, add4 (address fields)
- role
- about_me
- experties
- facebook, twitter, linkedin, whatsapp, blog
- contribution
- ro_id

## Troubleshooting

**API not responding:**
- Check if backend is running on port 5000
- Verify the endpoint URL is correct
- Check backend logs for errors

**CORS errors:**
- Add CORS middleware to your backend
- Allow origin: http://localhost:3000

**Data not sending:**
- Check browser console for errors
- Verify Redux state is updating
- Check Network tab for request payload

**Password field:**
- Password is sent in the request
- Backend should hash it before storing
- Never store plain text passwords

## Production Deployment

Update `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

The frontend will automatically use the production API URL.
