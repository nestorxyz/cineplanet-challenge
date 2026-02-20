# Cineplanet Frontend Challenge

This project is a cinema e-commerce application built for the Cineplanet technical challenge.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher
- **pnpm**: v9 or higher

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cineplanet-challenge
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Environment Variables

The project requires several environment variables for Firebase and PayU. Copy the example file and fill in the missing values (especially the Firebase credentials).

```bash
cp .env.local.example .env.local
```

| Variable                 | Description                                               |
| :----------------------- | :-------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase project credentials (API Key, Project ID, etc.)  |
| `PAYU_MERCHANT_ID`       | Your PayU Merchant ID (Sandbox: `508029`)                 |
| `PAYU_API_KEY`           | Your PayU API Key (Sandbox: `4Vj8eK4rloUd272L48hsrarnUA`) |
| `PAYU_ACCOUNT_ID`        | Your PayU Account ID (Sandbox: `512323`)                  |
| `PAYU_API_LOGIN`         | Your PayU API Login (Sandbox: `pRRXKOl8ikMmt9u`)          |
| `PAYU_API_URL`           | PayU Sandbox API URL                                      |

## Available Scripts

In the project directory, you can run:

| Script       | description                                                                         |
| :----------- | :---------------------------------------------------------------------------------- |
| `pnpm dev`   | Runs the app in development mode at [http://localhost:3000](http://localhost:3000). |
| `pnpm build` | Builds the application for production for deployment.                               |
| `pnpm start` | Starts the production server after building.                                        |
| `pnpm lint`  | Runs ESLint to check for code quality issues.                                       |

## Project Structure

```text
├── app/               # Next.js App Router (Pages & Layouts)
│   ├── actions/       # Server Actions (e.g., Payment processing)
│   ├── dulceria/      # Candy Shop page
│   ├── login/         # Authentication page
│   └── pago/          # Payment & Checkout page
├── components/        # Reusable UI components (shadcn/ui)
├── lib/               # Utility functions and shared logic
│   ├── store/         # Redux Toolkit setup (Slices & Saga)
│   ├── AuthContext.tsx # Firebase Authentication Provider
│   └── mocks.ts       # Mock data and test constants
└── public/            # Static assets (Images, Icons)
```

---

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit + Redux Saga
- **Auth**: Firebase Authentication (Google Sign-In)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Payment**: PayU Latam SDK (Sandbox)

---

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
