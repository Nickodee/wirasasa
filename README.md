# WiraSasa - On-Demand Blue-Collar Service Marketplace

A comprehensive React Native mobile application connecting clients with blue-collar service providers (Electricians, Plumbers, Mechanics, Gardeners, and more).

## Features

### Dual-Mode Application
- **Client Mode**: Find and hire service providers
- **Provider Mode**: Offer services and earn money
- Seamless role switching for providers

### Client Features
- Browse services with grid view
- Real-time map view of nearby providers
- Provider profiles with ratings and verification badges
- Live provider tracking
- In-app chat messaging
- Service rating and reviews
- Booking history

### Provider Features
- Online/Offline toggle
- Real-time job notifications
- Job assessment and invoicing
- Earnings tracking and analytics
- Job history
- Dashboard with statistics

## Tech Stack

- **React Native** 0.73.2
- **NativeWind v2** - Tailwind CSS for React Native
- **React Navigation v6** - Stack + Bottom Tabs navigation
- **Zustand** - State management
- **React Native Maps** - Google Maps integration
- **Axios** - API communication
- **React Native Gifted Chat** - In-app messaging
- **React Native Firebase** - Push notifications (ready for integration)

## Project Structure

```
wirasasa-mobile/
├── src/
│   ├── api/                  # API integration
│   │   ├── axiosConfig.js
│   │   ├── auth.api.js
│   │   ├── jobs.api.js
│   │   ├── payments.api.js
│   │   └── chat.api.js
│   ├── components/           # Reusable components
│   │   ├── common/
│   │   ├── client/
│   │   └── provider/
│   ├── screens/              # App screens
│   │   ├── auth/
│   │   ├── client/
│   │   ├── provider/
│   │   └── shared/
│   ├── navigation/           # Navigation configuration
│   ├── store/                # Zustand state management
│   ├── utils/                # Utility functions
│   ├── constants/            # App constants
│   └── theme/                # Global styles
├── App.js
├── index.js
└── package.json
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- React Native development environment setup
- Xcode (for iOS development)
- Android Studio (for Android development)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nickodee/wirasasa.git
   cd wirasasa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   ```
   API_BASE_URL=http://localhost:3000/api/v1
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

5. **Run the application**

   For iOS:
   ```bash
   npm run ios
   ```

   For Android:
   ```bash
   npm run android
   ```

   Start Metro bundler (if not started automatically):
   ```bash
   npm start
   ```

## Development

### Running on Device
- **iOS**: Open `ios/WiraSasa.xcworkspace` in Xcode and run on your device
- **Android**: Connect your device via USB, enable USB debugging, and run `npm run android`

### Debugging
- Use React Native Debugger or Flipper for debugging
- Enable Remote JS Debugging in the app developer menu

## Color Palette

The app uses a green primary theme:

```javascript
Primary Green: #22c55e
Primary Dark: #16a34a
Secondary: #f0fdf4
Accent Orange: #fb923c (Good Conduct Badge)
Accent Blue: #3b82f6 (Certificates Badge)
```

## API Integration

The app is designed to work with a backend API. Key endpoints:

- `POST /api/v1/auth/send-otp` - Send OTP for phone verification
- `POST /api/v1/auth/verify-otp` - Verify OTP
- `POST /api/v1/auth/register` - Register user
- `GET /api/v1/providers/nearby` - Get nearby providers
- `POST /api/v1/jobs` - Create job request
- `POST /api/v1/jobs/{id}/accept` - Accept job (provider)
- `POST /api/v1/jobs/{id}/invoice` - Send invoice
- `GET /api/v1/provider/earnings` - Get earnings data

## Key Dependencies

- `react-native`: 0.73.2
- `@react-navigation/native`: ^6.1.9
- `@react-navigation/stack`: ^6.3.20
- `@react-navigation/bottom-tabs`: ^6.5.11
- `zustand`: ^4.4.7
- `axios`: ^1.6.5
- `react-native-maps`: ^1.10.0
- `react-native-gifted-chat`: ^2.4.0
- `nativewind`: ^2.0.11
- `react-native-vector-icons`: ^10.0.3

## Features Implementation Status

✅ Authentication & Onboarding
- Phone login with OTP verification
- Role selection (Client/Provider)
- Provider onboarding flow

✅ Client Features
- Service browsing
- Provider search with map view
- Provider tracking
- In-app chat
- Service rating
- Booking history

✅ Provider Features
- Dashboard with earnings
- Online/Offline toggle
- Job notifications
- Assessment & invoicing
- Earnings tracking
- Job history

## Contributing

This is a production-ready implementation. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright © 2026 WiraSasa. All rights reserved.

## Support

For issues or questions, please contact support@wirasasa.com 
