# Marvin Villamar — Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and [Sanity](https://www.sanity.io) as the CMS.

## Develop

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- CMS (Sanity Studio): http://localhost:3000/studio

## Content

Every section (profile & hero, featured work, experience, projects, skills, education) is edited in Sanity Studio at `/studio`.

Until Sanity is connected, or for any section that is still empty in Sanity, the site uses the local copy in [`src/data/resume.ts`](src/data/resume.ts).

### Connecting Sanity (one-time)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage) and copy its **Project ID**.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` (dataset stays `production`).
3. In the project's **API → CORS origins**, add `http://localhost:3000` and your live domain, both with **Allow credentials** ticked.
4. Import the current content:

   ```bash
   npx sanity login
   npm run sanity:seed
   ```

5. Restart `npm run dev` and open `/studio`.

### Publishing changes

Published edits appear on the live site within about a minute. For instant updates, add a webhook in Sanity (**API → Webhooks**) pointing to `https://<your-domain>/api/revalidate`, with trigger on create/update/delete and the secret set to the same value as `SANITY_REVALIDATE_SECRET`.

### Deploying (Vercel)

Add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_REVALIDATE_SECRET` as environment variables in the Vercel project.
