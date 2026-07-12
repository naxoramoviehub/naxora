This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
Hi
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## NAXORA production setup

1. Create a Supabase project and run `supabase_schema.sql` in its SQL editor. Re-run it when upgrading an existing installation so legacy public policies are removed.
2. Copy `.env.example` to `.env.local` and configure Supabase, SMTP, the canonical site URL, and a long random `ADMIN_SIGNUP_CODE`.
3. Visit `/admin/auth/sign-up`, create the first administrator using the private invite code, then rotate the code if enrollment is complete.
4. Never expose `SUPABASE_SERVICE_ROLE_KEY` or `ADMIN_SIGNUP_CODE` through a `NEXT_PUBLIC_` variable.

Booking creation and receipt updates use validated server routes. The admin dashboard and confirmation-email endpoint require an authenticated account listed in `admin_users`.

The account registered with `naxoramoviehub@gmail.com` is assigned the `super_admin` role without an administrator invite code, but must confirm mailbox ownership through Supabase. Enable email confirmation in Supabase Auth settings. Its password is chosen privately during sign-up and is never stored in the repository.

Other administrators first submit only their email to request access. The super admin reviews requests at `/admin/invites`; approval generates a one-time code, valid for 24 hours, and emails it using the configured NAXORA SMTP account. The applicant then completes registration with that email, the code, a unique username of at least 5 characters, and a confirmed password of at least 8 characters. The super admin manages active accounts at `/admin/admins`.
