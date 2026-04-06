import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.TO_EMAIL;

  if (!gmailUser || !gmailAppPassword || !toEmail) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const name = body.name?.toString().trim() || '';
    const email = body.email?.toString().trim() || '';
    const subject = body.subject?.toString().trim() || 'No Subject';
    const message = body.message?.toString().trim() || '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const transporter = getTransporter();

    if (transporter) {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        html: `<h2>New Contact</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${process.env.TO_EMAIL}`);
    } else {
      console.log('📧 Email not configured - form data:', { name, email, subject, message });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received!',
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}