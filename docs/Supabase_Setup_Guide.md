# Supabase Setup Guide - Day 2

## Prerequisites
- GitHub account
- Access to [https://supabase.com](https://supabase.com)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in with GitHub
3. Click "New Project"
4. Fill project details:
   - **Name**: `shark-qa-mvp`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest region
   - **Plan**: Free tier

## Step 2: Set Up Database Schema

1. In Supabase dashboard, go to **"SQL Editor"**
2. Click **"New Query"**
3. Copy contents of `docs/database_schema.sql`
4. Paste and click **"Run"**

## Step 3: Configure Authentication

1. Go to **"Authentication"** > **"Settings"**
2. Set **Site URL**: `http://localhost:3000`
3. Add **Redirect URL**: `http://localhost:3000/auth/callback`

## Step 4: Get Environment Variables

1. Go to **"Settings"** > **"API"**
2. Copy:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep secret!)

3. Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 5: Test Connection

1. Run `npm run dev`
2. Check for Supabase connection errors
3. Verify tables created in Supabase dashboard

## Step 6: Create First Admin User

1. In **"Authentication"** > **"Users"**, invite yourself
2. Complete signup process
3. In **"SQL Editor"**, run:
```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Your Name'
WHERE email = 'your-email@example.com';
```

## Verification Checklist

- [ ] All 6 tables created
- [ ] RLS policies enabled
- [ ] Admin user created
- [ ] Environment variables set
- [ ] Next.js app connects successfully

## Troubleshooting

**Missing environment variables**: Check `.env.local` exists and restart dev server
**RLS errors**: Verify user authentication and role assignment
**Connection fails**: Check Supabase project status and API keys
