# Cineplanet Frontend Challenge

This project is a cinema e-commerce application built for the Cineplanet technical challenge.

## PayU Testing Data (Sandbox Peru)

Use the following data to test the payment flow.

### Test Cards (Peru)

| Card Type             | Number                                   |
| :-------------------- | :--------------------------------------- |
| **VISA Credit**       | `4907840000000005` or `4634010000000005` |
| **VISA Debit**        | `4557880000000004`                       |
| **Mastercard Credit** | `5491610000000001`                       |
| **Mastercard Debit**  | `5236930000000003`                       |
| **AMEX**              | `3777530000000009`                       |
| **DINERS**            | `3623920000000000`                       |

### Yape (Peru)

| Type     | Test Phone  | OTP (Code) | Note                     |
| :------- | :---------- | :--------- | :----------------------- |
| **Yape** | `969929157` | `557454`   | Approval Code in Sandbox |

### Simulating Transaction Status (Cards)

| Status       | Requirement                                                                  |
| :----------- | :--------------------------------------------------------------------------- |
| **APPROVED** | Card Name must contain `APPROVED`, CVV: `777` (AMEX `7777`), Exp. Month < 6. |
| **REJECTED** | Card Name must contain `REJECTED`, CVV: `666` (AMEX `6666`), Exp. Month > 6. |

---

## Technical Context (PayU Integration)

### Mandatory Parameters for Peru

When processing credit card payments in Peru, the `extraParameters` field MUST include `INSTALLMENTS_NUMBER`. Failure to include this will result in a **500 Internal Server Error** from the PayU API.

### Yape Implementation

Yape payments require the `OTP` parameter within `extraParameters` and the transaction type set to `AUTHORIZATION_AND_CAPTURE`.

---

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit + Redux Saga
- **Auth**: Firebase Authentication (Google Sign-In)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Payment**: PayU Latam SDK (Sandbox)

## Getting Started

First, fill in the `.env.local` file with your Firebase credentials (see `.env.local.example`).

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
