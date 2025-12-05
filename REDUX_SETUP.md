# Redux Toolkit Setup for Alumni Registration

## Installation Complete ✓
- @reduxjs/toolkit
- react-redux

## Structure Created

```
src/
├── redux/
│   ├── slices/
│   │   └── alumniSlice.ts      # Alumni registration slice with actions & thunks
│   ├── store.ts                # Redux store configuration
│   ├── hooks.ts                # Typed hooks (useAppDispatch, useAppSelector)
│   └── Provider.tsx            # Redux Provider component
├── types/
│   └── alumni.ts               # TypeScript interfaces for alumni data
```

## Features Implemented

### 1. Alumni Registration State Management
- All database fields from `alumni_students` table mapped
- Form state managed through Redux
- Loading, error, and success states

### 2. Actions Available
- `updateRegistrationField` - Update single field
- `updateRegistration` - Update multiple fields
- `resetRegistration` - Clear form
- `clearError` - Clear error message
- `registerAlumni` - Async registration thunk

### 3. Form Fields Included
- Basic Info: name, email, password, mobile, admission_no
- Profile: profile_image, gender, dob, relationship_status, wedding_anniversary
- Address: add1, add2, add3, add4
- Professional: role, about_me, experties
- Social Media: facebook, twitter, linkedin, whatsapp, blog
- Academic: tc_year, tc_class, contribution
- Relations: father_name, state_id, ro_id, school_id
- Settings: public_display

## Usage Example

```tsx
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateRegistrationField, registerAlumni } from '@/redux/slices/alumniSlice'

// In your component
const dispatch = useAppDispatch()
const { registration, loading, error } = useAppSelector((state) => state.alumni)

// Update field
dispatch(updateRegistrationField({ field: 'name', value: 'John Doe' }))

// Submit registration
await dispatch(registerAlumni(registration)).unwrap()
```

## API Integration

The registration form expects an API endpoint at:
```
POST /api/alumni/register
```

Create this endpoint to handle the registration data and save to your database.

## Next Steps

1. Create the API endpoint `/api/alumni/register`
2. Add form validation
3. Implement file upload for profile images
4. Add additional fields as needed (address, social media, etc.)
5. Add success/error notifications
