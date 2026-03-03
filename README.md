# TodoList (Next.js 14)

## Deploy to Vercel

This repository is a **single Next.js app at repo root**.

### Required project settings

- **Root Directory**: leave empty (or `.`)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (default is fine)
- **Install Command**: `npm install` (default is fine)

### Environment Variables

Set these in Vercel Project Settings:

- `DATABASE_URL` (PostgreSQL)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GEMINI_API_KEY`

### If Vercel says "No Next.js version detected"

1. Confirm the deployed branch actually contains this `package.json` with `next` dependency.
2. Confirm Root Directory is empty / `.`.
3. Redeploy with **Clear build cache**.
