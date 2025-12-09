# Deployment Guide for Vercel

This guide will help you deploy the Property Management Dashboard to Vercel.

## Prerequisites

- A GitHub account (recommended) or GitLab/Bitbucket
- A Vercel account (free tier is sufficient)

## Quick Deploy (Recommended)

### Method 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **That's it!** Your app will be live in ~2 minutes

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production: `vercel --prod`

## Configuration Files

The project includes these Vercel-specific files:

### `vercel.json`
- Configures build settings
- Sets up SPA routing (all routes → index.html)
- Defines output directory as `dist`

### `.vercelignore`
- Excludes unnecessary files from deployment
- Similar to `.gitignore` but for Vercel

## Build Settings

Vercel will automatically detect:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Environment Variables

If you need environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

Example:
```
VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Performance Optimization

The build is optimized with:
- Code splitting for Highcharts and Recharts
- Vendor chunk separation
- Gzip compression (automatic on Vercel)

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Test locally: `npm run build`
3. Ensure all dependencies are in `package.json`

### 404 on Routes

- The `vercel.json` includes SPA routing configuration
- All routes should redirect to `index.html`

### Charts Not Loading

- Ensure all chart libraries are in dependencies
- Check browser console for errors
- Verify Highcharts 3D module loads correctly

## Post-Deployment

After deployment:
1. Test all chart types
2. Verify theme switching works
3. Check responsive design on mobile
4. Test all navigation links

## Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Every push to other branches → Preview deployment

## Support

For issues:
- Check Vercel logs: Dashboard → Deployments → View Logs
- Check build output: `npm run build` locally
- Review Vercel documentation: https://vercel.com/docs

