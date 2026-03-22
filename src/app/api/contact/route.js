import { createHash } from 'node:crypto';

import { NextResponse } from 'next/server';
import twilio from 'twilio';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 3 * 60 * 1000;

const rateLimitStore = globalThis.__contactRateLimitStore || new Map();
const duplicateStore = globalThis.__contactDuplicateStore || new Map();

globalThis.__contactRateLimitStore = rateLimitStore;
globalThis.__contactDuplicateStore = duplicateStore;

function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const receiverNumber = process.env.CONTACT_RECEIVER_NUMBER;

  if (!accountSid || !authToken || !fromNumber || !receiverNumber) {
    return null;
  }

  return { accountSid, authToken, fromNumber, receiverNumber };
}

function getBrevoConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const ownerEmail = process.env.BREVO_OWNER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'Andre Floquet Website';

  if (!apiKey || !senderEmail || !ownerEmail) {
    return null;
  }

  return { apiKey, senderEmail, ownerEmail, senderName };
}

function getBusinessConfig() {
  return {
    businessName: process.env.BUSINESS_NAME || 'Andre Floquet',
    timezone: process.env.BUSINESS_TIMEZONE || 'Australia/Brisbane',
  };
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

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function pruneMapByAge(map, maxAgeMs) {
  const now = Date.now();
  for (const [key, value] of map.entries()) {
    if (now - value.timestamp > maxAgeMs) {
      map.delete(key);
    }
  }
}

function checkRateLimit(ip) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { windowStart: now, count: 1, timestamp: now });
    return { limited: false, retryAfterSec: 0 };
  }

  current.count += 1;
  current.timestamp = now;
  rateLimitStore.set(ip, current);

  if (current.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSec = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - current.windowStart)) / 1000
    );
    return { limited: true, retryAfterSec };
  }

  return { limited: false, retryAfterSec: 0 };
}

function isDuplicateSubmission({ fullName, email, phone, message }) {
  pruneMapByAge(duplicateStore, DUPLICATE_WINDOW_MS);

  const digest = createHash('sha256')
    .update(`${fullName}|${email.toLowerCase()}|${phone}|${message.toLowerCase()}`)
    .digest('hex');

  const existing = duplicateStore.get(digest);
  if (existing) return true;

  duplicateStore.set(digest, { timestamp: Date.now() });
  return false;
}

function formatTimestamp(timezone) {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone: timezone,
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildOwnerSms({ businessName, timezone, fullName, email, phone, message }) {
  return [
    `New contact via ${businessName}`,
    `Time: ${formatTimestamp(timezone)} (${timezone})`,
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Message: ${message}`,
  ].join('\n');
}

function buildVisitorSms({ businessName, timezone }) {
  return `Thanks for contacting ${businessName}. Your message was submitted successfully. You can expect a reply within 24 hours (${timezone}).`;
}

function buildOwnerEmailTemplate({
  businessName,
  timezone,
  fullName,
  email,
  phone,
  message,
}) {
  const time = formatTimestamp(timezone);
  const safeBusinessName = escapeHtml(businessName);
  const safeTimezone = escapeHtml(timezone);
  const safeTime = escapeHtml(time);
  const safeFullName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || 'Not provided');
  const safeMessage = escapeHtml(message);

  const subject = `[Contact Form] New message for ${businessName}`;
  const textContent = [
    `A new contact form message was received for ${businessName}.`,
    `Time: ${time} (${timezone})`,
    '',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    '',
    `Message: ${message}`,
  ].join('\n');

  const htmlContent = `
    <div style="background:#f8fafc;padding:24px;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;background:linear-gradient(90deg,#0284c7,#4f46e5);color:#ffffff;">
            <h2 style="margin:0;font-size:20px;line-height:1.3;">New Contact Form Submission</h2>
            <p style="margin:8px 0 0;font-size:13px;opacity:.95;">${safeBusinessName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 24px;">
            <p style="margin:0 0 14px;font-size:14px;color:#334155;">A new message was submitted from your website contact form.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:140px;">Submitted</td><td style="padding:8px 0;font-size:14px;">${safeTime} (${safeTimezone})</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Full Name</td><td style="padding:8px 0;font-size:14px;">${safeFullName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:8px 0;font-size:14px;">${safeEmail}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Phone</td><td style="padding:8px 0;font-size:14px;">${safePhone}</td></tr>
            </table>
            <div style="margin-top:16px;padding:14px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;">
              <p style="margin:0 0 6px;color:#64748b;font-size:13px;">Message</p>
              <p style="margin:0;font-size:14px;white-space:pre-wrap;">${safeMessage}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;

  return { subject, textContent, htmlContent };
}

function buildVisitorEmailTemplate({
  businessName,
  timezone,
  fullName,
  message,
}) {
  const time = formatTimestamp(timezone);
  const safeBusinessName = escapeHtml(businessName);
  const safeTimezone = escapeHtml(timezone);
  const safeTime = escapeHtml(time);
  const safeFullName = escapeHtml(fullName);
  const safeMessage = escapeHtml(message);

  const subject = `${businessName}: Message received`;
  const textContent = [
    `Hi ${fullName},`,
    '',
    `Your message was submitted successfully to ${businessName} on ${time} (${timezone}).`,
    'We will get in touch with you within the next 24 hours.',
    '',
    `Your message: ${message}`,
    '',
    'Thank you.',
  ].join('\n');

  const htmlContent = `
    <div style="background:#f8fafc;padding:24px;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;background:linear-gradient(90deg,#0284c7,#4f46e5);color:#ffffff;">
            <h2 style="margin:0;font-size:20px;line-height:1.3;">Message Received</h2>
            <p style="margin:8px 0 0;font-size:13px;opacity:.95;">${safeBusinessName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:22px 24px;">
            <p style="margin:0 0 14px;font-size:14px;">Hi ${safeFullName},</p>
            <p style="margin:0 0 14px;font-size:14px;color:#334155;">
              Thanks for contacting <strong>${safeBusinessName}</strong>. Your message was submitted successfully on ${safeTime} (${safeTimezone}).
            </p>
            <p style="margin:0 0 14px;font-size:14px;color:#334155;">
              We will get in touch with you within the next 24 hours.
            </p>
            <div style="margin-top:16px;padding:14px;border:1px solid #e2e8f0;border-radius:10px;background:#f8fafc;">
              <p style="margin:0 0 6px;color:#64748b;font-size:13px;">Copy of your message</p>
              <p style="margin:0;font-size:14px;white-space:pre-wrap;">${safeMessage}</p>
            </div>
            <p style="margin:16px 0 0;font-size:13px;color:#64748b;">This is an automated confirmation email.</p>
          </td>
        </tr>
      </table>
    </div>
  `;

  return { subject, textContent, htmlContent };
}

async function sendBrevoEmail(config, { to, subject, textContent, htmlContent }) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify({
      sender: { email: config.senderEmail, name: config.senderName },
      to: [{ email: to }],
      subject,
      textContent,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${detail}`);
  }
}

export async function POST(request) {
  pruneMapByAge(rateLimitStore, RATE_LIMIT_WINDOW_MS * 2);

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (rateLimit.limited) {
    return NextResponse.json(
      {
        error:
          'Too many submissions in a short period. Please wait a few minutes and try again.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSec),
        },
      }
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
  const honeypot = sanitizeText(payload.company, 120);

  if (honeypot) {
    return NextResponse.json({ ok: true, message: 'Message received.' });
  }

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

  if (isDuplicateSubmission({ fullName, email, phone, message })) {
    return NextResponse.json(
      {
        error:
          'This message looks like a duplicate submission. Please wait a moment before trying again.',
      },
      { status: 429 }
    );
  }

  const twilioConfig = getTwilioConfig();
  const brevoConfig = getBrevoConfig();
  const business = getBusinessConfig();

  if (!twilioConfig && !brevoConfig) {
    return NextResponse.json(
      { error: 'No delivery provider is configured on the server.' },
      { status: 500 }
    );
  }

  let ownerDelivered = false;
  let visitorDelivered = false;
  let ownerChannel = null;
  let visitorChannel = null;
  let ownerEmailDelivered = false;
  let visitorEmailDelivered = false;

  if (twilioConfig) {
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    const ownerSms = buildOwnerSms({
      businessName: business.businessName,
      timezone: business.timezone,
      fullName,
      email,
      phone,
      message,
    });

    try {
      await client.messages.create({
        body: ownerSms,
        from: twilioConfig.fromNumber,
        to: twilioConfig.receiverNumber,
      });
      ownerDelivered = true;
      ownerChannel = 'sms';
    } catch (error) {
      console.error('Twilio owner SMS failed:', error);
    }

    if (phone) {
      try {
        await client.messages.create({
          body: buildVisitorSms({
            businessName: business.businessName,
            timezone: business.timezone,
          }),
          from: twilioConfig.fromNumber,
          to: phone,
        });
        visitorDelivered = true;
        visitorChannel = 'sms';
      } catch (error) {
        console.error('Twilio visitor SMS failed:', error);
      }
    }
  }

  if (brevoConfig) {
    try {
      const ownerEmailTemplate = buildOwnerEmailTemplate({
        businessName: business.businessName,
        timezone: business.timezone,
        fullName,
        email,
        phone,
        message,
      });

      await sendBrevoEmail(brevoConfig, {
        to: brevoConfig.ownerEmail,
        ...ownerEmailTemplate,
      });

      ownerEmailDelivered = true;
      ownerDelivered = true;
      ownerChannel = ownerChannel ? `${ownerChannel}+email` : 'email';
    } catch (error) {
      console.error('Brevo owner email failed:', error);
    }

    try {
      const visitorEmailTemplate = buildVisitorEmailTemplate({
        businessName: business.businessName,
        timezone: business.timezone,
        fullName,
        message,
      });

      await sendBrevoEmail(brevoConfig, {
        to: email,
        ...visitorEmailTemplate,
      });
      visitorEmailDelivered = true;
      visitorDelivered = true;
      visitorChannel = visitorChannel ? `${visitorChannel}+email` : 'email';
    } catch (error) {
      console.error('Brevo visitor confirmation email failed:', error);
    }
  } else {
    visitorDelivered = visitorDelivered || !phone;
  }

  if (!ownerDelivered) {
    return NextResponse.json(
      {
        error:
          'We could not deliver your message notification right now. Please try again shortly.',
      },
      { status: 500 }
    );
  }

  if (brevoConfig && (!ownerEmailDelivered || !visitorEmailDelivered)) {
    return NextResponse.json(
      {
        error:
          'Your message was received, but confirmation emails could not be delivered. Please verify Brevo sender/domain configuration.',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Message sent successfully. ${business.businessName} will get in touch with you soon.`,
  });
}
