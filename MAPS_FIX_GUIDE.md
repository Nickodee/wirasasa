# Maps Not Displaying in Built APK - Fix Guide

## Problem
Maps are not displaying when you build the app for testing (APK/AAB builds).

## Root Causes
1. **Missing or incorrect Google Maps API key configuration for release builds**
2. **API key restrictions on Google Cloud Console**
3. **Missing SHA-1 fingerprint for release/debug builds**

## Solutions

### 1. Get Your App's SHA-1 Fingerprint

For **debug builds**:
```bash
cd android && ./gradlew signingReport
```

For **release builds** (if you're using a keystore):
```bash
keytool -list -v -keystore /path/to/your/keystore.jks -alias your-key-alias
```

For **EAS Build** (Expo):
```bash
eas credentials
```

### 2. Configure Google Maps API Key

Go to [Google Cloud Console](https://console.cloud.google.com/):

1. Navigate to **APIs & Services > Credentials**
2. Find your Android API key (or create a new one)
3. Click on the API key to edit it
4. Under **API restrictions**, ensure **Maps SDK for Android** is enabled
5. Under **Application restrictions**:
   - Select **Android apps**
   - Add your package name: `com.wirasasa.app`
   - Add both **debug** and **release** SHA-1 fingerprints

### 3. Verify app.json Configuration

Your `app.json` already has the correct structure:
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_API_KEY_HERE"
        }
      }
    }
  }
}
```

### 4. Build and Test

```bash
# For development build
eas build --profile development --platform android

# For production build
eas build --profile production --platform android
```

## Additional Notes

- Make sure your Google Maps API key has **no IP restrictions** for mobile apps
- The API key should be restricted by **package name + SHA-1** only
- For Expo Go, maps might not work properly - use a development build instead
- Check your Google Cloud Console billing is enabled

## Current API Key Status

Your current API key in app.json: `AIzaSyBZgAcXn250FowxxidO_35G46vrc5WZdfU`

Make sure this key:
1. Has Maps SDK for Android enabled
2. Is restricted to your package name (`com.wirasasa.app`)
3. Has your app's SHA-1 fingerprint added
4. Has billing enabled on Google Cloud Console
