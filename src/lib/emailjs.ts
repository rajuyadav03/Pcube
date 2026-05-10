import emailjs from '@emailjs/browser';

export const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
export const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export const TEMPLATE_IDS = {
  contact: 'YOUR_CONTACT_TEMPLATE_ID',
  volunteer: 'YOUR_VOLUNTEER_TEMPLATE_ID',
  sponsor: 'YOUR_SPONSOR_TEMPLATE_ID',
};

export function sendEmail(templateId: string, params: Record<string, string>) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    templateId,
    params,
    EMAILJS_PUBLIC_KEY
  );
}
