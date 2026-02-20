import md5 from 'md5';

// PayU Sandbox Credentials (Standard Latam)
const PAYU_CONFIG = {
  MERCHANT_ID: process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID || '508029',
  API_KEY: process.env.NEXT_PUBLIC_PAYU_API_KEY || '4Vj8eK4rloUd272L48hsrarnUA',
  ACCOUNT_ID: process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID || '512323',
  API_LOGIN: process.env.NEXT_PUBLIC_PAYU_API_LOGIN || 'pRRXKOl8ikMmt9u',
  API_URL:
    process.env.NEXT_PUBLIC_PAYU_API_URL ||
    'https://sandbox.api.payulatam.com/payments-api/4.0/service.cgi',
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

export interface PayUTransaction {
  order: {
    accountId: string;
    referenceCode: string;
    description: string;
    language: string;
    signature: string;
    additionalValues: {
      TX_VALUE: {
        value: number;
        currency: string;
      };
    };
    buyer?: {
      fullName: string;
      emailAddress: string;
      contactPhone: string;
    };
  };
  payer: {
    fullName: string;
    emailAddress: string;
    contactPhone: string;
    dniNumber: string;
  };
  creditCard?: {
    number: string;
    securityCode: string;
    expirationDate: string; // YYYY/MM
    name: string;
  };
  extraParameters?: Record<string, unknown>;
  type: 'AUTHORIZATION_AND_CAPTURE' | 'AUTHORIZATION' | 'CAPTURE';
  paymentMethod: string;
  paymentCountry: 'PE' | 'CO' | 'MX' | 'CL' | 'AR' | 'BR' | 'PA';
  deviceSessionId?: string;
  ipAddress: string;
  cookie?: string;
  userAgent?: string;
}

export const payuRequest = async (data: PayUTransaction) => {
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
        apiLogin: PAYU_CONFIG.API_LOGIN,
      },
      transaction: data,
      test: true,
    }),
  });

  return response.json();
};
