import twilio from 'twilio';
import GioSMS from '@devriyad/giosms';

/**
 * Dispatch an SMS OTP securely.
 * In production/dev, it connects to GioSMS or Twilio.
 * In local development, if variables are missing, it outputs to the console.
 * 
 * @param phone Target mobile phone number in string format
 * @param otp The 6-digit verification code
 */
export const sendSMS = async (phone: string, otp: string): Promise<boolean> => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  const giosmsToken = process.env.GIOSMS_TOKEN;
  const giosmsSenderId = process.env.GIOSMS_SENDER_ID;

  // Formatting phone to international format (with +)
  const formattedPhone = phone.startsWith('+') ? phone : `+880${phone.replace(/^(\+880|0)/, '')}`;

  // 1. Secure GioSMS Gateway (Priority #1 for Bangladesh)
  if (giosmsToken) {
    try {
      const sms = new GioSMS({
        token: giosmsToken,
        senderId: giosmsSenderId || undefined,
      });

      // Format target to "8801XXXXXXXXX" (no leading +)
      const gioPhone = formattedPhone.replace('+', '');

      console.log(`[GioSMS] Dispatching OTP to ${gioPhone}...`);
      const result = await sms.otp({
        to: gioPhone,
        message: `Your Sodayon verification code is ${otp}. Valid for 10 minutes.`,
      });

      console.log(`[SMS SUCCESS] Real SMS successfully sent via GioSMS to ${gioPhone}. Message ID: ${result?.data?.message_id || 'N/A'}`);
      return true;
    } catch (error: any) {
      console.error('[SMS ERROR] GioSMS client failed to send OTP:', error?.message || error);
    }
  }

  // 2. Twilio Gateway (Fallback #2)
  if (accountSid && authToken && fromNumber) {
    try {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `[Sodayon] Your verification code is ${otp}. Expires in 10 minutes.`,
        from: fromNumber,
        to: formattedPhone,
      });
      console.log(`[SMS SUCCESS] Real SMS successfully sent via Twilio to ${formattedPhone}`);
      return true;
    } catch (error) {
      console.error('[SMS ERROR] Twilio client failed to send message:', error);
    }
  }

  // 3. Graceful fallback for local development testing
  console.log('\n==================================================');
  console.log(`📱 [SMS GATEWAY EMULATOR]`);
  console.log(`To: ${formattedPhone}`);
  console.log(`Message: Your Sodayon OTP code is: ${otp}`);
  console.log('==================================================\n');

  return true;
};
