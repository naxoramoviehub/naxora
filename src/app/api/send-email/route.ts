import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmationEmail, sendBookingCancellationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { booking, status } = await request.json();

    if (!booking || !booking.customer_email) {
      return NextResponse.json(
        { error: 'Invalid booking data or missing email' },
        { status: 400 }
      );
    }

    let emailSent = false;

    if (status === 'confirmed') {
      emailSent = await sendBookingConfirmationEmail(booking);
    } else if (status === 'cancelled') {
      emailSent = await sendBookingCancellationEmail(booking);
    }

    if (emailSent) {
      return NextResponse.json(
        { success: true, message: 'Email sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in send-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
