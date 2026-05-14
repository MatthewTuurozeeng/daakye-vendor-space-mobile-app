# Daakye Vendor Space Mobile Platform

## Overview
Daakye Vendor Space is a mobile-first inventory and sales management platform for small and medium-scale vendors in Ghanaian local markets. It digitizes day-to-day operations that are often managed with notebooks and manual calculations, while staying lightweight for low-end Android devices and low-connectivity environments.

## Problem Statement
Many vendors operate without structured digital tools, leading to stockouts, overstocking, inaccurate sales records, slow reconciliation, and limited business insights. Existing solutions are often too expensive, complex, or internet-dependent for informal market environments.

## Proposed Solution
The platform provides a simple, scalable, and accessible way to track inventory, record sales, and analyze performance. It prioritizes usability, low data usage, and future offline support.

## Core Objectives
- Digitize inventory management
- Simplify sales recording
- Automate stock deductions
- Improve stock visibility and reduce losses
- Enable data-driven decisions with analytics
- Support offline-capable workflows
- Build a modular, extensible architecture

## Core Features
- **Inventory Management:** add/edit products, categorize, track stock, set low-stock thresholds
- **Sales Management:** record sales, auto-deduct stock, generate transaction history
- **Notifications:** low-stock alerts, push notifications
- **Analytics Dashboard:** revenue trends, top products, performance insights
- **Authentication:** login/register, JWT auth, role-based access

## Target Users
- Market vendors
- Kiosk operators
- Mini-marts and small retail shops
- Wholesalers and store attendants

## Architecture
A **Modular Monolith** architecture is proposed to keep deployment simple while allowing future scaling:
- React Native mobile app
- REST API with modules (auth, inventory, sales, analytics, notifications)
- MongoDB Atlas

This approach supports maintainability and future migration to microservices if needed.

## Tech Stack (Planned)
**Mobile**: React Native, Expo, TypeScript, React Navigation, Axios, AsyncStorage
**Backend**: Node.js, Express.js, JWT, Bcrypt
**Database**: MongoDB Atlas
**Notifications**: Firebase Cloud Messaging
**Analytics**: Victory Native
**Tools**: VS Code, GitHub, Postman, Figma

## Implementation Roadmap (Summary)
1. Research & Planning
2. UI/UX Design
3. Backend Development
4. Mobile App Development
5. Analytics & Notifications
6. Testing & Optimization
7. Pilot Deployment

## Estimated Timeline & Budget
- **Timeline (MVP):** ~10 weeks
- **Budget:** $0–50 (MVP), excluding Google Play Console fee (~$25)

## Project Structure
- `daakye-vendor-space-app/` – Expo React Native app
- `docs/` – proposal and presentation materials

## Getting Started
From the app directory:

```zsh
cd daakye-vendor-space-app
npm install
npm run start
```

## Linting
Linting is wired to run fast on staged files using Husky + lint-staged.

```zsh
npm run lint
```

## Notes
This README is based on the project proposal in `docs/Daakye_Vendor_Space_Project_Proposal.docx`.
