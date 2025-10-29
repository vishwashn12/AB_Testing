# Deployment Guide

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas cluster
- GitHub secret: `MONGODB_ATLAS_URI`

## GitHub Actions (Automated)

Pipeline runs on push to `main`:

1. **Build** - Installs deps, builds both apps
2. **Test** - Runs Jest tests
3. **Lint** - ESLint on backend and frontend
4. **Security** - npm audit
5. **Deploy** - Creates artifact with built apps

**Setup GitHub Secret:**
```
Settings → Secrets → Actions → New repository secret

Name: MONGODB_ATLAS_URI
Value: mongodb+srv://<user>:<password>@cluster.mongodb.net/<db>
```

---

## Backend Deployment

### Quick Deploy (VPS)

```bash
# Install Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Deploy
git clone https://github.com/vishwashn12/AB_Testing.git
cd AB_Testing
npm install
npm run build
cd apps/backend
pm2 start src/index.js --name ab-testing-backend
pm2 save
pm2 startup
```

### Cloud Platforms

**Render/Railway:** Connect GitHub → Set root to `apps/backend` → Add env vars → Deploy  
**Heroku:** `cd apps/backend && heroku create && git push heroku main`

**Environment Variables:**
```
MONGODB_ATLAS_URI=mongodb+srv://...
NODE_ENV=production
PORT=3000
```

---

## Frontend Deployment

```bash
npm run build:frontend  # Creates apps/frontend/dist/
```

**Vercel (Recommended):**
```bash
npm i -g vercel
cd apps/frontend
vercel --prod
```

Or connect GitHub → Set root to `apps/frontend` → Framework: Vite → Deploy

**Netlify:**
```bash
npm i -g netlify-cli
cd apps/frontend
netlify deploy --prod --dir=dist
```

**Other:** Upload `apps/frontend/dist/` to S3, Cloudflare Pages, etc.

**Frontend Env Vars:**
```
VITE_API_URL=https://your-api.com
```

---

## Verification

```bash
# Backend health check
curl https://your-api.com/health

# Frontend - visit https://your-frontend.com
```

---

## Monitoring

**Backend:** `pm2 logs` and `pm2 status`  
**Database:** MongoDB Atlas auto-backups (enable in Backup tab)  
**HTTPS:** Vercel/Netlify auto-provision. For VPS, use nginx + Let's Encrypt
