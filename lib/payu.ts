import md5 from 'md5';
import { env } from './env';

// PayU Sandbox Credentials (Standard Latam)
const PAYU_CONFIG = {
  MERCHANT_ID: env.PAYU_MERCHANT_ID,
  API_KEY: env.PAYU_API_KEY,
  ACCOUNT_ID: env.PAYU_ACCOUNT_ID,
  API_LOGIN: env.PAYU_API_LOGIN,
  API_URL: env.PAYU_API_URL,
};

/**
 * Generates the signature for PayU request
 * Signature = md5(ApiKey~merchantId~referenceCode~amount~currency)
 */
export const generatePayUSignature = (
  referenceCode: string,
  amount: number | string,
  currency: string,
) => {
  // PayU Latam expects the amount as a string. If it's a number, we ensure it's formatted
  // correctly. For integer values, it shouldn't have decimals.
  const amountStr = typeof amount === 'number' ? amount.toString() : amount;
  const rawSignature = `${PAYU_CONFIG.API_KEY}~${PAYU_CONFIG.MERCHANT_ID}~${referenceCode}~${amountStr}~${currency}`;
  return md5(rawSignature);
};

export interface PayUTransaction {
  order: {
    accountId: number;
    referenceCode: string;
    description: string;
    language: string;
    signature: string;
    notifyUrl?: string;
    additionalValues: {
      TX_VALUE: {
        value: number;
        currency: string;
      };
      TX_TAX?: {
        value: number;
        currency: string;
      };
      TX_TAX_RETURN_BASE?: {
        value: number;
        currency: string;
      };
    };
    buyer: {
      merchantBuyerId?: string;
      fullName: string;
      emailAddress: string;
      contactPhone: string;
      dniNumber: string;
      shippingAddress: {
        street1: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        phone: string;
      };
    };
    shippingAddress?: {
      street1: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      phone: string;
    };
  };
  payer: {
    merchantPayerId?: string;
    fullName: string;
    emailAddress: string;
    contactPhone: string;
    dniNumber: string;
    dniType: string;
    billingAddress: {
      street1: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      phone: string;
    };
  };
  creditCard?: {
    number: string;
    securityCode: string;
    expirationDate: string; // YYYY/MM
    name: string;
  };
  extraParameters?: {
    INSTALLMENTS_NUMBER?: number;
    OTP?: string; // For Yape
  };
  type: string;
  paymentMethod: string;
  paymentCountry: string;
  deviceSessionId: string;
  ipAddress: string;
  cookie: string;
  userAgent: string;
  expirationDate?: string; // For cash/Yape
}

export const payuRequest = async (data: PayUTransaction) => {
  try {
    console.log(`Sending PayU request to: ${PAYU_CONFIG.API_URL}`);
    console.log(
      'Request Body:',
      JSON.stringify({ ...data, creditCard: '***' }),
    );

    const response = await fetch(PAYU_CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
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

    const text = await response.text();

    try {
      const jsonResponse = JSON.parse(text);
      if (!response.ok) {
        console.error('PayU API Error Response:', jsonResponse);
      }
      return jsonResponse;
    } catch {
      console.error('PayU Response is not JSON. Full Response:', text);
      throw new Error(
        `PayU API returned non-JSON response (Status: ${response.status})`,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('PayU Request Failed:', error.message);
      throw error;
    }
    throw new Error('An unknown error occurred during PayU request');
  }
};
