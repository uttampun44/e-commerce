# Clerk Authentication - Production Deployment Guide

## 🚀 Before Deploying

### Pre-Deployment Checklist
- [ ] All local testing passes
- [ ] No hardcoded secrets in code
- [ ] Environment variables set up properly
- [ ] Clerk production keys obtained
- [ ] HTTPS enabled for your domain
- [ ] CORS configured for your domain
- [ ] Clerk redirect URLs configured

---

## 🔧 Environment Setup for Production

### Create Production Clerk Keys
1. Go to https://dashboard.clerk.com
2. Create new environment (or use default)
3. Get production:
   - **Publishable Key** (pk_live_...)
   - **Secret Key** (sk_live_...)

### Frontend Production (.env.production)
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
VITE_API_URL=https://api.yourdomain.com
```

### Backend Production (.env.production)
```env
CLERK_SECRET_KEY=sk_live_your_production_key
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET_KEY=your_secure_random_key_min_32_chars
PORT=8000
NODE_ENV=production
```

---

## 🎯 Clerk Dashboard Configuration

### 1. Configure Redirect URLs
In Clerk Dashboard → Settings → URLs:
```
Allowed redirect URLs:
- https://yourdomain.com
- https://yourdomain.com/dashboard
- https://yourdomain.com/products
```

### 2. Configure Allowed Origins
In Clerk Dashboard → Settings → CORS/Origins:
```
Allowed Origins:
- https://yourdomain.com
- https://www.yourdomain.com
```

### 3. Enable Production Environment
- Switch to "Production" in Clerk Dashboard
- Ensure all settings are configured
- Test with production keys

---

## 📦 Frontend Deployment

### Build Process
```bash
cd e-commerce-frontend

# Build for production
npm run build

# Output will be in dist/
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variable
vercel env add VITE_CLERK_PUBLISHABLE_KEY pk_live_...
```

### Other Platforms (Netlify, AWS, etc.)
Add environment variable to your hosting platform:
- Key: `VITE_CLERK_PUBLISHABLE_KEY`
- Value: `pk_live_your_key`

### Docker Deployment
Create `Dockerfile` in frontend:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🔐 Backend Deployment

### Docker Setup
Update existing backend Dockerfile:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["node", "dist/server.js"]
```

### Environment Variables
Set in your hosting platform:
```
CLERK_SECRET_KEY=sk_live_...
MONGO_URI=mongodb+srv://...
JWT_SECRET_KEY=secure_random_key
NODE_ENV=production
PORT=8000
```

### Docker Compose Production
Update `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./e-commerce-backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      CLERK_SECRET_KEY: ${CLERK_SECRET_KEY}
      MONGO_URI: ${MONGO_URI}
      JWT_SECRET_KEY: ${JWT_SECRET_KEY}
      NODE_ENV: production
    depends_on:
      - mongo

  frontend:
    build:
      context: ./e-commerce-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      VITE_CLERK_PUBLISHABLE_KEY: ${VITE_CLERK_PUBLISHABLE_KEY}
      VITE_API_URL: https://api.yourdomain.com
    depends_on:
      - backend

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: unitdeals

volumes:
  mongo_data:
```

---

## 🌐 Domain & HTTPS Setup

### 1. SSL/TLS Certificate
- Use Let's Encrypt (free)
- Or purchase from certificate provider
- Enable HTTPS on your domain

### 2. CORS Configuration
Update backend `src/config/cors.ts`:
```ts
export const corsOptions = {
  origin: [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
    // Only in production
    ...(process.env.NODE_ENV === 'development' 
      ? ['http://localhost:5173'] 
      : [])
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
```

### 3. Security Headers
Add to backend:
```ts
import helmet from 'helmet';

app.use(helmet());
app.use(cors(corsOptions));
```

---

## 🔍 Testing in Production

### 1. Test Login Flow
- [ ] Visit /clerk-login
- [ ] Sign up with new email
- [ ] Sign in with that email
- [ ] Redirect to /dashboard works
- [ ] User info displays correctly

### 2. Test API Endpoints
- [ ] Protected endpoints require auth
- [ ] API calls include token
- [ ] Backend verifies token correctly
- [ ] Logout clears authentication

### 3. Test Edge Cases
- [ ] Token expiration handled
- [ ] CORS errors resolved
- [ ] Redirect loops prevented
- [ ] Session persists across tabs

### 4. Monitor Errors
- Check browser console for errors
- Monitor backend logs
- Check Clerk dashboard for auth errors
- Monitor database queries

---

## 📊 Monitoring & Debugging

### Clerk Dashboard Monitoring
1. Go to https://dashboard.clerk.com
2. Check:
   - Active sessions
   - Recent sign-ins
   - Failed authentications
   - User management

### Backend Logs
```bash
# View logs (Docker)
docker logs container_name -f

# View logs (Node)
tail -f /var/log/app.log
```

### Frontend Debugging
Use browser DevTools:
```js
// Check Clerk session
window.__clerk?.auth

// Check auth context
// (if exposed in dev tools)
```

---

## 🔒 Security Checklist

### Before Going Live
- [ ] No secrets committed to git
- [ ] HTTPS enabled everywhere
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak info
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Clerk keys rotate periodically
- [ ] Database authentication enabled

### Ongoing Security
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Monitor Clerk security announcements
- [ ] Review access logs monthly
- [ ] Implement DDoS protection
- [ ] Enable Clerk advanced features

---

## 🚨 Troubleshooting Production Issues

### Issue: "CORS error on login"
**Solution**: Add your domain to Clerk Dashboard → Settings → Origins

### Issue: "Invalid redirect URL"
**Solution**: Update Clerk Dashboard → Settings → URLs with your domain

### Issue: "401 Unauthorized on API calls"
**Solution**: 
- Verify CLERK_SECRET_KEY in .env
- Check token format in Authorization header
- Verify middleware is applied to route

### Issue: "Cannot find database"
**Solution**:
- Check MONGO_URI is correct
- Ensure MongoDB is accessible
- Check firewall/security groups

### Issue: "Environment variables not loading"
**Solution**:
- Restart application after setting vars
- Check .env file syntax
- Verify .env is not in .gitignore
- Use platform-specific env setup

---

## 📈 Scaling Considerations

### For Growing User Base
1. **Database**: 
   - Use MongoDB Atlas (managed)
   - Enable read replicas
   - Implement caching (Redis)

2. **Backend**:
   - Use load balancer
   - Enable auto-scaling
   - Cache API responses

3. **Frontend**:
   - Use CDN for assets
   - Implement code splitting
   - Cache aggressively

4. **Clerk**:
   - No scaling needed (handled by Clerk)
   - Monitor usage limits
   - Upgrade plan if needed

---

## 💰 Cost Optimization

### Clerk Pricing
- Free: Up to 10,000 monthly active users
- Pro: $39/month or usage-based
- Enterprise: Custom pricing

### Optimize Costs
- Use free tier if < 10k users
- Monitor monthly active users
- Clean up unused webhooks
- Cache authentication results

### MongoDB Atlas Pricing
- Free tier: 512MB storage
- Shared clusters: $15-20/month
- Dedicated clusters: Higher cost
- Optimized costs with proper indexing

---

## 📝 Deployment Checklist

### Week Before Deployment
- [ ] All code reviewed and tested
- [ ] Dependencies updated
- [ ] No console errors
- [ ] No security warnings
- [ ] Performance tested
- [ ] Backup strategy planned

### Day Before Deployment
- [ ] Create staging environment
- [ ] Run full test suite
- [ ] Database migrations tested
- [ ] Rollback plan documented
- [ ] Team notified

### Deployment Day
- [ ] Backup database first
- [ ] Deploy backend
- [ ] Verify backend health
- [ ] Deploy frontend
- [ ] Run smoke tests
- [ ] Monitor for errors

### After Deployment
- [ ] Monitor error rates
- [ ] Check response times
- [ ] Verify user flows work
- [ ] Monitor Clerk dashboard
- [ ] Document any issues

---

## 🔄 Continuous Deployment (CD)

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          # Build and deploy backend
          cd e-commerce-backend
          npm install
          npm run build
          # Deploy to your host
      
      - name: Deploy Frontend
        run: |
          # Build and deploy frontend
          cd e-commerce-frontend
          npm install
          npm run build
          # Deploy to your host
```

---

## 📞 Support Resources

### Deployment Help
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Docker: https://docs.docker.com
- AWS: https://docs.aws.amazon.com

### Clerk Help
- Docs: https://clerk.com/docs
- Dashboard: https://dashboard.clerk.com
- Discord: https://discord.com/invite/b5rXHjAg7A
- Email: support@clerk.com

### Your Infrastructure
- Database: https://www.mongodb.com/docs
- Monitoring: https://www.datadog.com
- Logging: https://www.loggly.com

---

## ✅ You're Ready to Deploy!

Once this checklist is complete, you can confidently deploy to production with Clerk authentication fully integrated.

**Good luck! 🚀**

---

**Last Updated**: February 2, 2026  
**See Also**: 
- [CLERK_QUICK_START.md](CLERK_QUICK_START.md)
- [CLERK_SETUP.md](CLERK_SETUP.md)
- [CLERK_README.md](CLERK_README.md)
