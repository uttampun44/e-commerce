# Clerk Authentication - Visual Overview

## 🔄 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLERK AUTHENTICATION FLOW                    │
└─────────────────────────────────────────────────────────────────┘

USER INTERACTION:
┌──────────────────┐
│   User Opens     │
│  /clerk-login    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Clerk SignIn Component              │
│  (Email/Social Options)              │
└────────┬─────────────────────────────┘
         │ User enters credentials
         │ or clicks social provider
         ▼
┌──────────────────────────────────────┐
│  Clerk Backend Verifies              │
│  (Secure Password Hash)              │
└────────┬─────────────────────────────┘
         │ Success
         ▼
┌──────────────────────────────────────┐
│  Clerk Issues JWT Token              │
│  (Includes user ID, email, etc.)     │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Frontend Receives Token             │
│  - Stores in context                 │
│  - Saves to localStorage             │
│  - Updates useAuth() hook            │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Redirects to /dashboard             │
│  (User is authenticated!)            │
└──────────────────────────────────────┘


API CALL WITH TOKEN:
┌──────────────────┐
│  Component       │
│  Calls API       │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  usePost() Hook                      │
│  1. Gets token via getToken()        │
│  2. Adds to Authorization header     │
│  3. Sends: Bearer {token}            │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Backend Receives Request            │
│  - Extracts token from header        │
│  - Runs through authMiddleware       │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Middleware Verifies Token           │
│  - Uses Clerk SDK to verify          │
│  - Extracts user info                │
│  - Sets req.user                     │
└────────┬─────────────────────────────┘
         │ Token valid
         ▼
┌──────────────────────────────────────┐
│  Endpoint Executes                   │
│  (Can access req.user)               │
│  Returns protected data              │
└──────────────────────────────────────┘
```

---

## 🏗️ Architecture Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                         YOUR FRONTEND                          │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  App.tsx                                                │  │
│  │  └─ ClerkProvider (Wraps entire app)                   │  │
│  │     └─ QueryClientProvider                             │  │
│  │        └─ CombineContextProvider                       │  │
│  │           ├─ AuthContextProvider (Syncs with Clerk)   │  │
│  │           └─ AppRoutes                                 │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Routes                                                 │  │
│  │  ├─ /clerk-login    → SignIn component                │  │
│  │  ├─ /clerk-signup   → SignUp component                │  │
│  │  ├─ /dashboard      → Protected (via ProtectRoutes)   │  │
│  │  └─ /products       → Protected (via ProtectRoutes)   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Hooks & Components                                     │  │
│  │  ├─ useAuth()       → Get token, isSignedIn           │  │
│  │  ├─ useUser()       → Get user info                   │  │
│  │  ├─ usePost()       → Make authenticated API calls    │  │
│  │  └─ useGet()        → Fetch authenticated data        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└───────────────────────────────────────────────────────────────┘
                              ▲
                              │ Token in Authorization header
                              │ Bearer {clerk_token}
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                       YOUR BACKEND                             │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Express Server (server.ts)                            │  │
│  │  └─ CORS configured                                    │  │
│  │  └─ Routes defined                                     │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Middleware (auth.middleware.ts)                        │  │
│  │  └─ Verifies Clerk tokens using @clerk/backend        │  │
│  │  └─ Falls back to JWT verification                    │  │
│  │  └─ Sets req.user with user data                      │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Protected Routes                                       │  │
│  │  ├─ POST /api/v1/products        (with authMiddleware) │  │
│  │  ├─ GET  /api/v1/user-profile    (with authMiddleware) │  │
│  │  └─ DELETE /api/v1/products/:id  (with authMiddleware) │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Database (MongoDB)                                     │  │
│  │  └─ User data (optional - Clerk handles auth)          │  │
│  │  └─ Application data                                   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└───────────────────────────────────────────────────────────────┘
                              ▲
                              │ Verifies token
                              │ Returns data
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                      CLERK (External)                          │
├───────────────────────────────────────────────────────────────┤
│  • Manages users & passwords                                  │
│  • Issues JWT tokens                                          │
│  • Handles social login                                       │
│  • Manages sessions                                           │
│  • Verifies tokens                                            │
└───────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Sequence

```
┌────────────────┐        ┌────────────────┐        ┌────────────┐
│   FRONTEND     │        │    BACKEND     │        │   CLERK    │
└────────────────┘        └────────────────┘        └────────────┘
       │                           │                        │
       │ 1. User clicks login     │                        │
       ├──────────────────────────>│                        │
       │                           │                        │
       │ 2. Redirects to           │                        │
       │    /clerk-login           │                        │
       │◄──────────────────────────┤                        │
       │                           │                        │
       │ 3. Clerk SignIn form      │                        │
       │    rendered               │                        │
       │                           │                        │
       │ 4. User enters email      │                        │
       │    & password             │                        │
       │                           │                        │
       │ 5. Submit to Clerk        │                        │
       ├───────────────────────────────────────────────────>│
       │                           │                        │
       │                           │ 6. Verify password    │
       │                           │    Hash check         │
       │                           │                        │
       │ 7. Return JWT token       │                        │
       │<───────────────────────────────────────────────────┤
       │                           │                        │
       │ 8. Store token locally    │                        │
       │ 9. Redirect to /dashboard │                        │
       │                           │                        │
       │ 10. Make API call         │                        │
       │     (with token)          │                        │
       ├──────────────────────────>│                        │
       │   Authorization: Bearer.. │                        │
       │                           │                        │
       │                           │ 11. Extract token    │
       │                           │ 12. Verify with      │
       │                           │     Clerk (cached)   │
       │                           │ 13. Get user ID      │
       │                           │                        │
       │                           │ 14. Execute handler  │
       │                           │ 15. Return response  │
       │<──────────────────────────┤                        │
       │                           │                        │
       │ 16. Display data          │                        │
       │                           │                        │
```

---

## 🔐 Security Architecture

```
FRONTEND (BROWSER)
├─ User credentials entered
│  └─ NEVER sent to your backend
│  └─ Sent directly to Clerk
├─ Receives JWT token from Clerk
│  └─ Stored in memory + localStorage
│  └─ Sent in Authorization header
└─ Token used for all API calls

BACKEND (NODEJS)
├─ Receives request with token
├─ Verifies token:
│  ├─ Check signature (using Clerk secret key)
│  ├─ Check expiration
│  └─ Check claims
├─ Extracts user ID from verified token
├─ Never stores/validates passwords
└─ Returns protected data

CLERK (EXTERNAL SERVICE)
├─ Manages user passwords (hashed with bcrypt)
├─ Issues cryptographically signed tokens
├─ Revokes tokens on logout
├─ Handles security updates
└─ Provides verification without storing passwords

YOUR USERS
├─ Never shares password with you
├─ Uses Clerk's secure infrastructure
├─ Password never stored in your database
└─ Uses standardized JWT security
```

---

## 📈 Request/Response Cycle

### Login Request
```
┌─────────────────────────────────────────┐
│ Frontend                                │
├─────────────────────────────────────────┤
│ POST /clerk-login                       │
│ Body: {                                 │
│   email: "user@example.com",            │
│   password: "securePassword123"         │
│ }                                       │
└──────────┬────────────────────────────┘
           │ (to Clerk, not your backend)
           ▼
┌─────────────────────────────────────────┐
│ Clerk Auth Server                       │
├─────────────────────────────────────────┤
│ 1. Find user by email                   │
│ 2. Verify password (bcrypt)             │
│ 3. Generate JWT token                   │
│ 4. Return token + user info             │
└──────────┬────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Frontend                                │
├─────────────────────────────────────────┤
│ Response: {                             │
│   token: "eyJhbGc...",  ← JWT Token    │
│   user: {                               │
│     id: "user_123",                     │
│     email: "user@example.com",          │
│     firstName: "John",                  │
│     lastName: "Doe"                     │
│   }                                     │
│ }                                       │
│                                         │
│ Actions:                                │
│ ✓ Store token in context                │
│ ✓ Save to localStorage                  │
│ ✓ Set in useAuth() hook                 │
│ ✓ Redirect to /dashboard                │
└─────────────────────────────────────────┘
```

### API Request with Token
```
┌─────────────────────────────────────────┐
│ Frontend                                │
├─────────────────────────────────────────┤
│ GET /api/v1/products                    │
│ Headers: {                              │
│   Authorization: "Bearer eyJhbGc...",   │
│   Content-Type: "application/json"      │
│ }                                       │
└──────────┬────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Backend - Auth Middleware               │
├─────────────────────────────────────────┤
│ 1. Extract token from header            │
│ 2. Call verifyToken(token, secretKey)   │
│ 3. Verify signature with Clerk secret   │
│ 4. Check expiration                     │
│ 5. Extract claims (user ID, email)      │
│ 6. Set req.user = { id, email, ... }    │
│ 7. Continue to endpoint                 │
└──────────┬────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Backend - Route Handler                 │
├─────────────────────────────────────────┤
│ Now can use req.user:                   │
│ - req.user.id                           │
│ - req.user.email                        │
│                                         │
│ Example:                                │
│ const products = await Product.find({   │
│   userId: req.user.id                   │
│ })                                      │
└──────────┬────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│ Frontend                                │
├─────────────────────────────────────────┤
│ Response: [...]                         │
│ Status: 200 OK                          │
│                                         │
│ Data displayed to user                  │
└─────────────────────────────────────────┘
```

---

## 🛠️ Component Relationships

```
App.tsx
  └─ ClerkProvider
      ├─ Provides: useAuth(), useUser(), etc.
      │
      └─ CombineContextProvider
          ├─ AuthContextProvider
          │  ├─ Reads from: useAuth(), useUser()
          │  ├─ Provides: useAuhthContext()
          │  └─ Syncs: Clerk user ↔ Local context
          │
          └─ AppRoutes
              ├─ /clerk-login
              │  └─ SignIn component (Clerk)
              ├─ /clerk-signup
              │  └─ SignUp component (Clerk)
              ├─ /dashboard
              │  └─ ProtectRoutes
              │     ├─ Checks: useAuhthContext()
              │     └─ Renders: Backend layout
              └─ /products
                 └─ Uses: usePost(), useGet()
                    ├─ Calls getToken() from Clerk
                    └─ Sends token in API requests
```

---

## 🎯 Token Lifecycle

```
Token Issued
    │
    ▼
┌─────────────────┐
│ JWT Token       │
│ ├─ Header       │ ← Algorithm, token type
│ ├─ Payload      │ ← User ID, email, issued time, expiration
│ └─ Signature    │ ← Signed with Clerk secret key
└────────┬────────┘
         │
         ├─ Stored in localStorage
         │
         ├─ Stored in memory (useAuth)
         │
         └─ Sent with API requests
            │
            ▼
         ┌─────────────────────┐
         │ Backend Receives    │
         ├─────────────────────┤
         │ 1. Extract token    │
         │ 2. Verify signature │
         │ 3. Check expiry     │
         │ 4. Extract claims   │
         └─────────────────────┘
            │
            ├─ Valid: Process request
            │
            └─ Invalid/Expired: Return 401
               └─ Frontend redirects to login

Token Expiration
    │
    ▼
Automatically refreshed by Clerk
    │
    ▼
New token issued
    │
    ▼
useAuth() hook updates
    │
    ▼
API calls use new token

User Logs Out
    │
    ▼
signOut() called
    │
    ├─ Clear localStorage
    │
    ├─ Clear memory
    │
    ├─ Revoke token (Clerk)
    │
    └─ Redirect to /
```

---

This visual overview shows how everything connects together. Refer to this when trying to understand the authentication flow!
