This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact Form SMS (Twilio)

This project sends SMS messages from the Contact form using Twilio:

- SMS #1 goes to you (site owner) with the form details
- SMS #2 goes to the visitor phone number (if provided) as confirmation

### 1) Install and configure environment variables

Copy `.env.example` to `.env.local` and set:

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+15551234567
CONTACT_RECEIVER_NUMBER=+61412345678
```

### 2) Twilio account setup

1. Create/login to your Twilio account.
2. Buy or use a Twilio phone number that supports SMS.
3. Copy your **Account SID** and **Auth Token** from Twilio Console.
4. Set `TWILIO_FROM_NUMBER` to your Twilio number in E.164 format.
5. Set `CONTACT_RECEIVER_NUMBER` to your personal number in E.164 format.

### 3) Trial account note (important)

If your Twilio account is trial:

- You must verify destination numbers in Twilio first.
- That includes your own receiver number and any visitor number you want to test confirmation SMS with.

### 4) Run locally

```bash
npm run dev
```

Submit the Contact form and confirm:

- You receive owner SMS with full name, email, phone, and message.
- Visitor phone receives confirmation SMS:
  - "Your message was submitted successfully to Andre Floquet. He will get in touch with you within the next 24 hours."

### 5) Production deployment

Add the same four environment variables to your hosting provider (e.g. Vercel), then redeploy.
