import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { rateLimit, requestKey } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    if (!rateLimit(requestKey(req, 'contact'), 5, 10 * 60_000)) return NextResponse.json({ error: 'Too many messages. Please try later.' }, { status: 429 });
    const parsed = z.object({ name:z.string().trim().min(2).max(80), email:z.string().email().max(160), phone:z.string().max(24).optional(), subject:z.string().trim().min(2).max(120), message:z.string().trim().min(10).max(2000) }).safeParse(await req.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: 'Please check your message details.' }, { status: 400 });
    const body = parsed.data;
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
    const contactReceiver = process.env.CONTACT_RECEIVER_EMAIL || smtpUser || 'naxoramovihub@gmail.com';

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
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeMessage = message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    // Professional Branded HTML Email Template
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Support Message – NAXORA</title>
</head>
<body style="margin:0; padding:0; background-color:#0f0f18; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f0f18; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Email Card -->
        <table width="620" cellpadding="0" cellspacing="0" border="0" style="background-color:#12121f; border-radius:16px; overflow:hidden; border: 1px solid #2a2a45; max-width:620px; width:100%;">

          <!-- ── Header with Logo ── -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a0a3d 0%, #0d1b4b 50%, #1a0a3d 100%); padding: 40px 48px 36px; text-align:center; border-bottom: 1px solid #2a2a45;">
              <!-- Logo wordmark -->
              <div style="display:inline-block; margin-bottom: 20px;">
                <span style="
                  font-size: 34px;
                  font-weight: 900;
                  letter-spacing: -0.04em;
                  background: linear-gradient(90deg, #a78bfa 0%, #818cf8 50%, #38bdf8 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                  color: #a78bfa;
                ">NAXORA</span>
              </div>
              <br>
              <span style="
                display: inline-block;
                background-color: rgba(139, 92, 246, 0.15);
                border: 1px solid rgba(139, 92, 246, 0.3);
                color: #a78bfa;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                padding: 5px 16px;
                border-radius: 100px;
              ">Support Desk Notification</span>
            </td>
          </tr>

          <!-- ── Title Bar ── -->
          <tr>
            <td style="padding: 32px 48px 0; background-color:#12121f;">
              <h1 style="margin:0 0 6px; font-size:22px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">
                New Contact Message Received
              </h1>
              <p style="margin:0; font-size:13px; color:#6b7280;">
                ${timestamp}
              </p>
              <div style="height:2px; background: linear-gradient(90deg, #8b5cf6, #38bdf8); border-radius:2px; margin-top:20px;"></div>
            </td>
          </tr>

          <!-- ── Sender Info Grid ── -->
          <tr>
            <td style="padding: 28px 48px 0; background-color:#12121f;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Name -->
                <tr>
                  <td style="padding: 14px 16px; background-color:#1a1a2e; border-radius:10px 10px 0 0; border-bottom: 1px solid #2a2a45; width:36%; vertical-align:middle;">
                    <span style="font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Full Name</span>
                  </td>
                  <td style="padding: 14px 16px; background-color:#1a1a2e; border-radius:0 0 0 0; border-bottom: 1px solid #2a2a45; vertical-align:middle;">
                    <span style="font-size:15px; color:#ffffff; font-weight:600;">${name}</span>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 14px 16px; background-color:#161628; border-bottom: 1px solid #2a2a45; vertical-align:middle;">
                    <span style="font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Email</span>
                  </td>
                  <td style="padding: 14px 16px; background-color:#161628; border-bottom: 1px solid #2a2a45; vertical-align:middle;">
                    <a href="mailto:${email}" style="font-size:15px; color:#818cf8; text-decoration:none; font-weight:500;">${email}</a>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding: 14px 16px; background-color:#1a1a2e; border-bottom: 1px solid #2a2a45; vertical-align:middle;">
                    <span style="font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Phone</span>
                  </td>
                  <td style="padding: 14px 16px; background-color:#1a1a2e; border-bottom: 1px solid #2a2a45; vertical-align:middle;">
                    <span style="font-size:15px; color:#e2e8f0;">${phone || '<span style="color:#4b5563; font-style:italic;">Not provided</span>'}</span>
                  </td>
                </tr>

                <!-- Subject -->
                <tr>
                  <td style="padding: 14px 16px; background-color:#161628; border-radius:0 0 0 10px; vertical-align:middle;">
                    <span style="font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Subject</span>
                  </td>
                  <td style="padding: 14px 16px; background-color:#161628; border-radius:0 0 10px 0; vertical-align:middle;">
                    <span style="font-size:15px; color:#a78bfa; font-weight:600;">${subject}</span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ── Message Body ── -->
          <tr>
            <td style="padding: 24px 48px 0; background-color:#12121f;">
              <p style="margin:0 0 12px; font-size:11px; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:0.08em;">Message</p>
              <div style="
                background-color:#0f0f1e;
                border: 1px solid #2a2a45;
                border-left: 3px solid #8b5cf6;
                border-radius: 10px;
                padding: 20px 22px;
                font-size: 15px;
                line-height: 1.75;
                color: #c4c9d4;
              ">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- ── CTA Button ── -->
          <tr>
            <td style="padding: 28px 48px 0; background-color:#12121f; text-align:center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="
                display: inline-block;
                background: linear-gradient(135deg, #7c3aed, #4f46e5);
                color: #ffffff;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-decoration: none;
                padding: 13px 36px;
                border-radius: 100px;
                border: none;
              ">&#9993;&nbsp;&nbsp;Reply to ${name}</a>
            </td>
          </tr>

          <!-- ── Divider ── -->
          <tr>
            <td style="padding: 36px 48px 0; background-color:#12121f;">
              <div style="height:1px; background-color:#2a2a45;"></div>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding: 24px 48px 36px; background-color:#12121f; text-align:center;">
              <p style="margin:0 0 4px; font-size:13px; font-weight:800; letter-spacing:0.1em; color:#4b5563; text-transform:uppercase;">NAXORA</p>
              <p style="margin:0 0 12px; font-size:11px; color:#374151; letter-spacing:0.04em;">Premium Private Cinema &amp; Gaming Experiences</p>
              <p style="margin:0; font-size:11px; color:#374151; line-height:1.6;">
                This email was automatically generated from the NAXORA website contact form.<br>
                Do not reply to this email directly — use the button above to contact the sender.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->
      </td>
    </tr>
  </table>

</body>
</html>`;

    // Email content
    const mailOptions = {
      from: `"NAXORA Support" <${smtpUser}>`,
      replyTo: email,
      to: contactReceiver,
      subject: `[Naxora Support] ${subject}`,
      text: `New contact form submission from NAXORA website:\n\nFull Name: ${name}\nEmail Address: ${email}\nPhone Number: ${phone || 'Not provided'}\nSubject: ${subject}\n\nMessage:\n------------------------------------------\n${message}\n------------------------------------------`,
      html: htmlBody,
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
