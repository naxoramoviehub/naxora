import nodemailer from 'nodemailer';

interface BookingDetails {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  package_title?: string;
  booking_date: string;
  booking_time_display?: string;
  amount_due?: string;
  notes: string;
}

// Hardcoded SMTP credentials
const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'naxoramoviehub@gmail.com',
    pass: 'peswoziuujqycmhg',
  },
};

// Create transporter with hardcoded credentials
const createTransporter = () => {
  return nodemailer.createTransport(SMTP_CONFIG);
};

export async function sendBookingConfirmationEmail(booking: BookingDetails) {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation - NAXORA</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8b5cf6, #22d3ee); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .invoice-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { font-weight: 600; color: #6b7280; }
          .detail-value { font-weight: 500; color: #111827; }
          .total-row { background: #8b5cf6; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; }
          .total-row .detail-label { color: rgba(255,255,255,0.9); }
          .total-row .detail-value { color: white; font-size: 18px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #22d3ee); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎬 NAXORA</h1>
            <p>Private Cinema & Gaming Experience</p>
          </div>
          
          <div class="content">
            <h2 style="color: #8b5cf6; margin-top: 0;">Booking Confirmed!</h2>
            <p>Dear <strong>${booking.customer_name}</strong>,</p>
            <p>Your booking has been confirmed. Here are your booking details:</p>
            
            <div class="invoice-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID</span>
                <span class="detail-value">${booking.id}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Package</span>
                <span class="detail-value">${booking.package_title || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date</span>
                <span class="detail-value">${booking.booking_date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time</span>
                <span class="detail-value">${booking.booking_time_display || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone</span>
                <span class="detail-value">${booking.customer_phone}</span>
              </div>
              ${booking.notes ? `
              <div class="detail-row">
                <span class="detail-label">Notes</span>
                <span class="detail-value">${booking.notes}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="total-row">
              <div class="detail-row">
                <span class="detail-label">Total Amount</span>
                <span class="detail-value">${booking.amount_due || 'N/A'}</span>
              </div>
            </div>
            
            <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
              Please arrive 15 minutes before your scheduled time. For any changes or cancellations, please contact us at least 24 hours in advance.
            </p>
            
            <div style="text-align: center;">
              <a href="https://wa.me/94707735599" class="button">Contact on WhatsApp</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2026 NAXORA. All rights reserved.</p>
            <p>WhatsApp: +94 707 735 599 | Email: naxoramovihub@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: 'naxoramoviehub@gmail.com',
      to: booking.customer_email,
      subject: `Booking Confirmation - ${booking.id} - NAXORA`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${booking.customer_email}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendAdminBookingNotification(booking: BookingDetails) {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking - NAXORA</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8b5cf6, #22d3ee); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .invoice-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { font-weight: 600; color: #6b7280; }
          .detail-value { font-weight: 500; color: #111827; }
          .total-row { background: #8b5cf6; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; }
          .total-row .detail-label { color: rgba(255,255,255,0.9); }
          .total-row .detail-value { color: white; font-size: 18px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #22d3ee); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 10px 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎬 NAXORA</h1>
            <p>Private Cinema & Gaming Experience</p>
          </div>
          
          <div class="content">
            <h2 style="color: #8b5cf6; margin-top: 0;">New Booking Received!</h2>
            <p>A new booking has been submitted. Here are the details:</p>
            
            <div class="invoice-details">
              <div class="detail-row">
                <span class="detail-label">Booking ID</span>
                <span class="detail-value">${booking.id}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Name</span>
                <span class="detail-value">${booking.customer_name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Email</span>
                <span class="detail-value">${booking.customer_email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Customer Phone</span>
                <span class="detail-value">${booking.customer_phone}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Package</span>
                <span class="detail-value">${booking.package_title || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date</span>
                <span class="detail-value">${booking.booking_date}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time</span>
                <span class="detail-value">${booking.booking_time_display || 'N/A'}</span>
              </div>
              ${booking.notes ? `
              <div class="detail-row">
                <span class="detail-label">Notes</span>
                <span class="detail-value">${booking.notes}</span>
              </div>
              ` : ''}
            </div>
            
            <div class="total-row">
              <div class="detail-row">
                <span class="detail-label">Total Amount</span>
                <span class="detail-value">${booking.amount_due || 'N/A'}</span>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="http://localhost:3000/admin/bookings" class="button">View in Admin Dashboard</a>
              <a href="https://wa.me/${booking.customer_phone.replace(/\D/g, '')}" class="button">Contact Customer</a>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2026 NAXORA. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: 'naxoramoviehub@gmail.com',
      to: 'naxoramoviehub@gmail.com',
      subject: `New Booking - ${booking.id} - ${booking.customer_name} - NAXORA`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Admin notification email sent for booking ${booking.id}`);
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
}

export async function sendBookingCancellationEmail(booking: BookingDetails) {
  try {
    const transporter = createTransporter();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Cancelled - NAXORA</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ef4444, #f97316); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎬 NAXORA</h1>
            <p>Private Cinema & Gaming Experience</p>
          </div>
          
          <div class="content">
            <h2 style="color: #ef4444; margin-top: 0;">Booking Cancelled</h2>
            <p>Dear <strong>${booking.customer_name}</strong>,</p>
            <p>Your booking <strong>${booking.id}</strong> has been cancelled.</p>
            
            <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
              If you did not request this cancellation, please contact us immediately.
            </p>
            
            <p style="margin-top: 20px;">
              <strong>WhatsApp:</strong> +94 707 735 599<br>
              <strong>Email:</strong> naxoramovihub@gmail.com
            </p>
          </div>
          
          <div class="footer">
            <p>© 2026 NAXORA. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.SMTP_FROM || 'naxoramovihub@gmail.com',
      to: booking.customer_email,
      subject: `Booking Cancelled - ${booking.id} - NAXORA`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${booking.customer_email}`);
    return true;
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return false;
  }
}
