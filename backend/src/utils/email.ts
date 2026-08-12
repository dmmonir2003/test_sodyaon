import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<boolean> => {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '587');
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
  const from = process.env.SMTP_FROM || process.env.EMAIL_FROM || 'Sodayon <no-reply@sodayon.com>';

  // Check if credentials are provided
  if (!host || !user || !pass) {
    console.log('\n======================================================');
    console.log('[SMTP CONFIG WARNING] Real email sending is disabled.');
    console.log('To send real email OTPs, add these parameters to backend/.env:');
    console.log('EMAIL_HOST=smtp.gmail.com');
    console.log('EMAIL_PORT=587');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASS=your-google-app-password');
    console.log('EMAIL_FROM="সদায়ন <your-email@gmail.com>"');
    console.log('------------------------------------------------------');
    console.log(`[Email OTP Log] To: ${options.to}`);
    console.log(`[Email OTP Log] Subject: ${options.subject}`);
    console.log(`[Email OTP Log] Code: ${options.text}`);
    console.log('======================================================\n');
    return true;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Email Success] OTP sent successfully to ${options.to}. MessageID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('[SMTP Email Error] Failed to send email via SMTP:', error);
    return false;
  }
};
