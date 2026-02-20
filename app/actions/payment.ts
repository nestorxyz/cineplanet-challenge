'use server';

import { PayUTransaction, payuRequest } from '@/lib/payu';

/**
 * Server Action to securely process a PayU transaction.
 * This keeps all sensitive credentials and logic on the server.
 */
export async function processPayment(transaction: PayUTransaction) {
  try {
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
