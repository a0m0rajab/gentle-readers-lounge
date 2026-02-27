

## Admin Dashboard Plan

### 1. Database Setup (Migration)

- Create `app_role` enum (`admin`, `user`)
- Create `user_roles` table with RLS
- Create `has_role()` security definer function
- Add SELECT policies on `contact_submissions`, `newsletter_signups`, `membership_signups` for admin users only
- Create a `profiles` table with trigger to auto-create on signup

### 2. Authentication Pages

- **`/login`** — Email/password login form
- **`/signup`** — Email/password signup form (new users get `user` role by default; first admin must be assigned via database)
- **`/reset-password`** — Password reset page
- Auth context/provider wrapping the app for session management

### 3. Admin Dashboard (`/admin`)

- **Protected route** — redirects to `/login` if not authenticated or not admin
- **Stats overview cards** at the top: total newsletter signups, total contact submissions, total membership signups
- **Three tabbed sections** showing data tables for:
  - Newsletter signups (email, date)
  - Contact submissions (name, email, message, date)
  - Membership signups (name, email, type, genres, source, date)
- Data fetched from database using the authenticated admin session

### 4. Routing Updates

- Add `/login`, `/signup`, `/reset-password`, `/admin` routes to `App.tsx`
- Create `ProtectedRoute` component that checks admin role

### 5. Admin Seeding

- After migration, the first admin user will need to be manually assigned by inserting a row into `user_roles` via the backend. Instructions will be provided.

### Technical Notes

- Roles stored in separate `user_roles` table per security requirements
- `has_role()` function avoids RLS recursion
- SELECT policies added only for admin role on the three data tables
- Email confirmation required for signup (no auto-confirm)

