# Clerk Integration - Quick Reference

## ✅ What's Already Done

### Frontend Updates
- ✅ `ClerkProvider` configured in [src/App.tsx](e-commerce-frontend/src/App.tsx)
- ✅ Auth context updated to support Clerk in [src/contextapi/auth.tsx](e-commerce-frontend/src/contextapi/auth.tsx)
- ✅ Built-in login page: [src/page/clerk-login.tsx](e-commerce-frontend/src/page/clerk-login.tsx)
- ✅ Built-in signup page: [src/page/clerk-signup.tsx](e-commerce-frontend/src/page/clerk-signup.tsx)
- ✅ Example user profile component: [src/components/clerk-user-profile.tsx](e-commerce-frontend/src/components/clerk-user-profile.tsx)
- ✅ Example hook update: [src/hooks/api/usePost.example.ts](e-commerce-frontend/src/hooks/api/usePost.example.ts)

### Backend Updates
- ✅ `@clerk/backend` added to [package.json](e-commerce-backend/package.json)
- ✅ `clerkSecretKey` added to [src/config/env.ts](e-commerce-backend/src/config/env.ts)
- ✅ Auth middleware updated to verify Clerk tokens in [src/middleware/auth.middleware.ts](e-commerce-backend/src/middleware/auth.middleware.ts)

## 🚀 Next Steps (What You Need to Do)

### 1. Get Clerk API Keys
- Go to https://dashboard.clerk.com
- Create/select your project
- Copy your **Publishable Key** and **Secret Key**

### 2. Set Up Frontend Environment
Create `.env.local` in `e-commerce-frontend/` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Set Up Backend Environment
Create/update `.env` in `e-commerce-backend/` directory:
```env
CLERK_SECRET_KEY=sk_test_your_key_here
MONGO_URI=mongodb://localhost:27017/unitdeals
JWT_SECRET_KEY=your_jwt_secret_key
PORT=8000
NODE_ENV=development
```

### 4. Install Dependencies
```bash
# Frontend
cd e-commerce-frontend
npm install

# Backend
cd e-commerce-backend
npm install
```

### 5. Update Your API Hooks
Copy the example from [usePost.example.ts](e-commerce-frontend/src/hooks/api/usePost.example.ts) to your actual `usePost.ts` file.

Key change: Add `getToken` from `@clerk/clerk-react` and include the Clerk token in Authorization headers.

### 6. Update Your Routes
Add these routes to your routing configuration:
```tsx
{
  path: "/clerk-login",
  element: <ClerkLogin />,
},
{
  path: "/clerk-signup",
  element: <ClerkSignUp />,
},
```

### 7. Update Your Header/Navbar (Optional)
Replace your current user button with the example from [clerk-user-profile.tsx](e-commerce-frontend/src/components/clerk-user-profile.tsx).

### 8. Test the Flow
```bash
# Terminal 1: Start frontend
cd e-commerce-frontend
npm run dev

# Terminal 2: Start backend
cd e-commerce-backend
npm run dev
```

Then:
1. Visit http://localhost:5173/clerk-login
2. Sign up with email or social provider
3. You should be logged in and redirected to dashboard
4. Auth context will be populated with user data

## 📚 Key Clerk Hooks

Use these in any component:

```tsx
import { useAuth, useUser, useSignIn, useSignUp } from "@clerk/clerk-react";

// Get authenticated user info
const { user } = useUser();

// Get auth state and token
const { isLoaded, isSignedIn, getToken } = useAuth();

// For custom sign in
const { signIn } = useSignIn();

// For custom sign up
const { signUp } = useSignUp();
```

## 🔐 Protected Endpoints

Your backend endpoints will now receive Clerk tokens:

```ts
// In your route
router.get('/api/protected', authMiddleware, (req, res) => {
  // req.user = { id: "user_123", email: "user@example.com", isClerk: true }
  res.json({ user: req.user });
});
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Publishable Key not found" | Add `VITE_CLERK_PUBLISHABLE_KEY` to `.env.local` and restart dev server |
| 401 Unauthorized on API calls | Verify Clerk secret key in backend `.env` |
| User not persisting after refresh | Check ClerkProvider wraps your entire app |
| Social login not working | Enable OAuth providers in Clerk Dashboard |

## 📖 Full Documentation

- [CLERK_SETUP.md](CLERK_SETUP.md) - Detailed setup guide
- [Clerk React Docs](https://clerk.com/docs/quickstarts/react)
- [Clerk Backend Docs](https://clerk.com/docs/backend-requests/handling/nodejs)

## 💡 Tips

- Use the built-in Clerk components (`SignIn`, `SignUp`, `UserButton`) for fastest implementation
- Clerk handles password hashing, security, and compliance for you
- You can customize the appearance of Clerk components via `appearance` prop
- The auth context now automatically syncs with Clerk authentication state
- Your backend middleware supports both Clerk and JWT tokens for flexibility

---

Need help? Check [CLERK_SETUP.md](CLERK_SETUP.md) for detailed instructions!
