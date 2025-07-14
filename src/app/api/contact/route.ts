import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        // Validate the input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // For now, we'll use a simple approach with a third-party service
        // You can choose from several options:
        
        // Option 1: Use Resend (recommended - free tier available)
        // Option 2: Use EmailJS (client-side, no backend needed)
        // Option 3: Use a form service like Formspree or Netlify Forms
        
        // For this example, I'll show you how to set up with Resend
        // First, install: npm install resend
        // Then uncomment the code below and add your Resend API key to .env.local
        
        
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error } = await resend.emails.send({
            from: 'Contact Form <notifications@belbullets.run>',
            to: ['avnishjha1005@gmail.com'],
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }
        

        // For now, let's just log the submission (you can replace this with actual email sending)
        console.log('Contact form submission:', { name, email, message });

        // Return success response
        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 