'use server';

import {
  PayUTransaction,
  payuRequest,
  generatePayUSignature,
} from '@/lib/payu';
import { env } from '@/lib/env';
import crypto from 'crypto';

interface PaymentPayload {
  amount: number;
  description: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  payerDni: string;
  creditCard?: {
    number: string;
    securityCode: string;
    expirationDate: string; // YYYY/MM
    name: string;
  };
  paymentMethod: string;
  // Yape specific
  otp?: string;
  contactPhone?: string;
}

/**
 * Server Action to securely process a PayU transaction.
 * Generates signature and injects merchant IDs on the server.
 */
export async function processPayment(payload: PaymentPayload) {
  try {
    const referenceCode = `CP-${Date.now()}-${crypto.randomUUID().substring(0, 8)}`;
    const currency = 'PEN';
    const amountStr = payload.amount.toString();

    // Generate signature using PRIVATE server-side API Key
    const signature = generatePayUSignature(referenceCode, amountStr, currency);

    // Mandatory address data for Peru
    const defaultAddress = {
      street1: 'Av. Isabel La Católica 103',
      city: 'Lima',
      state: 'Lima y Callao',
      country: 'PE',
      postalCode: '15011',
      phone: payload.payerPhone,
    };

    const isYape = payload.paymentMethod === 'YAPE';

    const transaction: PayUTransaction = {
      order: {
        accountId: parseInt(env.PAYU_ACCOUNT_ID),
        referenceCode,
        description: payload.description,
        language: 'es',
        signature,
        additionalValues: {
          TX_VALUE: {
            value: payload.amount,
            currency,
          },
        },
        buyer: {
          fullName: payload.payerName,
          emailAddress: payload.payerEmail,
          contactPhone: payload.payerPhone,
          dniNumber: payload.payerDni,
          shippingAddress: defaultAddress,
        },
      },
      payer: {
        fullName: payload.payerName,
        emailAddress: payload.payerEmail,
        contactPhone: isYape
          ? payload.contactPhone || payload.payerPhone
          : payload.payerPhone,
        dniNumber: payload.payerDni,
        dniType: 'DNI',
        billingAddress: defaultAddress,
      },
      type: 'AUTHORIZATION_AND_CAPTURE',
      paymentMethod: payload.paymentMethod || 'VISA',
      paymentCountry: 'PE',
      deviceSessionId: 'vghs6tvkcle931686k1900o6e1', // In prod, should come from client
      ipAddress: '127.0.0.1',
      cookie: 'pt1t38347bs6jc9ruv2ecpv7o2', // In prod, should come from client
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36',
    };

    if (isYape) {
      transaction.extraParameters = {
        OTP: payload.otp,
      };
      // For Yape in Sandbox, expirationDate is often required in examples
      transaction.expirationDate = new Date(Date.now() + 86400000)
        .toISOString()
        .split('.')[0];
    } else {
      transaction.creditCard = payload.creditCard;
      transaction.extraParameters = {
        INSTALLMENTS_NUMBER: 1,
      };
    }

    const result = await payuRequest(transaction);
    return { success: true, data: result };
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown payment error',
    };
  }
}
