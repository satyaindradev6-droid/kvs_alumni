# KVS Alumni Management Portal - Project Index

## Project Overview

**KVS Alumni Management Portal** is a comprehensive Next.js application designed for the Kendriya Vidyalaya Sangathan alumni network. It enables alumni and ex-employees to register, connect, and engage through various features including messaging, events, and profile management.

## Tech Stack

### Core Technologies
- **Framework**: Next.js 16.0.4 (App Router)
- **Runtime**: React 19.2.0
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit 2.11.0 with React-Redux 9.2.0

### UI & Components
- **Component Library**: Radix UI (Avatar, Checkbox, Dialog, Dropdown, Select, Scroll Area, Separator, Slot)
- **Icons**: Lucide React 0.554.0
- **3D Graphics**: Three.js 0.181.2 with React Three Fiber 9.4.0 and Drei 10.7.7
- **Utilities**: 
  - `clsx` & `tailwind-merge` for className management
  - `class-variance-authority` for component variants

### Validation & Data
- **Schema Validation**: Zod 4.1.13
- **API Integration**: External backend at `http://localhost:5000`

### Development Tools
- **Linting**: ESLint 9 with Next.js config
- **PostCSS**: Tailwind PostCSS 4
- **Type Definitions**: @types/node, @types/react, @types/react-dom

## Project Structure

```
kvs_alumni/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── alumni/              # Alumni-specific routes
│   │   ├── api/                 # API routes
│   │   │   └── alumni/
│   │   │       └── register/    # Registration endpoint
│   │   ├── chat/                # Chat application
│   │   ├── components/          # Shared app components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── context/             # React contexts
│   │   │   └── ThemeContext.tsx
│   │   ├── ex-employee/         # Ex-employee routes
│   │   ├── home/                # Home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── alumni.tsx
│   │   │   ├── animationSection.tsx
│   │   │   ├── contactSection.tsx
│   │   │   ├── statsSection.tsx
│   │   │   ├── upcomingEvents.tsx
│   │   │   └── page.tsx
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration pages
│   │   │   ├── success/         # Success page
│   │   │   ├── designGlobe.tsx  # 3D globe component
│   │   │   ├── loginPage.tsx
│   │   │   ├── registerSection.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css          # Global styles & theme variables
│   │   ├── layout.tsx           # Root layout
│   │   ├── MainLayout.tsx       # Main layout wrapper
│   │   └── page.tsx             # Home page
│   │
│   ├── components/              # Reusable components
│   │   ├── chat/                # Chat-specific components
│   │   │   ├── chat-sidebar.tsx
│   │   │   ├── chat-window.tsx
│   │   │   ├── new-chat-modal.tsx
│   │   │   └── user-profile-panel.tsx
│   │   └── ui/                  # UI primitives (Radix wrappers)
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       └── separator.tsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── use-media-query.ts
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── chat-data.ts         # Chat mock data & types
│   │   ├── db.ts                # Database connection
│   │   ├── utils.ts             # Utility functions (cn)
│   │   └── validations.ts       # Zod schemas
│   │
│   ├── redux/                   # Redux state management
│   │   ├── slices/
│   │   │   ├── alumniSlice.ts   # Alumni registration state
│   │   │   ├── employeeSlice.ts # Employee registration state
│   │   │   └── locationSlice.ts # States & schools data
│   │   ├── hooks.ts             # Typed Redux hooks
│   │   ├── Provider.tsx         # Redux Provider wrapper
│   │   └── store.ts             # Store configuration
│   │
│   └── types/                   # TypeScript type definitions
│       ├── alumni.ts            # Alumni interfaces
│       └── employee.ts          # Employee interfaces
│
├── public/                      # Static assets
│   └── images/                  # Image assets
│       ├── alumni/              # Alumni photos
│       ├── contactSection/      # Contact section images
│       ├── crousal1/            # Carousel images
│       ├── eventSection/        # Event images
│       ├── login/               # Login page assets
│       ├── statsSection/        # Statistics section images
│       ├── building.png
│       ├── kv_logo.png
│       ├── logo.png
│       └── [SVG icons]
│
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies & scripts
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
├── API_SETUP.md                 # API setup guide
├── REDUX_SETUP.md               # Redux setup documentation
├── EXTERNAL_API_INTEGRATION.md  # External API integration guide
└── INTEGRATION_COMPLETE.md      # Integration completion notes
```

## Key Features

### 1. Alumni Registration System
- **Multi-step Registration Form**
  - Basic Info: Name, email, mobile, admission number
  - Profile: Gender, DOB, relationship status, profile image
  - Address: Multi-line address fields (add1-add4)
  - Professional: Role, about me, expertise
  - Social Media: Facebook, Twitter, LinkedIn, WhatsApp, Blog
  - Academic: TC year, TC class, contribution
  - Relations: Father name, state, school, RO
  - Settings: Public display toggle

- **Validation**: Zod schemas with comprehensive field validation
- **State Management**: Redux Toolkit with async thunks
- **API Integration**: POST to `${NEXT_PUBLIC_API_URL}/api/alumni/register-student`

### 2. Ex-Employee Registration
- Similar structure to alumni registration
- Employee-specific fields: Employee code, organization, organizer ID
- Separate Redux slice for state management
- API endpoint: `${NEXT_PUBLIC_API_URL}/api/alumni/register-employee`

### 3. Location Management
- **Dynamic Dropdowns**:
  - Fetch states from API
  - Fetch schools based on selected state
- **Redux State**: Normalized data with loading/error states
- **API Endpoints**:
  - GET `/api/states` - Fetch all states
  - GET `/api/states/:stateId/schools` - Fetch schools by state

### 4. Chat System
- **Features**:
  - One-on-one messaging
  - Group chats with multiple members
  - Real-time message status (sent, delivered, read)
  - User online/offline status
  - Last seen timestamps
  - Pinned conversations
  - Muted conversations
  - New chat modal for user selection

- **Components**:
  - `ChatSidebar`: Conversation list with search
  - `ChatWindow`: Message display and input
  - `NewChatModal`: User selection for new chats
  - `UserProfilePanel`: User profile information

- **Responsive Design**: Mobile-optimized with collapsible sidebar

### 5. Home Page
- **Hero Section**: Auto-rotating carousel with 4 slides
- **Alumni Section**: Animated alumni showcase
- **Statistics Section**: Key metrics display
- **Events Section**: Upcoming events listing
- **Alumni Images**: Photo gallery
- **Contact Section**: Contact form and information

### 6. Authentication
- **Login Page**: Email and password authentication
- **Registration Page**: Multi-tab registration (Alumni/Ex-Employee)
- **3D Globe Design**: Three.js animated globe on auth pages
- **JWT-Ready**: Structure prepared for JWT token management

### 7. Theme System
- **5 Color Themes**:
  - Cyan (default): #66E9FF
  - Blue: #2c3e6e
  - Green: #065f46
  - Purple: #6b21a8
  - Orange: #c2410c

- **Dynamic Switching**: CSS variables with `data-theme` attribute
- **Theme Context**: React context for theme management

## State Management (Redux)

### Store Structure
```typescript
{
  alumni: {
    registration: AlumniRegistration,
    loading: boolean,
    error: string | null,
    success: boolean
  },
  employee: {
    registration: EmployeeRegistration,
    loading: boolean,
    error: string | null,
    success: boolean
  },
  location: {
    states: State[],
    schools: School[],
    statesLoading: boolean,
    schoolsLoading: boolean,
    statesError: string | null,
    schoolsError: string | null
  }
}
```

### Actions & Thunks

**Alumni Slice**:
- `updateRegistrationField` - Update single field
- `updateRegistration` - Update multiple fields
- `resetRegistration` - Clear form
- `clearError` - Clear error message
- `registerAlumni` (async) - Submit registration

**Employee Slice**:
- `updateEmployeeField` - Update single field
- `updateEmployeeRegistration` - Update multiple fields
- `resetEmployeeRegistration` - Clear form
- `clearEmployeeError` - Clear error message
- `registerEmployee` (async) - Submit registration

**Location Slice**:
- `fetchStates` (async) - Fetch all states
- `fetchSchoolsByState` (async) - Fetch schools by state ID
- `clearSchools` - Clear schools list

## API Integration

### External Backend
- **Base URL**: `http://localhost:5000` (configurable via `NEXT_PUBLIC_API_URL`)
- **Content Type**: `multipart/form-data` for file uploads, `application/json` for data

### Endpoints

**Alumni Registration**:
```
POST /api/alumni/register-student
Content-Type: multipart/form-data

Request Body: FormData with all registration fields
Response: { message, data: { alumni_id, uuid, name, email_id, public_url } }
```

**Employee Registration**:
```
POST /api/alumni/register-employee
Content-Type: multipart/form-data

Request Body: FormData with all employee fields
Response: { message, data: { employee_id, ... } }
```

**Location Data**:
```
GET /api/states
Response: { data: State[] }

GET /api/states/:stateId/schools
Response: { data: School[] }
```

### Error Handling
- Validation errors with field-specific messages
- Network error handling
- HTTP status codes: 200/201 (success), 400 (validation), 409 (conflict), 500 (server error)

## Type Definitions

### Alumni Registration
```typescript
interface AlumniRegistration {
  // Basic Info
  admission_no?: string
  name: string
  mobile_no?: string
  email_id: string
  password?: string
  
  // Profile
  profile_image?: string
  gender?: string
  dob?: string
  relationship_status?: string
  wedding_anniversary?: string
  
  // Address
  add1?: string
  add2?: string
  add3?: string
  add4?: string
  
  // Professional
  role?: string
  about_me?: string
  experties?: string
  
  // Social Media
  facebook?: string
  twitter?: string
  linkedin?: string
  whatsapp?: string
  blog?: string
  
  // Academic
  tc_year?: number
  tc_class?: string
  contribution?: string
  
  // Relations
  father_name?: string
  state_id?: number
  ro_id?: number
  school_id?: number
  
  // Settings
  public_display?: boolean
}
```

### Employee Registration
```typescript
interface EmployeeRegistration {
  name: string
  fathername: string
  mobileno: string
  emailid: string
  empcode: string
  tcyear: number
  photo?: File | string
  password: string
  publicurl: string
  gender: string
  dob: string
  relationshipstatus: number
  weddinganniversary?: string
  add1: string
  add2: string
  add3: string
  add4: string
  aboutme: string
  facebook?: string
  twitter?: string
  linkedin?: string
  whatsapp?: string
  blog?: string
  tcclass: string
  contribution: string
  stateid: number
  organization: string
  organizerid: number
  userid: string
  note?: string
}
```

### Chat Types
```typescript
type User = {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline"
  lastSeen?: string
  about?: string
}

type Message = {
  id: string
  content: string
  senderId: string
  senderName?: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  type: "text" | "image" | "file"
}

type Conversation = {
  id: string
  participant: User
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  isPinned: boolean
  isMuted: boolean
  isGroup?: boolean
  groupInfo?: GroupInfo
}
```

## Environment Variables

### Required Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Database Configuration (if using local API)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kvs_alumni
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_here

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## Scripts

```json
{
  "dev": "next dev",           // Start development server
  "build": "next build",       // Build for production
  "start": "next start",       // Start production server
  "lint": "eslint"             // Run ESLint
}
```

## Styling & Design

### Tailwind CSS Configuration
- **Version**: 4.x (latest)
- **PostCSS**: Configured with @tailwindcss/postcss
- **Custom Utilities**: Animation classes for floating and sliding effects

### CSS Variables
```css
:root {
  --theme-primary: #66E9FF
  --theme-primary2: #4DD8F0
  --theme-primary3: #33C7E0
  --theme-primary4: #1AB6D0
  --theme-secondary: #0891b2
  --theme-accent: #06b6d4
}
```

### Custom Animations
- `slideLeftRight`: Horizontal sliding animation
- `float-slow`: Slow floating effect (10s)
- `float-medium`: Medium floating effect (8s)

## Routing

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/register/success` - Registration success page

### Protected Routes (to be implemented)
- `/chat` - Chat application
- `/alumni` - Alumni directory
- `/ex-employee` - Ex-employee directory

### API Routes
- `/api/alumni/register` - Alumni registration endpoint (Next.js API)

## Component Architecture

### Layout Hierarchy
```
RootLayout (layout.tsx)
├── ReduxProvider
│   └── ThemeProvider
│       └── MainLayout
│           ├── Navbar (conditional)
│           ├── {children}
│           └── Footer (conditional)
```

### Conditional Rendering
- Chat page (`/chat`) renders without Navbar and Footer
- All other pages include full layout

## Development Setup

### Prerequisites
- Node.js 20+
- npm/yarn/pnpm
- Backend API running on port 5000

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Build
```bash
npm run build
npm start
```

## Database Schema (Expected)

### alumni_students Table
- `alumni_id` (PK)
- `uuid` (unique)
- `name`, `email_id`, `password`
- `mobile_no`, `father_name`, `admission_no`
- `state_id`, `school_id`, `ro_id`
- `tc_year`, `tc_class`
- `gender`, `dob`
- `relationship_status`, `wedding_anniversary`
- `add1`, `add2`, `add3`, `add4`
- `role`, `about_me`, `experties`
- `facebook`, `twitter`, `linkedin`, `whatsapp`, `blog`
- `contribution`
- `profile_image`, `public_url`
- `public_display`, `status`
- `created_at`, `updated_at`

### ex_employees Table
- Similar structure to alumni_students
- Additional fields: `empcode`, `organization`, `organizerid`

### states Table
- `id` (PK)
- `name`

### schools Table
- `id` (PK)
- `kv_id`
- `name`
- `state_id` (FK)

## Security Considerations

### Implemented
- Environment variables for sensitive data
- `.env` files gitignored
- TypeScript strict mode
- Input validation with Zod schemas

### To Implement
- Password hashing (bcrypt recommended)
- JWT authentication
- CSRF protection
- Rate limiting
- Input sanitization
- SQL injection prevention
- XSS protection

## Performance Optimizations

- Next.js Image component for optimized images
- Dynamic imports for code splitting
- React.memo for expensive components
- Debounced search inputs
- Lazy loading for chat messages
- Incremental Static Regeneration (ISR) ready

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ features
- CSS Grid and Flexbox
- WebGL for 3D graphics (Three.js)

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Build Output
- Static assets in `.next/static`
- Server-side code in `.next/server`
- Optimized for serverless deployment

## Documentation Files

- `README.md` - Basic Next.js documentation
- `API_SETUP.md` - API endpoint setup guide
- `REDUX_SETUP.md` - Redux state management documentation
- `EXTERNAL_API_INTEGRATION.md` - External API integration guide
- `INTEGRATION_COMPLETE.md` - Integration completion notes
- `API_VALIDATION_FIXES.md` - API validation fixes

## Future Enhancements

### Planned Features
- User authentication with JWT
- Profile editing
- Alumni directory with search/filter
- Event management system
- Photo gallery
- News/announcements
- Job board
- Donation system
- Email notifications
- Push notifications
- Mobile app (React Native)

### Technical Improvements
- Unit tests (Jest, React Testing Library)
- E2E tests (Playwright/Cypress)
- Storybook for component documentation
- CI/CD pipeline
- Docker containerization
- Monitoring and analytics
- Error tracking (Sentry)
- Performance monitoring

## Contributing

### Code Style
- ESLint configuration enforced
- TypeScript strict mode
- Functional components with hooks
- Named exports preferred
- Consistent file naming (camelCase for files, PascalCase for components)

### Git Workflow
- Feature branches
- Descriptive commit messages
- Pull request reviews
- Semantic versioning

## License

[To be determined]

## Contact & Support

- **Project**: KVS Alumni Management Portal
- **Organization**: Kendriya Vidyalaya Sangathan
- **Version**: 0.1.0

---

**Last Updated**: December 8, 2025
**Indexed By**: Kiro AI Assistant
