# Deploying to Vercel

Static site. No build step, no dependencies.

    /
    ├── index.html          landing page
    ├── genfit/index.html   GenFit case study  ->  /genfit
    ├── styles.css
    ├── app.js
    ├── assets/             photo, project images, 10 GenFit screens, CV pdf, favicon
    └── vercel.json

## 1. Put it in the repo on `main`

    git checkout main
    git pull

Copy everything from this folder into the repo root. Then delete the old Vite app —
it is no longer used and its presence will confuse the Vercel build:

    git rm -r src public index.html package.json pnpm-lock.yaml vite.config.js \
              eslint.config.js jsconfig.json components.json .env

(Your old site stays in git history and on its existing Vercel deployment URL.)

    git add .
    git commit -m "New portfolio: static build, dark mode, GenFit case study"
    git push origin main

## 2. Point Vercel at `main`

Project → **Settings → Git → Production Branch** → change to `main` → Save.
This is the piece that is currently wrong: Vercel is building a different branch.

## 3. Turn off the build

Project → **Settings → Build and Deployment**

| Field             | Value          |
|-------------------|----------------|
| Framework Preset  | Other          |
| Build Command     | *(leave empty, override ON)* |
| Output Directory  | `.`            |
| Install Command   | *(leave empty, override ON)* |

Redeploy.

## 4. Keep the old site at /v1

Vercel keeps every deployment at a permanent URL. Find the last good deployment of the
old site (Deployments tab → copy its `.vercel.app` URL), then in `vercel.json` replace
both `REPLACE_WITH_OLD_DEPLOYMENT_URL` values with it, e.g.

    "destination": "https://pkd-portfolio-abc123.vercel.app"

Commit and push. `/v1` will then proxy to the old site.

If you would rather not proxy, delete the two `rewrites` entries and just bookmark the
old deployment URL.

## Editing later

Everything is plain HTML with inline styles. Colours, spacing and dark mode all run
through CSS custom properties at the top of `styles.css` — change a token there and it
updates everywhere.

Replacing a screenshot: drop a new PNG into `assets/screens/` with the same filename.
