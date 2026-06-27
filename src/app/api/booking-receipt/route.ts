import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookingId,
      customerName,
      customerEmail,
      customerPhone,
      packageTitle,
      bookingDate,
      bookingTime,
      capacity,
      amountDue,
      receiptBase64, // data:image/png;base64,...
      receiptFileName,
    } = body;

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.CONTACT_RECEIVER_EMAIL || smtpUser || 'naxoramovihub@gmail.com';

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'SMTP not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    });

    // Build attachment from base64 if provided
    const attachments: nodemailer.SendMailOptions['attachments'] = [];
    if (receiptBase64) {
      // Strip data URL prefix → raw base64
      const base64Data = receiptBase64.replace(/^data:image\/\w+;base64,/, '');
      const mimeMatch = receiptBase64.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      attachments.push({
        filename: receiptFileName || 'bank_transfer_receipt.png',
        content: base64Data,
        encoding: 'base64',
        contentType: mimeType,
        cid: 'receipt_image', // allows inline embedding
      });
    }

    const hasReceipt = attachments.length > 0;

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Booking Receipt – NAXORA</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f18;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f0f18;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" border="0" style="background-color:#12121f;border-radius:16px;overflow:hidden;border:1px solid #2a2a45;max-width:620px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a0a3d 0%,#0d1b4b 50%,#1a0a3d 100%);padding:40px 48px 36px;text-align:center;border-bottom:1px solid #2a2a45;">
              <span style="font-size:34px;font-weight:900;letter-spacing:-0.04em;color:#a78bfa;">NAXORA</span>
              <br><br>
              <span style="display:inline-block;background-color:rgba(234,179,8,0.15);border:1px solid rgba(234,179,8,0.35);color:#fbbf24;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:5px 16px;border-radius:100px;">
                &#9888;&nbsp; Payment Receipt Submitted
              </span>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 48px 0;background-color:#12121f;">
              <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                New Bank Transfer Receipt Received
              </h1>
              <p style="margin:0;font-size:13px;color:#6b7280;">${timestamp}</p>
              <div style="height:2px;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:2px;margin-top:20px;"></div>
            </td>
          </tr>

          <!-- Booking ID Banner -->
          <tr>
            <td style="padding:20px 48px 0;background-color:#12121f;">
              <div style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(79,70,229,0.1));border:1px solid rgba(139,92,246,0.3);border-radius:10px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.1em;">Booking Reference</span><br>
                      <span style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:0.06em;font-family:monospace;">${bookingId}</span>
                    </td>
                    <td align="right">
                      <span style="display:inline-block;background-color:rgba(234,179,8,0.15);border:1px solid rgba(234,179,8,0.3);color:#fbbf24;font-size:12px;font-weight:700;padding:6px 14px;border-radius:100px;">PENDING VERIFICATION</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td style="padding:24px 48px 0;background-color:#12121f;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Customer Information</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:10px 10px 0 0;border-bottom:1px solid #2a2a45;width:36%;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Full Name</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#ffffff;font-weight:600;">${customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Email</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <a href="mailto:${customerEmail}" style="font-size:15px;color:#818cf8;text-decoration:none;">${customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:0 0 0 10px;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Phone</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:0 0 10px 0;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#e2e8f0;">${customerPhone || 'Not provided'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding:20px 48px 0;background-color:#12121f;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Booking Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:10px 10px 0 0;border-bottom:1px solid #2a2a45;width:36%;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Package</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#a78bfa;font-weight:700;">${packageTitle}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Date</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#e2e8f0;font-family:monospace;">${bookingDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Time Slot</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#e2e8f0;font-family:monospace;">${bookingTime}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Capacity</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#e2e8f0;">${capacity}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:0 0 0 10px;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Amount Due</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:0 0 10px 0;vertical-align:middle;">
                    <span style="font-size:18px;color:#fbbf24;font-weight:800;font-family:monospace;">${amountDue}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Receipt Attachment Notice -->
          <tr>
            <td style="padding:20px 48px 0;background-color:#12121f;">
              ${hasReceipt ? `
              <div style="background-color:#0a1f0a;border:1px solid #166534;border-radius:10px;padding:16px 20px;display:flex;align-items:center;gap:12px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;width:36px;">
                      <div style="width:36px;height:36px;background-color:rgba(34,197,94,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;">&#128247;</div>
                    </td>
                    <td style="padding-left:12px;vertical-align:middle;">
                      <span style="font-size:13px;font-weight:700;color:#4ade80;">Bank Transfer Receipt Attached</span><br>
                      <span style="font-size:12px;color:#166534;">The receipt image has been attached to this email for verification.</span>
                    </td>
                  </tr>
                </table>
              </div>
              <br>
              <div style="text-align:center;border:1px solid #2a2a45;border-radius:10px;overflow:hidden;background-color:#0f0f1e;padding:12px;">
                <img src="cid:receipt_image" alt="Bank Transfer Receipt" style="max-width:100%;max-height:400px;border-radius:6px;object-fit:contain;" />
                <p style="margin:8px 0 0;font-size:11px;color:#4b5563;">Bank Transfer Receipt</p>
              </div>
              ` : `
              <div style="background-color:#1c1a0a;border:1px solid #713f12;border-radius:10px;padding:16px 20px;">
                <span style="font-size:13px;color:#fbbf24;font-weight:600;">&#9888; No receipt image was attached.</span><br>
                <span style="font-size:12px;color:#92400e;">The customer clicked the WhatsApp button without uploading a receipt image.</span>
              </div>
              `}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 48px 0;background-color:#12121f;text-align:center;">
              <a href="mailto:${customerEmail}?subject=Re: Booking ${bookingId} – Payment Confirmation" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#15803d);color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.04em;text-decoration:none;padding:13px 32px;border-radius:100px;margin-right:8px;">
                &#10003;&nbsp; Confirm Booking
              </a>
              <a href="mailto:${customerEmail}?subject=Re: Booking ${bookingId} – Action Required" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.04em;text-decoration:none;padding:13px 32px;border-radius:100px;">
                &#9993;&nbsp; Reply to Customer
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:36px 48px 0;background-color:#12121f;">
              <div style="height:1px;background-color:#2a2a45;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px 36px;background-color:#12121f;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:800;letter-spacing:0.1em;color:#4b5563;text-transform:uppercase;">NAXORA</p>
              <p style="margin:0 0 12px;font-size:11px;color:#374151;letter-spacing:0.04em;">Premium Private Cinema &amp; Gaming Experiences</p>
              <p style="margin:0;font-size:11px;color:#374151;line-height:1.6;">
                This notification was automatically generated when a customer submitted a booking receipt.<br>
                Please verify the payment and confirm or contact the customer at the earliest.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

    await transporter.sendMail({
      from: `"NAXORA Booking System" <${smtpUser}>`,
      replyTo: customerEmail,
      to: notifyEmail,
      subject: `[NAXORA Receipt] ${bookingId} – ${packageTitle} – ${customerName}`,
      text: `New bank transfer receipt submitted.\n\nBooking ID: ${bookingId}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nPhone: ${customerPhone || 'Not provided'}\nPackage: ${packageTitle}\nDate: ${bookingDate}\nTime: ${bookingTime}\nCapacity: ${capacity}\nAmount Due: ${amountDue}\n\nReceipt attached: ${hasReceipt ? 'Yes' : 'No'}`,
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Booking receipt email failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send receipt email.' },
      { status: 500 }
    );
  }
}
