# AGENTS.md - Cineplanet Assistant Context

This document provides a comprehensive overview of the Cineplanet Frontend Challenge project for AI coding assistants.

## 🚀 Product Overview

A cinema e-commerce application built for the Cineplanet technical challenge. It handles movie premiere discovery, candy store product selection, and a complete payment flow integrated with PayU Latam.

## 🛠 Technical Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Package Manager**: pnpm
- **State Management**: Redux Toolkit + Redux Saga
- **UI & Styling**: Tailwind CSS 4, shadcn/ui, Lucide Icons
- **Authentication**: Firebase Auth (Google Sign-In)
- **Payment**: PayU Latam API (Sandbox mode for Peru)
- **Validation**: Zod + @t3-oss/env-nextjs (for environment safety)

## 📂 Key File Map

### Infrastructure

- `lib/firebase.ts`: Firebase initialization and Google Auth provider.
- `lib/payu.ts`: PayU Latam API integration, types, and signature generation logic.
- `lib/mocks.ts`: Local mock services for premieres, products, and transaction completion.
- `lib/AuthContext.tsx`: React Context for managing authenticated and guest users.

### State Management (`lib/store`)

- `rootReducer.ts`: Combined reducers (auth, cart, premieres).
- `rootSaga.ts`: Combined sagas.
- `slices/`: RTK slices defining state and actions.
- `sagas/`: Redux Saga implementations for async side effects.
- `ReduxProvider.tsx`: Client-side provider wrapping the application.

### UI Components

- `components/Navbar.tsx`: Sticky navigation with responsive auth states.
- `components/ui/`: shadcn/ui base components.
- `app/layout.tsx`: Root layout with fonts (Montserrat/Inter) and context providers.
- `app/page.tsx`: Home page featuring the dynamic list of premieres.

## 🔑 Crucial Context

### Environment Variables

Managed via `.env.local`. See `.env.local.example` for the required structure.

- **PayU**: Sandbox credentials for Peru are pre-filled in the example.
- **Firebase**: Requires real project credentials for Auth to work.

### Payment Logic (PayU Latam)

- Use `generatePayUSignature` from `lib/payu.ts` to sign requests.
- Transaction currency must be **PEN**.
- Refer to `README.md` for test card numbers and status simulation (APPROVED/REJECTED).

### Data Mocking

Async operations on the Home page and Dulcería are currently powered by `lib/mocks.ts`. These simulate real API latency and results.

## 📝 Guidelines for AI

1. **Theming**: Always use the "Electric Blue" primary color.
2. **Components**: Prefer `shadcn/ui` components. If a new one is needed, install it via `npx shadcn@latest add <component>`.
3. **Types**: Maintain strict TypeScript typing. Use interfaces defined in `lib/payu.ts` and `lib/store`.
4. **Performance**: Wrap interactive components with `"use client"` where necessary but keep layouts server-side.
