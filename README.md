# SecureSense (SonarApp)

Production-ready Expo Router + TypeScript scaffold for an IoT security monitoring app with:

- Dark + calm light themes
- Firebase Auth + Realtime Database integration points
- Zustand stores for auth/devices/monitoring/notifications/theme
- React Hook Form + Zod validation
- Reanimated, Gesture Handler, SVG mini charts
- Full screen flow: splash, onboarding, auth, dashboard, devices, add device, detail, activity, notification center, profile

## Setup

1. Install deps:

```bash
npm install
```

2. Create `.env` with Firebase values:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

3. Run app:

```bash
npm run start
```
