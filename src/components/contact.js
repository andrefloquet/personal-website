'use client';

import { useMemo, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { getCountryCallingCode, getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import 'react-phone-input-2/lib/style.css';

function getExampleInternationalNumber(countryData) {
  const countryIso = countryData?.countryCode?.toUpperCase();
  const fallbackDialCode = countryData?.dialCode ? `+${countryData.dialCode}` : '';
  const fallbackExample = fallbackDialCode
    ? `Example: ${fallbackDialCode} 123 456 789`
    : 'Example: +61 412 345 678';

  if (!countryIso) return fallbackExample.replace('Example: ', '');

  const exampleNumber = getExampleNumber(countryIso, examples);
  if (!exampleNumber) return fallbackExample.replace('Example: ', '');

  return exampleNumber.formatInternational();
}

function toPhoneFormatHint(countryData) {
  return `Example: ${getExampleInternationalNumber(countryData)}`;
}

function toMaskFromExample(countryIso) {
  try {
    const exampleNumber = getExampleNumber(countryIso, examples);
    if (!exampleNumber) return null;

    const intl = exampleNumber.formatInternational();
    const dialCode = getCountryCallingCode(countryIso);
    const nationalWithSpacing = intl.replace(new RegExp(`^\\+${dialCode}\\s*`), '');

    return nationalWithSpacing.replace(/\d/g, '.');
  } catch {
    return null;
  }
}

function normalizeToE164(value, dialCode = '') {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits || (dialCode && digits === dialCode)) return '';
  return `+${digits}`;
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [phone, setPhone] = useState('61 ');
  const [phoneE164, setPhoneE164] = useState('');
  const [phoneCountry, setPhoneCountry] = useState('au');
  const [phoneHint, setPhoneHint] = useState('Example: +61 412 345 678');
  const phonePlaceholder = phoneHint.replace('Example: ', '');
  const countryMasks = useMemo(() => {
    const maskMap = {};

    for (const countryIso of Object.keys(examples)) {
      const mask = toMaskFromExample(countryIso);
      if (mask) {
        maskMap[countryIso.toLowerCase()] = mask;
      }
    }

    return maskMap;
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const errors = {};

    const fullName = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!fullName) errors.fullName = 'Full Name is required.';
    if (!email) errors.email = 'Email is required.';
    if (!message) errors.message = 'Message is required.';

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setIsSubmitted(false);
      setSubmitMessage(null);
      return;
    }

    setIsSending(true);
    setSubmitMessage(null);
    setFieldErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone: phoneE164,
          message,
          company: String(formData.get('company') || ''),
        }),
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        // If API returns 200 with an empty/non-JSON body, still treat as success.
        result = {};
      }

      if (!response.ok) {
        setIsSubmitted(false);
        setSubmitMessage({
          type: 'error',
          text: result?.error || 'Something went wrong. Please try again.',
        });
        return;
      }

      setIsSubmitted(true);
      setSubmitMessage({
        type: 'success',
        text:
          result?.message ||
          'Message sent successfully. Andre Floquet will get in touch with you soon.',
      });
      setPhone('61 ');
      setPhoneE164('');
      setPhoneCountry('au');
      setPhoneHint('Example: +61 412 345 678');
      formElement.reset();
    } catch (error) {
      console.error('Contact form submit failed on client:', error);
      setIsSubmitted(false);
      setSubmitMessage({
        type: 'error',
        text: 'Unable to send your message right now. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  }

  function lockToDialCodeOnly(countryData) {
    const dialCode = countryData?.dialCode || '';
    return dialCode ? `${dialCode} ` : '';
  }

  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto max-w-9/10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="mb-3 text-4xl font-bold">Contact</h2>
          <p className="text-slate-600">
            Have a project in mind or want to connect? Send a message and I will
            get back to you.
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <input
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
                  fieldErrors.fullName ? 'border-red-400' : 'border-slate-300'
                }`}
                placeholder="Your full name"
              />
              {fieldErrors.fullName && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
                  fieldErrors.email ? 'border-red-400' : 'border-slate-300'
                }`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Phone (optional)
              </label>
              <PhoneInput
                country={phoneCountry}
                value={phone}
                onChange={(nextValue, countryData) => {
                  const dialCode = countryData?.dialCode || '';
                  const lockedDialCode = lockToDialCodeOnly(countryData);

                  // Never allow removing dial code via typing/deleting.
                  if (!nextValue || (dialCode && nextValue === dialCode)) {
                    setPhone(lockedDialCode);
                    setPhoneE164('');
                    if (countryData?.countryCode) {
                      setPhoneCountry(countryData.countryCode);
                    }
                    setPhoneHint(toPhoneFormatHint(countryData));
                    return;
                  }

                  const normalizedInputValue =
                    dialCode && nextValue === dialCode ? lockedDialCode : nextValue;

                  setPhone(normalizedInputValue);
                  setPhoneE164(normalizeToE164(nextValue, countryData?.dialCode));
                  if (countryData?.countryCode) {
                    setPhoneCountry(countryData.countryCode);
                  }
                  setPhoneHint(toPhoneFormatHint(countryData));
                }}
                enableSearch
                disableSearchIcon
                searchPlaceholder="🔎 Search country"
                autoFormat
                prefix="+"
                countryCodeEditable={false}
                placeholder={phonePlaceholder}
                masks={countryMasks}
                inputProps={{
                  id: 'phone',
                  name: 'phone_display',
                  autoComplete: 'tel',
                  onKeyDown: (event) => {
                    const isDeleteKey =
                      event.key === 'Delete' || event.key === 'Backspace';
                    if (!isDeleteKey) return;

                    const inputValue = event.currentTarget.value || '';
                    const selectionStart = event.currentTarget.selectionStart ?? 0;
                    const selectionEnd = event.currentTarget.selectionEnd ?? 0;
                    const isAllSelected =
                      inputValue.length > 0 &&
                      selectionStart === 0 &&
                      selectionEnd === inputValue.length;

                    if (!isAllSelected) return;

                    event.preventDefault();
                    const dialCode = getCountryCallingCode(phoneCountry.toUpperCase());
                    setPhone(dialCode ? `${dialCode} ` : '');
                    setPhoneE164('');
                  },
                }}
                containerClass="w-full"
                inputClass="!w-full !h-12 !rounded-lg !border !border-slate-300 !bg-white !pl-[4.6rem] !pr-4 !text-slate-900"
                buttonClass="!w-14 !rounded-l-lg !border-slate-300 !bg-white"
                inputStyle={{
                  paddingLeft: '4.6rem',
                  paddingRight: '1rem',
                }}
                dropdownStyle={{
                  width: 320,
                  maxHeight: 280,
                  border: '1px solid #E2E8F0',
                  borderRadius: 12,
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.16)',
                  zIndex: 70,
                }}
                searchStyle={{
                  width: 'calc(100% - 20px)',
                  margin: '0 10px 8px',
                  padding: '10px 12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: 8,
                  background: '#F8FAFC',
                  color: '#0F172A',
                  fontSize: 14,
                }}
              />
              <input type="hidden" name="phone" value={phoneE164} />
              <p className="mt-2 text-xs text-slate-500">{phoneHint}</p>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className={`w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 ${
                  fieldErrors.message ? 'border-red-400' : 'border-slate-300'
                }`}
                placeholder="Tell me about your project or question..."
              />
              {fieldErrors.message && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {isSubmitted && submitMessage?.type === 'success' && (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {submitMessage.text}
            </p>
          )}
          {submitMessage?.type === 'error' && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitMessage.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
