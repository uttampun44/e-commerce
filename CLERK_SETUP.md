# Clerk Authentication Setup Guide

## Step 1: Get Your Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or select your project
3. Go to **API Keys** section
4. Copy your:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

## Step 2: Frontend Setup

### Update `.env.local` (Create if doesn't exist)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_your_publishable_key_here
```

### Verify ClerkProvider in `src/App.tsx`
Your App.tsx already has ClerkProvider configured correctly:
```tsx
import { ClerkProvider } from '@clerk/clerk-react'

function App() {
  const queryClient = new QueryClient();
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <CombineContextProvider>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </CombineContextProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
```

### Update Your Routes
Add these new routes to your [Routes.tsx](src/routes/Routes.tsx):
```tsx
import ClerkLogin from "@/page/clerk-login";
import ClerkSignUp from "@/page/clerk-signup";

// Add to your route configuration
{
  path: "/clerk-login",
  element: <ClerkLogin />,
},
{
  path: "/clerk-signup",
  element: <ClerkSignUp />,
},
```

### Update ProtectedRoutes (Optional)
Your [ProtectRoutes.tsx](src/routes/ProtectRoutes.tsx) is already set up to check the auth context which now supports Clerk.

## Step 3: Backend Setup

### Install Clerk Backend SDK
```bash
cd e-commerce-backend
npm install @clerk/backend
```

### Update `.env` file (Backend)
```env
CLERK_SECRET_KEY=sk_your_secret_key_here
MONGO_URI=mongodb://localhost:27017/unitdeals
JWT_SECRET_KEY=your_jwt_secret_key
PORT=8000
NODE_ENV=development
```

### Verify Middleware Updates
The auth middleware has been updated to support Clerk tokens. It will:
1. First try to verify the token as a Clerk token
2. Fall back to JWT verification if Clerk fails
3. Mark the request with `isClerk: true` or `isClerk: false` so you know the source

## Step 4: Update Your Login/Signup Pages

### Option A: Use Built-in Clerk Components (Recommended)
We've created two new pages that use Clerk's complete UI:
- [clerk-login.tsx](src/page/clerk-login.tsx) - Use for `/clerk-login` route
- [clerk-signup.tsx](src/page/clerk-signup.tsx) - Use for `/clerk-signup` route

These provide:
- Complete authentication UI
- Social login (Google, GitHub, etc.)
- Email/password authentication
- Multi-factor authentication
- Profile management

### Option B: Custom Login Page
If you want to keep your custom login form, use the Clerk hooks in your current login page:

```tsx
import { useAuth, useUser } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";

export default function Login() {
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();
  
  const handleClerkLogin = async (email: string, password: string) => {
    if (!isLoaded) return;
    
    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });
      
      if (result.status === 'complete') {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Clerk login error:', err);
    }
  };
  
  // ... rest of your form
}
```

## Step 5: Making API Calls with Clerk Token

### In Your Hooks (useGet.ts, usePost.ts)
Update your API hooks to send Clerk tokens:

```tsx
import { useAuth } from "@clerk/clerk-react";

export const usePost = (url: string, options: any = {}) => {
  const { getToken } = useAuth();
  
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const token = await getToken();
      const headers = {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` })
      };
      
      const response = await axios.post(url, data, { headers });
      return response.data;
    },
    ...options,
  });
  
  return mutation;
};
```

## Step 6: Backend Endpoint Authentication

Your endpoints should look like:

```ts
import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();

// Protected endpoint
router.get('/protected-route', authMiddleware, async (req, res) => {
  // req.user will contain { id, email, isClerk: boolean }
  res.json({ message: 'Authenticated!', user: req.user });
});

export default router;
```

## Step 7: Testing

1. **Start your frontend:**
   ```bash
   cd e-commerce-frontend
   npm run dev
   ```

2. **Start your backend:**
   ```bash
   cd e-commerce-backend
   npm install  # if not already installed
   npm run dev
   ```

3. **Test login flow:**
   - Navigate to `/clerk-login`
   - Sign in with email or social provider
   - You should be redirected to `/dashboard`
   - Your auth context will be populated with Clerk user data

## Step 8: User Profile Access

In any component, you can access the Clerk user:

```tsx
import { useUser } from "@clerk/clerk-react";

function MyComponent() {
  const { user } = useUser();
  
  return (
    <div>
      <p>Welcome, {user?.firstName}!</p>
      <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
    </div>
  );
}
```

## Step 9: Logout

Users will see a logout button in the user menu in your app's UI. To manually handle logout:

```tsx
import { useClerk } from "@clerk/clerk-react";

function LogoutButton() {
  const { signOut } = useClerk();
  
  return (
    <button onClick={() => signOut({ redirectUrl: "/" })}>
      Logout
    </button>
  );
}
```

## Troubleshooting

### "Add your Clerk Publishable Key to the .env file"
- Make sure you have `.env.local` with `VITE_CLERK_PUBLISHABLE_KEY=pk_...`
- Restart your dev server after adding env variables

### 401 Unauthorized on API calls
- Verify Clerk secret key is in backend `.env`
- Make sure token is being sent in Authorization header
- Check that ClerkProvider wraps your entire app

### User not persisting on refresh
- Check browser localStorage for authToken
- Verify ClerkProvider is loading correctly
- Check browser console for errors

## Resources

- [Clerk React Documentation](https://clerk.com/docs/quickstarts/react)
- [Clerk Backend Documentation](https://clerk.com/docs/backend-requests/handling/nodejs)
- [Clerk API Reference](https://clerk.com/docs/reference/backend-api)

## Next Steps

1. ✅ Set up Clerk keys in environment
2. ✅ Install backend dependencies
3. ✅ Test login/signup flow
4. ✅ Verify protected routes work
5. Create user profile syncing (optional)
6. Set up webhooks for user events (optional)
7. Add additional middleware for role-based access
