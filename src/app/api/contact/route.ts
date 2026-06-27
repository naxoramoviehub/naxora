import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, subject, message)' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactReceiver = process.env.CONTACT_RECEIVER_EMAIL || smtpUser || 'naxoramoviewhub@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.warn('SMTP credentials are missing in environment variables. Email will not be sent.');
      return NextResponse.json(
        { error: 'SMTP server is not configured. Please define SMTP_USER and SMTP_PASS in .env.local.' },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // True for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Must send FROM SMTP user to avoid spoofing rejections
      replyTo: email, // Set reply-to as customer's email so admin can reply directly
      to: contactReceiver,
      subject: `[Naxora Support] ${subject}`,
      text: `New contact form submission from NAXORA website:

Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone || 'Not provided'}
Subject: ${subject}

Message:
------------------------------------------
${message}
------------------------------------------`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px; margin-top: 0;">New NAXORA Support Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; width: 150px; border-bottom: 1px solid #e2e8f0;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email Address:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${subject}</td>
            </tr>
          </table>
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; margin-top: 20px; font-size: 15px; line-height: 1.6; color: #1e293b;">
            ${message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>
          <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center;">
            This email was sent automatically from the NAXORA website contact form.
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('SMTP email sending failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
