# **E-Learning Platform MVP Development Plan**

## **📋 Project Overview**
- **Timeline**: 4 weeks (28 days)
- **Tech Stack**: Next.js 14 + Supabase + TypeScript + Tailwind CSS
- **Goal**: Functional MVP with 3 user roles and learning path system
- **Repository**: https://github.com/ayefimenko/horizon.git
- **Git Email**: ayefimenko1337@gmail.com

## **🏗️ Architecture Principles (Following Rules.md)**
- **SOLID Principles**: Each component has single responsibility
- **KISS**: Simple solutions over complex ones
- **DRY**: Reusable components and utilities
- **Clean Code**: Files under 200-300 lines, organized structure
- **Environment-Aware**: Dev, test, prod configurations
- **No Mocking**: Real data only (tests excluded)

---

## **Week 1: Foundation & Authentication (Days 1-7)**

### **Day 1: Project Setup & Configuration**
#### **Morning Tasks (3-4 hours)**
- [ ] **Initialize Next.js Project**
  ```bash
  npx create-next-app@latest sharkQA --typescript --tailwind --eslint --app
  cd sharkQA
  ```
- [ ] **Install Core Dependencies**
  ```bash
  pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
  pnpm add @hookform/resolvers react-hook-form zod
  pnpm add lucide-react class-variance-authority clsx tailwind-merge
  pnpm add -D @types/node
  ```
- [ ] **Configure Git with correct email**
  ```bash
  git config user.email "ayefimenko1337@gmail.com"
  git config user.name "Anton Efimenko"
  ```

#### **Afternoon Tasks (3-4 hours)**
- [ ] **Project Structure Setup**
  ```
  src/
  ├── app/
  ├── components/
  │   ├── ui/ (Shadcn components)
  │   ├── auth/
  │   ├── course/
  │   ├── path/
  │   └── dashboard/
  ├── lib/
  │   ├── supabase.ts
  │   ├── auth.ts
  │   ├── database.ts
  │   └── utils.ts
  ├── types/
  └── styles/
  ```
- [ ] **Environment Configuration**
  - Create `.env.local` (dev)
  - Create `.env.example` (template)
  - Configure environment variables for Supabase
- [ ] **Tailwind & Shadcn Setup**
  - Configure custom theme
  - Install initial Shadcn components

#### **Rules Check**: ✅ Clean organization, environment-aware setup, correct git config

### **Day 2: Supabase Setup & Database Design**
#### **Morning Tasks (3-4 hours)**
- [ ] **Create Supabase Project**
  - Set up new Supabase project
  - Configure authentication settings
  - Set up database connection
- [ ] **Database Schema Design**
  ```sql
  -- Core Tables
  CREATE TABLE profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'teacher', 'student')),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE learning_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    difficulty_level TEXT,
    estimated_duration INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    content JSONB,
    video_url TEXT,
    materials_url TEXT[],
    duration INTEGER,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```

#### **Afternoon Tasks (3-4 hours)**
- [ ] **Database Relationships & Policies**
  ```sql
  -- Path-Course Relationships
  CREATE TABLE path_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT true,
    order_index INTEGER,
    prerequisites UUID[]
  );

  -- Student Progress
  CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id),
    path_id UUID REFERENCES learning_paths(id),
    enrolled_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    progress_percentage INTEGER DEFAULT 0
  );
  ```
- [ ] **Row Level Security (RLS) Policies**
  - User role-based access policies
  - Data isolation between users
  - Secure API access patterns

#### **Rules Check**: ✅ No mocking data, environment-aware database setup

### **Day 3-4: Authentication System**
#### **Implementation Tasks**
- [ ] **Supabase Auth Integration** (`lib/supabase.ts`)
- [ ] **Authentication Middleware** (`middleware.ts`)
- [ ] **Login/Register Components** (`components/auth/`)
- [ ] **Role-based Route Protection**
- [ ] **User Profile Management**

#### **Components to Create**
```typescript
// components/auth/LoginForm.tsx - Single responsibility: Login
// components/auth/RegisterForm.tsx - Single responsibility: Registration  
// components/auth/ProfileForm.tsx - Single responsibility: Profile management
// lib/auth.ts - Authentication utilities (DRY principle)
```

#### **Rules Check**: ✅ Single responsibility per component, no code duplication

### **Day 5-7: User Interface Foundation**
- [ ] **Layout Components** (`components/layout/`)
- [ ] **Navigation System** (role-based)
- [ ] **Dashboard Shells** (empty dashboards for each role)
- [ ] **Form Components** (reusable, following DRY)
- [ ] **Testing Authentication Flow**

#### **Testing Protocol (Following Rules)**
- [ ] Kill all existing servers: `pkill -f "next"` 
- [ ] Start fresh server: `pnpm dev`
- [ ] Test all authentication flows
- [ ] Verify role-based access

---

## **Week 2: Core Functionality (Days 8-14)**

### **Day 8-9: Admin Dashboard & User Management**
#### **Implementation Focus**
- [ ] **Admin User Management** (CRUD operations)
- [ ] **Role Assignment System**
- [ ] **User Invitation System**
- [ ] **Dashboard Analytics (Basic)**

#### **Components Architecture**
```typescript
// components/dashboard/admin/UserManagement.tsx
// components/dashboard/admin/UserTable.tsx  
// components/dashboard/admin/UserForm.tsx
// lib/admin.ts - Admin utilities
```

#### **Rules Check**: ✅ Iterate on existing patterns, keep files under 300 lines

### **Day 10-11: Course Management System**
#### **Implementation Tasks**
- [ ] **Course Creation Form** (rich text editor)
- [ ] **Course Listing & Filtering**
- [ ] **Course Categories/Tags**
- [ ] **File Upload System** (Supabase Storage)
- [ ] **Content Management**

#### **Rules Check**: ✅ Focus only on course-related functionality

### **Day 12-14: Learning Path System**
- [ ] **Path Creation Interface**
- [ ] **Course-Path Relationship Management**
- [ ] **Prerequisites System**
- [ ] **Path Preview Components**

#### **Server Testing Protocol**
- [ ] Stop existing servers
- [ ] `pnpm dev` fresh start
- [ ] Test course creation flow
- [ ] Test path creation flow

---

## **Week 3: Student Experience (Days 15-21)**

### **Day 15-16: Enrollment System**
- [ ] **Path Browsing Interface**
- [ ] **Enrollment Logic**
- [ ] **"My Learning" Dashboard**
- [ ] **Access Control Implementation**

### **Day 17-18: Course Consumption**
- [ ] **Course Viewer Component**
- [ ] **Content Navigation**
- [ ] **Progress Tracking Logic**
- [ ] **Bookmarking System**

### **Day 19-21: Progress & Completion**
- [ ] **Progress Calculation** (algorithms)
- [ ] **Visual Progress Indicators**
- [ ] **Completion Certificates**
- [ ] **Achievement System**

#### **Rules Check**: ✅ Write thorough tests for progress calculations

---

## **Week 4: Polish & Deployment (Days 22-28)**

### **Day 22-23: Teacher Tools**
- [ ] **Teacher Dashboard**
- [ ] **Student Progress Monitoring**
- [ ] **Course Analytics**
- [ ] **Communication Tools**

### **Day 24-25: Final Admin Features**
- [ ] **Advanced Analytics**
- [ ] **System Configuration**
- [ ] **Reporting Tools**
- [ ] **Content Moderation**

### **Day 26-28: Testing & Deployment**
- [ ] **Comprehensive Testing**
  - Unit tests for utilities
  - Integration tests for flows
  - E2E tests for critical paths
- [ ] **Performance Optimization**
- [ ] **Security Audit**
- [ ] **Production Deployment**
- [ ] **Documentation**

---

## **🔄 Daily Development Workflow**

### **Before Starting Each Day:**
1. **Check Rules.md** - Review relevant guidelines
2. **Kill existing servers** - `pkill -f "next"`
3. **Pull latest changes** - `git pull origin main`
4. **Check git config** - `git config user.email`

### **During Development:**
1. **Follow SOLID principles** - Single responsibility components
2. **Keep It Simple** - Avoid over-engineering
3. **DRY principle** - Check for existing similar code
4. **Stay focused** - Only touch relevant code
5. **Environment awareness** - Consider dev/test/prod

### **End of Day:**
1. **Test changes** - Fresh server restart
2. **Commit with clear messages**
3. **Push to remote** - Keep repository updated
4. **Document any architectural decisions**

---

## **🎯 MVP Success Criteria**

### **Core Functionality**
- [ ] All 3 user roles authenticate successfully
- [ ] Admins can create/manage learning paths and courses
- [ ] Teachers can create and manage course content
- [ ] Students can enroll in paths and complete courses
- [ ] Progress tracking works accurately
- [ ] Application deployed and accessible

### **Code Quality (Following Rules)**
- [ ] All files under 300 lines
- [ ] No code duplication (DRY)
- [ ] Clean, organized structure
- [ ] Environment-aware configuration
- [ ] No mocked data in dev/prod
- [ ] Proper git attribution

### **Performance & Security**
- [ ] Fast loading times
- [ ] Secure authentication
- [ ] Role-based access control
- [ ] Data validation throughout

---

## **🚨 Risk Mitigation**

### **High-Risk Areas**
1. **Complex Progress Tracking** - Fallback: Simple percentage
2. **Rich Content Editor** - Fallback: Plain textarea
3. **File Uploads** - Phase 2 if needed
4. **Video Integration** - Start with YouTube embeds

### **Rules-Based Risk Management**
- **Don't over-engineer** - Follow KISS principle
- **Iterate on existing** - Don't create new patterns unnecessarily
- **Test thoroughly** - Always restart servers for testing
- **Stay focused** - Don't touch unrelated code

---

## **📋 Phase 2 Roadmap (Post-MVP)**
- Advanced analytics and AI recommendations
- Mobile application
- Interactive exercises and quizzes
- Community features and forums
- Third-party integrations
- Advanced content management

---

## **✅ Daily Checklist Template**

```markdown
## Day X: [Task Name]

### Pre-Development
- [ ] Reviewed Rules.md
- [ ] Killed existing servers
- [ ] Pulled latest changes
- [ ] Verified git config

### Development Tasks
- [ ] [Specific task 1]
- [ ] [Specific task 2]
- [ ] [Specific task 3]

### Quality Checks
- [ ] Files under 300 lines
- [ ] No code duplication
- [ ] Single responsibility principle
- [ ] Environment-aware code

### Testing
- [ ] Fresh server restart
- [ ] Functionality testing
- [ ] Cross-role testing

### End of Day
- [ ] Clear commit messages
- [ ] Pushed to remote
- [ ] Documented decisions
```

This plan ensures we follow all the rules while building a robust, scalable MVP within the 4-week timeline. 