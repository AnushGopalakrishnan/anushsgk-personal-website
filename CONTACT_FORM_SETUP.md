# Contact Form Setup Guide

I've replaced your mailto link with a contact form that opens in a modal. Here are the options to get emails sent to you:

## Option 1: Resend (Recommended - Free Tier)

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create a free account
2. **Install Resend**: Run this command in your terminal:
   ```bash
   npm install resend
   ```
3. **Get your API key**: In your Resend dashboard, copy your API key
4. **Create .env.local file**: In your project root, create a file called `.env.local` and add:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
5. **Update the API route**: In `src/app/api/contact/route.ts`, uncomment the Resend code (lines 30-50)

## Option 2: EmailJS (Client-side, No Backend)

1. **Sign up for EmailJS**: Go to [emailjs.com](https://emailjs.com) and create a free account
2. **Install EmailJS**: Run this command:
   ```bash
   npm install @emailjs/browser
   ```
3. **Set up your email template** in EmailJS dashboard
4. **Update ContactForm.tsx** to use EmailJS instead of the API route

## Option 3: Formspree (Easiest)

1. **Sign up for Formspree**: Go to [formspree.io](https://formspree.io) and create a free account
2. **Create a new form** in your dashboard
3. **Get your form endpoint** (something like `https://formspree.io/f/your_form_id`)
4. **Update the API route** to use Formspree's endpoint

## Option 4: Netlify Forms (If deploying to Netlify)

1. **Add `name` attribute** to your form elements
2. **Add `data-netlify="true"`** to your form
3. **Deploy to Netlify** - forms will work automatically

## Current Status

Right now, the form will:
- ✅ Open a modal when clicked
- ✅ Collect name, email, and message
- ✅ Validate the input
- ✅ Show success/error messages
- ❌ Actually send emails (you need to set up one of the options above)

## Testing

To test the form:
1. Run your development server: `npm run dev`
2. Click the "Available For Hire" button
3. Fill out the form and submit
4. Check your browser's developer console to see the form data logged

## Next Steps

Choose one of the email service options above and follow the setup instructions. The Resend option is recommended as it's reliable, has a good free tier, and integrates well with Next.js.

Let me know if you need help with any of these options! 