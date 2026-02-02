# Clerk Authentication - FAQ

## General Questions

### Q: What is Clerk?
**A:** Clerk is a complete authentication and user management solution. It provides:
- Secure password hashing and storage
- Social login (Google, GitHub, Microsoft, etc.)
- Email verification
- Multi-factor authentication (MFA)
- User management dashboard
- Admin controls
- Compliance with security standards

### Q: Why use Clerk instead of manual JWT authentication?
**A:** 
- Security is handled by experts (no risk of password leaks)
- Less code to write and maintain
- Free tier is generous
- Automatic updates to security standards
- Built-in UI components
- Webhooks for user events

### Q: Is Clerk free?
**A:** Yes! The free tier includes:
- Up to 10,000 monthly active users
- All authentication methods
- Webhooks
- Admin dashboard
- Email/SMS sending

---

## Setup Questions

### Q: Where do I get the Clerk keys?
**A:** 
1. Go to https://dashboard.clerk.com
2. Sign in or create account
3. Click your project name
4. Go to **"API Keys"** in the left sidebar
5. Copy **Publishable Key** (starts with `pk_`) - use in frontend
6. Copy **Secret Key** (starts with `sk_`) - use in backend

### Q: What goes in `.env.local`?
**A:** Only the **Publishable Key**:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```
**DO NOT put the Secret Key in frontend** - it will be exposed to users.

### Q: Where does the Secret Key go?
**A:** In backend `.env` only:
```env
CLERK_SECRET_KEY=sk_test_xxxxx
```

### Q: Can I use the built-in Clerk pages or do I need custom ones?
**A:** Both work!
- **Easy way**: Use Clerk's built-in `<SignIn>` and `<SignUp>` components (already set up for you)
- **Custom way**: Use Clerk hooks in your own forms (see [usePost.example.ts](e-commerce-frontend/src/hooks/api/usePost.example.ts))

---

## Integration Questions

### Q: How do I send the Clerk token to my backend?
**A:** Add it to the Authorization header:
```tsx
const { getToken } = useAuth();
const token = await getToken();

const response = await fetch('/api/endpoint', {
  headers: {
    Authorization: `Bearer ${token}`,
  }
});
```

See [usePost.example.ts](e-commerce-frontend/src/hooks/api/usePost.example.ts) for complete example.

### Q: How do I verify Clerk tokens on the backend?
**A:** The middleware already does this:
```ts
import { verifyToken } from '@clerk/backend';

const decoded = await verifyToken(token, {
  secretKey: process.env.CLERK_SECRET_KEY
});
// decoded will contain user id, email, etc.
```

See [auth.middleware.ts](e-commerce-backend/src/middleware/auth.middleware.ts).

### Q: Can I still use JWT tokens?
**A:** Yes! The middleware supports both:
- First tries Clerk tokens
- Falls back to JWT if Clerk verification fails
- Sets `req.user.isClerk` flag to indicate which was used

---

## Frontend Questions

### Q: How do I access the logged-in user?
**A:** Use the `useUser()` hook:
```tsx
import { useUser } from "@clerk/clerk-react";

function MyComponent() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return <div>Hello {user?.firstName}!</div>;
}
```

### Q: How do I get the auth token in a component?
**A:** Use the `useAuth()` hook:
```tsx
import { useAuth } from "@clerk/clerk-react";

function MyComponent() {
  const { getToken, isSignedIn } = useAuth();
  
  const token = await getToken();
  // Use token in API calls
}
```

### Q: How do I sign out a user?
**A:** Use the `useClerk()` hook:
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

### Q: How do I customize the Clerk UI?
**A:** Use the `appearance` prop:
```tsx
<SignIn
  appearance={{
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
      card: 'shadow-lg',
      footerActionLink: 'text-blue-600',
    }
  }}
/>
```

### Q: Why is the auth context showing a typo `useAuhthContext`?
**A:** It's there for backward compatibility. Use it as-is or rename it to `useAuthContext`.

---

## Backend Questions

### Q: Do I need to create a User model?
**A:** No, not required. Clerk manages users. But you can:
- Keep a User model to store extra data (preferences, settings, etc.)
- Use `req.user.id` from Clerk to link them
- Sync user data via webhooks

### Q: How do I link Clerk users to my database?
**A:** Use the user ID from the token:
```ts
app.get('/api/user-profile', authMiddleware, async (req, res) => {
  const clerkUserId = req.user.id; // From Clerk token
  
  // Find/create user in your database
  let user = await UserModel.findOne({ clerkId: clerkUserId });
  if (!user) {
    user = await UserModel.create({
      clerkId: clerkUserId,
      email: req.user.email,
    });
  }
  
  res.json(user);
});
```

### Q: Can I use webhooks to sync user data?
**A:** Yes! Clerk sends webhooks on user events:
1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`
4. Handle the webhook in your backend

---

## Troubleshooting

### Q: I get "Publishable Key not found"
**A:** 
- Check `.env.local` exists in `e-commerce-frontend/`
- Key should start with `pk_`
- Restart dev server after adding env variables
- Browser might be caching old value

### Q: Login redirects to /sign-in instead of my custom page
**A:** The `<SignIn>` component has a default redirect. Configure it:
```tsx
<SignIn
  path="/clerk-login"
  routing="path"
  afterSignInUrl="/dashboard"
/>
```

### Q: 401 Unauthorized on protected endpoints
**A:**
- Check Clerk Secret Key is in backend `.env`
- Verify token is sent in Authorization header: `Bearer {token}`
- Check that middleware is applied to the route
- Verify token is fresh (not expired)

### Q: Token verification fails with "Algorithm not supported"
**A:** Make sure you're using the latest `@clerk/backend` package:
```bash
npm install @clerk/backend@latest
```

### Q: User is not persisting after page reload
**A:**
- Check `ClerkProvider` wraps entire app (in App.tsx)
- Check that ClerkProvider is INSIDE the root component
- Browser might have localStorage disabled
- Check browser console for errors

### Q: Social login shows "Invalid redirect URL"
**A:**
- Go to Clerk Dashboard → Settings → URLs
- Add your localhost and production URLs
- Format: `http://localhost:5173` (no trailing slash)
- Production: `https://yourdomain.com`

### Q: Getting CORS errors from Clerk API
**A:** This is likely a frontend issue:
- Check your Clerk Publishable Key is correct
- Check ClerkProvider has the right key
- Check your API is making requests to correct Clerk endpoints

---

## Advanced Questions

### Q: How do I implement role-based access control (RBAC)?
**A:** Use Clerk's role system:
1. Create roles in Clerk Dashboard
2. Assign roles to users
3. Get roles in token: `user.unsafeMetadata.role`
4. Check in middleware:
```ts
if (req.user.role !== 'admin') {
  return res.status(403).json({ error: 'Not authorized' });
}
```

### Q: How do I add custom claims to the token?
**A:** Use Clerk's metadata system:
1. Store data in `publicMetadata` or `unsafeMetadata`
2. Access in token: `user.publicMetadata`
3. It will be included in token verification

### Q: Can I use Clerk with GraphQL?
**A:** Yes! The token works the same way:
```ts
const token = await getToken(); // In React component
// or from header in resolver
const authHeader = context.request.headers.authorization;
const token = authHeader?.split(' ')[1];
```

### Q: How do I implement passwordless authentication?
**A:** Clerk supports this by default:
1. Go to Clerk Dashboard → Authentication methods
2. Enable "Passwordless (Email/SMS)"
3. Users can sign in without passwords

---

## Resources

- **Clerk Dashboard**: https://dashboard.clerk.com
- **React Docs**: https://clerk.com/docs/quickstarts/react
- **Backend Docs**: https://clerk.com/docs/backend-requests/handling/nodejs
- **API Reference**: https://clerk.com/docs/reference/backend-api
- **Community Chat**: https://discord.com/invite/b5rXHjAg7A
- **Status Page**: https://status.clerk.com

---

## Quick Links in This Project

- [Quick Start Guide](CLERK_QUICK_START.md)
- [Detailed Setup](CLERK_SETUP.md)
- [Implementation Checklist](CLERK_CHECKLIST.md)
- [Login Page](e-commerce-frontend/src/page/clerk-login.tsx)
- [Signup Page](e-commerce-frontend/src/page/clerk-signup.tsx)
- [Auth Middleware](e-commerce-backend/src/middleware/auth.middleware.ts)
- [Hook Example](e-commerce-frontend/src/hooks/api/usePost.example.ts)
- [Dashboard Example](e-commerce-frontend/src/page/dashboard.example.tsx)

---

Still have questions? Check the [Clerk Documentation](https://clerk.com/docs) or ask in the [Clerk Discord Community](https://discord.com/invite/b5rXHjAg7A)!
