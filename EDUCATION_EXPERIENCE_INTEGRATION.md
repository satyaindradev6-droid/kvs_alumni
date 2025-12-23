# Education & Experience Redux Integration

## Overview
Integrated Education and Experience management into the profile page using Redux Toolkit for state management with full CRUD operations.

## Redux Slices Created

### 1. Education Slice (`src/redux/slices/educationSlice.ts`)
**State:**
- `educations`: Array of education records
- `loading`: Loading state for async operations
- `error`: Error messages
- `currentEducation`: Single education record for viewing

**Actions:**
- `fetchMyEducations()` - GET /api/educations/me
- `fetchEducationsByAlumni(alumniId)` - GET /api/educations/alumni/:alumni_id
- `fetchEducationById(id)` - GET /api/educations/:id
- `createEducation(data)` - POST /api/educations
- `updateEducation({ id, data })` - PATCH /api/educations/:id
- `deleteEducation(id)` - DELETE /api/educations/:id

**Reducers:**
- `clearEducations()` - Clear all educations from state
- `clearCurrentEducation()` - Clear single education

### 2. Experience Slice (`src/redux/slices/experienceSlice.ts`)
**State:**
- `experiences`: Array of experience records
- `loading`: Loading state for async operations
- `error`: Error messages
- `currentExperience`: Single experience record for viewing

**Actions:**
- `fetchMyExperiences()` - GET /api/experiences/me
- `fetchExperiencesByAlumni(alumniId)` - GET /api/experiences/alumni/:alumni_id
- `fetchExperienceById(id)` - GET /api/experiences/:id
- `createExperience(data)` - POST /api/experiences
- `updateExperience({ id, data })` - PATCH /api/experiences/:id
- `deleteExperience(id)` - DELETE /api/experiences/:id

**Reducers:**
- `clearExperiences()` - Clear all experiences from state
- `clearCurrentExperience()` - Clear single experience

## Components Updated

### Education Section (`src/components/profile/education-section.tsx`)
- Removed local state management
- Integrated Redux hooks (`useAppDispatch`, `useAppSelector`)
- Form always visible (no popup/toggle)
- Real-time updates using Redux state
- Proper error handling with user feedback

**Features:**
- Add new education records
- Edit existing records (click pencil icon)
- Delete records (click trash icon)
- Cancel editing (X button when editing)
- Form validation and loading states

### Experience Section (`src/components/profile/experience-section.tsx`)
- Removed local state management
- Integrated Redux hooks (`useAppDispatch`, `useAppSelector`)
- Form always visible (no popup/toggle)
- Real-time updates using Redux state
- Proper error handling with user feedback
- "Currently working here" checkbox for ongoing positions

**Features:**
- Add new experience records
- Edit existing records (click pencil icon)
- Delete records (click trash icon)
- Cancel editing (X button when editing)
- Current position toggle (sets end_date to null)
- Form validation and loading states

## Store Configuration
Updated `src/redux/store.ts` to include:
```typescript
education: educationReducer,
experience: experienceReducer,
```

## API Integration

### Authentication
All API calls include Bearer token from localStorage:
```typescript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
}
```

### API Base URL
Uses environment variable: `NEXT_PUBLIC_API_URL` (defaults to http://localhost:5000)

### Error Handling
- Network errors caught and displayed to user
- API error responses parsed and shown as alerts
- Loading states prevent duplicate submissions
- Optimistic UI updates via Redux state

## Data Flow

1. **Component Mount**: Dispatches `fetchMyEducations()` or `fetchMyExperiences()`
2. **Redux Thunk**: Makes API call with authentication
3. **State Update**: Redux updates state with fetched data
4. **Component Re-render**: Component displays updated data from Redux store

### Create/Update Flow
1. User fills form and submits
2. Component dispatches `createEducation()` or `updateEducation()`
3. Redux makes API call
4. On success: State updated, form reset
5. On error: Alert shown to user

### Delete Flow
1. User clicks delete button
2. Confirmation dialog shown
3. Component dispatches `deleteEducation()` or `deleteExperience()`
4. Redux makes API call
5. On success: Item removed from state
6. On error: Alert shown to user

## Benefits

1. **Centralized State**: All education/experience data in Redux store
2. **Reusability**: Slices can be used in other components
3. **Type Safety**: Full TypeScript support with proper types
4. **Error Handling**: Consistent error handling across all operations
5. **Loading States**: Built-in loading indicators
6. **Optimistic Updates**: UI updates immediately via Redux
7. **No Popups**: Inline forms always visible for better UX
8. **Clean Code**: Separation of concerns (UI vs. state management)

## Usage Example

```typescript
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchMyEducations, createEducation } from "@/redux/slices/educationSlice"

function MyComponent() {
  const dispatch = useAppDispatch()
  const { educations, loading, error } = useAppSelector((state) => state.education)
  
  useEffect(() => {
    dispatch(fetchMyEducations())
  }, [dispatch])
  
  const handleAdd = async (data) => {
    await dispatch(createEducation(data)).unwrap()
  }
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {educations.map(edu => <div key={edu.id}>{edu.grade}</div>)}
    </div>
  )
}
```

## Testing

To test the integration:
1. Navigate to profile page
2. Fill education/experience forms
3. Click "Add" to create new records
4. Click pencil icon to edit existing records
5. Click trash icon to delete records
6. Verify data persists after page refresh

## Future Enhancements

- Add form validation (required fields, date ranges)
- Add success toast notifications
- Add undo functionality for deletions
- Add bulk operations (delete multiple)
- Add sorting and filtering
- Add export functionality (PDF/CSV)
