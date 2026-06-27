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
      experienceId,
      bookingDate,
      bookingTimeDisplay,
      capacity,
      amountDue,
      notes,
      receiptBase64,
      receiptFilename,
    } = body;

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ error: 'SMTP not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    // Format the date nicely
    const dateObj = new Date(bookingDate + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    const invoiceNumber = `INV-${bookingId}-${Date.now().toString().slice(-4)}`;
    const issuedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    // Build receipt attachment if present
    const attachments: nodemailer.SendMailOptions['attachments'] = [];
    if (receiptBase64) {
      const base64Data = receiptBase64.replace(/^data:image\/\w+;base64,/, '');
      const mimeMatch = receiptBase64.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
      attachments.push({
        filename: receiptFilename || 'payment_receipt.png',
        content: base64Data,
        encoding: 'base64',
        contentType: mimeType,
      });
    }

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Booking Confirmation – NAXORA</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f18;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f0f18;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" border="0"
          style="background-color:#12121f;border-radius:16px;overflow:hidden;border:1px solid #2a2a45;max-width:620px;width:100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#052e16 0%,#0a1f0a 50%,#052e16 100%);padding:40px 48px 36px;text-align:center;border-bottom:1px solid #166534;">
              <span style="font-size:36px;font-weight:900;letter-spacing:-0.04em;color:#a78bfa;">NAXORA</span>
              <br><br>
              <!-- Large green checkmark circle -->
              <div style="display:inline-block;width:64px;height:64px;background-color:rgba(34,197,94,0.15);border:2px solid #16a34a;border-radius:50%;line-height:64px;font-size:30px;margin-bottom:16px;">
                &#10003;
              </div>
              <br>
              <span style="font-size:22px;font-weight:800;color:#4ade80;letter-spacing:-0.01em;">Booking Confirmed!</span>
              <br>
              <span style="display:inline-block;margin-top:12px;background-color:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#86efac;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;padding:5px 16px;border-radius:100px;">
                Your reservation is secured
              </span>
            </td>
          </tr>

          <!-- ── Greeting ── -->
          <tr>
            <td style="padding:32px 48px 0;background-color:#12121f;">
              <p style="margin:0;font-size:16px;color:#d1d5db;line-height:1.7;">
                Dear <strong style="color:#ffffff;">${customerName}</strong>,
              </p>
              <p style="margin:12px 0 0;font-size:15px;color:#9ca3af;line-height:1.7;">
                Great news! Your booking at NAXORA has been <strong style="color:#4ade80;">approved and confirmed</strong>.
                We're excited to host you for an unforgettable experience. Please keep this email as your booking confirmation.
              </p>
              <div style="height:2px;background:linear-gradient(90deg,#16a34a,#22c55e);border-radius:2px;margin-top:24px;"></div>
            </td>
          </tr>

          <!-- ── Booking Reference Banner ── -->
          <tr>
            <td style="padding:24px 48px 0;background-color:#12121f;">
              <div style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(79,70,229,0.08));border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.1em;">Booking ID</span><br>
                      <span style="font-size:30px;font-weight:900;color:#ffffff;letter-spacing:0.08em;font-family:monospace;">${bookingId}</span>
                    </td>
                    <td align="right">
                      <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Status</span><br>
                      <span style="display:inline-block;background-color:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.35);color:#4ade80;font-size:13px;font-weight:800;padding:6px 16px;border-radius:100px;margin-top:4px;">&#9679; CONFIRMED</span>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- ── Experience Details ── -->
          <tr>
            <td style="padding:24px 48px 0;background-color:#12121f;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Your Experience</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:10px 10px 0 0;border-bottom:1px solid #2a2a45;width:38%;vertical-align:middle;">
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
                    <span style="font-size:15px;color:#ffffff;font-weight:600;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Time Slot</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#ffffff;font-family:monospace;">${bookingTimeDisplay}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Guests</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#161628;border-bottom:1px solid #2a2a45;vertical-align:middle;">
                    <span style="font-size:15px;color:#e2e8f0;">${capacity}</span>
                  </td>
                </tr>
                ${notes ? `
                <tr>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:0 0 0 10px;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Special Notes</span>
                  </td>
                  <td style="padding:13px 16px;background-color:#1a1a2e;border-radius:0 0 10px 0;vertical-align:top;">
                    <span style="font-size:14px;color:#9ca3af;font-style:italic;">${notes}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- ── Invoice ── -->
          <tr>
            <td style="padding:24px 48px 0;background-color:#12121f;">
              <div style="background-color:#0f0f1e;border:1px solid #2a2a45;border-radius:12px;overflow:hidden;">

                <!-- Invoice header -->
                <div style="background:linear-gradient(135deg,#1a0a3d,#0d1b4b);padding:16px 24px;border-bottom:1px solid #2a2a45;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <span style="font-size:14px;font-weight:800;color:#a78bfa;text-transform:uppercase;letter-spacing:0.08em;">&#128196; Invoice</span>
                      </td>
                      <td align="right">
                        <span style="font-size:12px;color:#6b7280;">${invoiceNumber}</span>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Invoice line items -->
                <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 24px;">
                  <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #1e1e35;color:#9ca3af;font-size:13px;">Description</td>
                    <td style="padding:14px 0;border-bottom:1px solid #1e1e35;color:#9ca3af;font-size:13px;text-align:right;">Amount</td>
                  </tr>
                  <tr>
                    <td style="padding:16px 0;border-bottom:1px solid #1e1e35;vertical-align:top;">
                      <span style="font-size:14px;font-weight:600;color:#ffffff;">${packageTitle}</span><br>
                      <span style="font-size:12px;color:#6b7280;">${formattedDate} &bull; ${bookingTimeDisplay}</span>
                    </td>
                    <td style="padding:16px 0;border-bottom:1px solid #1e1e35;vertical-align:top;text-align:right;">
                      <span style="font-size:15px;font-weight:700;color:#ffffff;">${amountDue}</span>
                    </td>
                  </tr>
                  <!-- Total row -->
                  <tr>
                    <td style="padding:16px 0 20px;">
                      <span style="font-size:15px;font-weight:800;color:#ffffff;">Total Paid</span>
                    </td>
                    <td style="padding:16px 0 20px;text-align:right;">
                      <span style="font-size:20px;font-weight:900;color:#4ade80;">${amountDue}</span>
                    </td>
                  </tr>
                </table>

                <!-- Invoice footer -->
                <div style="background-color:#0a0a18;padding:12px 24px;border-top:1px solid #1e1e35;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td><span style="font-size:11px;color:#4b5563;">Invoice No: ${invoiceNumber}</span></td>
                      <td align="right"><span style="font-size:11px;color:#4b5563;">Issued: ${issuedDate}</span></td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </tr>

          <!-- ── What to Expect ── -->
          <tr>
            <td style="padding:24px 48px 0;background-color:#12121f;">
              <div style="background-color:#0f1a2e;border:1px solid #1e3a5f;border-radius:12px;padding:20px 24px;">
                <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:0.08em;">&#128196; Before You Arrive</p>
                <table cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0;font-size:14px;color:#93c5fd;">&#8226;&nbsp;</td><td style="padding:4px 0;font-size:14px;color:#bfdbfe;">Please arrive <strong>10 minutes before</strong> your scheduled start time.</td></tr>
                  <tr><td style="padding:4px 0;font-size:14px;color:#93c5fd;">&#8226;&nbsp;</td><td style="padding:4px 0;font-size:14px;color:#bfdbfe;">Bring a <strong>copy of this email</strong> (printed or on your phone) as your entry pass.</td></tr>
                  <tr><td style="padding:4px 0;font-size:14px;color:#93c5fd;">&#8226;&nbsp;</td><td style="padding:4px 0;font-size:14px;color:#bfdbfe;">Outside food and beverages are welcome in designated areas.</td></tr>
                  <tr><td style="padding:4px 0;font-size:14px;color:#93c5fd;">&#8226;&nbsp;</td><td style="padding:4px 0;font-size:14px;color:#bfdbfe;">For rescheduling or cancellations, contact us at least <strong>24 hours in advance</strong>.</td></tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- ── Contact Card ── -->
          <tr>
            <td style="padding:20px 48px 0;background-color:#12121f;">
              <div style="background-color:#1a1a2e;border:1px solid #2a2a45;border-radius:12px;padding:16px 24px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Need Help?</p>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:4px 20px 4px 0;font-size:13px;color:#d1d5db;">&#128241; WhatsApp</td>
                    <td style="padding:4px 0;font-size:13px;"><a href="https://wa.me/94707735599" style="color:#4ade80;text-decoration:none;font-weight:600;">+94 70 773 5599</a></td>
                  </tr>
                  <tr>
                    <td style="padding:4px 20px 4px 0;font-size:13px;color:#d1d5db;">&#128231; Email</td>
                    <td style="padding:4px 0;font-size:13px;"><a href="mailto:naxoramovihub@gmail.com" style="color:#818cf8;text-decoration:none;">naxoramovihub@gmail.com</a></td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- ── Divider ── -->
          <tr>
            <td style="padding:36px 48px 0;background-color:#12121f;">
              <div style="height:1px;background-color:#2a2a45;"></div>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding:24px 48px 36px;background-color:#12121f;text-align:center;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:800;letter-spacing:0.1em;color:#4b5563;text-transform:uppercase;">NAXORA</p>
              <p style="margin:0 0 12px;font-size:11px;color:#374151;letter-spacing:0.04em;">Premium Private Cinema &amp; Gaming Experiences</p>
              <p style="margin:0;font-size:11px;color:#374151;line-height:1.6;">
                This is an automated booking confirmation. Please do not reply to this email.<br>
                Booking ID: <strong style="color:#6b7280;">${bookingId}</strong> &bull; Invoice: <strong style="color:#6b7280;">${invoiceNumber}</strong>
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
      from: `"NAXORA" <${smtpUser}>`,
      to: customerEmail,
      subject: `✅ Booking Confirmed – ${packageTitle} on ${formattedDate} | ${bookingId}`,
      text: `Dear ${customerName},\n\nYour booking has been confirmed!\n\nBooking ID: ${bookingId}\nPackage: ${packageTitle}\nDate: ${formattedDate}\nTime: ${bookingTimeDisplay}\nGuests: ${capacity}\nAmount: ${amountDue}\n\nPlease arrive 10 minutes early and bring this confirmation.\n\nNAXORA Team\nWhatsApp: +94 70 773 5599\nEmail: naxoramovihub@gmail.com`,
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Confirmation email failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send confirmation email.' },
      { status: 500 }
    );
  }
}
