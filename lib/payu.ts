import md5 from 'md5';

// PayU Sandbox Credentials (Standard)
const PAYU_CONFIG = {
  MERCHANT_ID: '508029',
  API_KEY: '4Vj8eK4rph97Od2p6S91E5s9n-', // DO NOT USE IN PRODUCTION
  ACCOUNT_ID: '512321',
  API_URL: 'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi',
};

/**
 * Generates the signature for PayU request
 * Signature = md5(ApiKey~merchantId~referenceCode~amount~currency)
 */
export const generatePayUSignature = (
  referenceCode: string,
  amount: string,
  currency: string,
) => {
  const rawSignature = `${PAYU_CONFIG.API_KEY}~${PAYU_CONFIG.MERCHANT_ID}~${referenceCode}~${amount}~${currency}`;
  return md5(rawSignature);
};

export const payuRequest = async (data: any) => {
  const response = await fetch(PAYU_CONFIG.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      language: 'es',
      command: 'SUBMIT_TRANSACTION',
      merchant: {
        apiKey: PAYU_CONFIG.API_KEY,
        apiLogin: 'pRRXKOFm8tfGsc7', // Standard sandbox login
      },
      transaction: data,
      test: true,
    }),
  });

  return response.json();
};
