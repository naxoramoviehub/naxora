import 'server-only';
import nodemailer from 'nodemailer';

export const SUPER_ADMIN_EMAIL = 'naxoramoviehub@gmail.com';

export function createInviteCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
}

export async function sendAdminMail(to: string, subject: string, text: string) {
  const user = process.env.SMTP_USER || SUPER_ADMIN_EMAIL;
  const pass = process.env.SMTP_PASS;
  if (!pass) throw new Error('SMTP is not configured.');
  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || 'smtp.gmail.com', port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({ from: `"NAXORA Administration" <${user}>`, to, subject, text });
}
