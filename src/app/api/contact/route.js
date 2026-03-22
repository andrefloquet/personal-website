import { NextResponse } from 'next/server';
import twilio from 'twilio';

function getServerConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const receiverNumber = process.env.CONTACT_RECEIVER_NUMBER;

  if (!accountSid || !authToken || !fromNumber || !receiverNumber) {
    return null;
  }

  return { accountSid, authToken, fromNumber, receiverNumber };
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isE164(value) {
  return /^\+[1-9]\d{6,14}$/.test(value);
}

function sanitizeText(value, maxLen) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

export async function POST(request) {
  const config = getServerConfig();
  if (!config) {
    return NextResponse.json(
      { error: 'SMS provider is not configured on the server.' },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const fullName = sanitizeText(payload.fullName, 120);
  const email = sanitizeText(payload.email, 120);
  const phone = sanitizeText(payload.phone, 32);
  const message = sanitizeText(payload.message, 1200);

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: 'Full Name, Email, and Message are required.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 });
  }

  if (phone && !isE164(phone)) {
    return NextResponse.json(
      { error: 'Phone must be in international E.164 format.' },
      { status: 400 }
    );
  }

  const client = twilio(config.accountSid, config.authToken);
  const ownerMessage = [
    'New contact form message:',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Message: ${message}`,
  ].join('\n');

  try {
    await client.messages.create({
      body: ownerMessage,
      from: config.fromNumber,
      to: config.receiverNumber,
    });

    if (phone) {
      await client.messages.create({
        body:
          'Your message was submitted successfully to Andre Floquet. He will get in touch with you within the next 24 hours.',
        from: config.fromNumber,
        to: phone,
      });
    }

    return NextResponse.json({
      ok: true,
      message:
        'Message sent successfully. Andre Floquet will get in touch with you soon.',
    });
  } catch (error) {
    console.error('Twilio send failed:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS messages. Please try again.' },
      { status: 500 }
    );
  }
}
