/**
 * Public brand contact details (from GST REG-06 certificate).
 * Env vars override these if set.
 */
export const siteContact = {
  legalName: 'KAANSA & CO',
  gstin: '09ABGFK2212D1ZS',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'kaansaindia@gmail.com',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+91 72690 16093',
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? '917269016093',
  address:
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
    '865, Gwal Toli, Civil Lines Road\nJhansi, Uttar Pradesh 284003\nIndia',
  hours: 'Monday to Saturday, 10am to 7pm IST',
};
