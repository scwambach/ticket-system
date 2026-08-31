# ticket-system

A Next.js web app with a one-input homepage for creating tasks in a self-hosted
Vikunja instance instantly.

## How it works

`app/page.tsx` posts whatever text you type to `app/api/create-ticket/route.ts`,
which creates a Vikunja task via its REST API (`src/vikunjaClient.ts`) and then
sends an ALL CAPS email notification to Scott via SMTP/Nodemailer
(`src/mailer.ts`).

## Setup

1. **Get a Vikunja API token**: in Vikunja, go to Settings → API Tokens, create one
   with permission to create tasks. Note the project ID you want tickets created in.
2. **Get SMTP credentials** for sending the notification email. For Gmail: enable
   2-Step Verification, then generate an App Password at
   https://myaccount.google.com/apppasswords.
3. Copy `.env.example` to `.env` and fill in the values.
4. Install dependencies:
   ```
   npm install
   ```
5. Run the app locally:
   ```
   npm run dev
   ```
   Visit http://localhost:3000 to use the ticket form.
6. Deploy anywhere that supports Next.js (Netlify, Vercel, your own server), and
   set the same environment variables in that platform's dashboard.

## Usage

Open the homepage, type what needs to be done, and hit "Create Ticket" — it shows
up in your configured Vikunja project immediately.
