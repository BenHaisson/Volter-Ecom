# VOLTERRA E-commerce Website

Production-style single-page e-commerce site for VOLTERRA, a premium electric dirt bike brand.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- LocalStorage cart and reservation lead persistence

## Features

- Sticky glass navigation with responsive mobile menu
- Cinematic hero and launch CTA using supplied VOLTERRA assets
- Three product variants with specs, pricing, color dots, detail modal, add-to-cart, and reserve actions
- Persistent cart drawer with quantity controls, removal, shipping, subtotal, and total
- Checkout/reservation/dealer quote modal with success state
- Placeholder integration functions for Stripe, PayPal, bank transfer, or CRM lead routing
- Performance, technology, gallery, comparison, FAQ, and footer sections
- All supplied brand and bike images organized under `public/assets`

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

The production output is generated in `dist/` and is deployable to Vercel without modification.

## Payment Integration

Payment processing is intentionally not active. Connect `createCheckoutSession()` and `submitReservationLead()` in `src/utils/checkout.ts` to a PCI-compliant checkout provider, financing flow, CRM, or backend API before accepting real orders.
