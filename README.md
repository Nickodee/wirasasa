# WiraSasa

A mobile application for connecting clients with skilled service professionals in Kenya.

## Features

### Client App
- Browse service categories (Electrician, Plumber, Mechanic, Gardener)
- View available professionals on a map
- View provider profiles with ratings and pricing
- Real-time chat with service providers
- Track service provider location in real-time
- Request services instantly

### Provider App
- Dashboard with weekly earnings visualization
- Job management (view and complete jobs)
- Online/Offline status toggle
- View job details and client information
- Navigate to job locations

## Tech Stack

- **Expo** - React Native framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Native Maps** - Map integration
- **AsyncStorage** - Local storage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
   - Install Expo Go app on your iOS/Android device
   - Scan the QR code from the terminal
   - Or press `i` for iOS simulator, `a` for Android emulator

## Project Structure

```
wirasasa/
├── App.tsx                 # Main app entry point
├── components/            # Reusable components
├── constants/             # Theme and constants
├── context/               # React Context providers
├── navigation/            # Navigation configuration
├── screens/               # Screen components
│   ├── client/           # Client app screens
│   └── provider/         # Provider app screens
├── types/                 # TypeScript type definitions
└── package.json
```

## Authentication

The app supports dual-role authentication:
- **Client**: Users who need services
- **Provider**: Service professionals

After login, users select their role which determines the app interface they see.

## Development

### Adding New Screens

1. Create screen component in `screens/client/` or `screens/provider/`
2. Add route to appropriate navigation file in `navigation/`
3. Update types in `types/index.ts` if needed

### Styling

The app uses a centralized theme system:
- Colors: `constants/Theme.ts`
- Typography: `constants/Theme.ts`
- Spacing: `constants/Theme.ts`

## License

Private project - All rights reserved

# wirasasa
