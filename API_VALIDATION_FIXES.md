# API Validation Fixes ✓

## Issues Fixed

### 1. Password Validation ✓
**Problem:** API requires password to be at least 6 characters

**Solution:**
- Added `minLength={6}` to password input fields
- Updated label to show "(min 6 characters)"
- Added password field to Alumni section (Row 4)
- HTML5 validation prevents submission if < 6 characters

### 2. Profile Image Required ✓
**Problem:** API requires `profile_image` field

**Solution:**
- Made photo upload required (`required` attribute)
- Added asterisk (*) to label to indicate required field
- File handler now sets `profile_image` in Redux state
- Generates path: `/uploads/{filename}`

### 3. API Error Handling ✓
**Problem:** API returns validation errors in specific format

**Solution:**
- Updated Redux thunk to parse API error responses
- Handles both formats:
  - `{"error": "...", "details": [...]}`
  - `{"message": "..."}`
- Shows detailed validation errors to user

## Form Changes

### Alumni Section
**Row 1:** Name, Father Name, Mobile Number
**Row 2:** Email ID, State, School
**Row 3:** Year of TC, Class, Admission No
**Row 4:** Password (NEW - min 6 characters)
**Photo Upload:** Required field

### Ex-Employee Section
**Row 1:** Name, Father Name, Mobile Number
**Row 2:** Email ID, Employee Code, Retirement Year
**Row 3:** Retired From, Organization, Password (min 6 characters)
**Photo Upload:** Required field

## Validation Rules

| Field | Validation | Required |
|-------|-----------|----------|
| Name | Text | ✓ |
| Father Name | Text | ✓ |
| Mobile Number | Tel | ✓ |
| Email ID | Email format | ✓ |
| Password | Min 6 characters | ✓ |
| Profile Image | File (image/*) | ✓ |
| State | Select | - |
| School | Select | - |
| Year of TC | Select | - |
| Class | Select | - |
| Admission No | Text | - |

## API Request Example

```json
{
  "name": "John Doe",
  "father_name": "Robert Doe",
  "mobile_no": "9876543210",
  "email_id": "john.doe@example.com",
  "password": "securePass123",
  "profile_image": "/uploads/john-photo.jpg",
  "state_id": 1,
  "school_id": 101,
  "tc_year": 2018,
  "tc_class": "12th",
  "admission_no": "KVS12345",
  "public_display": true
}
```

## Error Handling

### Validation Error Response
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "profile_image",
      "message": "Required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

**Displayed to user as:**
```
profile_image: Required, password: Password must be at least 6 characters
```

### Success Response
```json
{
  "message": "Alumni student registered successfully",
  "data": {
    "alumni_id": 3,
    "uuid": "b8c3e64b-fa86-4c29-8c29-5118116e96d0",
    "name": "John Doe",
    "email_id": "john.doe@example.com",
    ...
  }
}
```

## File Upload Notes

Currently, the file upload:
1. User selects a file
2. File name is displayed
3. Path is set as `/uploads/{filename}` in Redux state
4. Path is sent to API

### To Implement Real File Upload

You have two options:

**Option 1: Upload to your backend first**
```typescript
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    setFileName(file.name)
    
    // Upload file to backend
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${apiUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    })
    
    const { url } = await response.json()
    handleInputChange('profile_image', url)
  }
}
```

**Option 2: Convert to base64 and send with registration**
```typescript
const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    setFileName(file.name)
    
    const reader = new FileReader()
    reader.onloadend = () => {
      handleInputChange('profile_image', reader.result as string)
    }
    reader.readAsDataURL(file)
  }
}
```

## Testing

1. **Start backend:** Ensure API is running on port 5000
2. **Start frontend:** `npm run dev`
3. **Test validation:**
   - Try submitting without photo → Should show HTML5 error
   - Try password < 6 chars → Should show HTML5 error
   - Fill all required fields → Should submit successfully

## Next Steps

1. Implement actual file upload to your backend
2. Add client-side validation messages
3. Add loading indicator during file upload
4. Add image preview before upload
5. Validate file size and type
