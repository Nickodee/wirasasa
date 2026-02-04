module.exports = function withGoogleMapsApiKey(config) {
  // Try to use expo's config plugins if available
  let withAndroidManifest;
  try {
    withAndroidManifest = require('@expo/config-plugins').withAndroidManifest;
  } catch (e) {
    try {
      withAndroidManifest = require('expo/config-plugins').withAndroidManifest;
    } catch (e2) {
      // If config plugins aren't available, return config as-is
      // The API key in android.config.googleMaps.apiKey should still work
      return config;
    }
  }

  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const { manifest } = androidManifest;

    if (!manifest.application) {
      manifest.application = [{}];
    }

    const application = manifest.application[0];
    if (!application['meta-data']) {
      application['meta-data'] = [];
    }

    // Add or update Google Maps API key
    const apiKey = config.android?.config?.googleMaps?.apiKey;
    if (apiKey) {
      const existingMetaData = application['meta-data'].find(
        (meta) => meta.$ && meta.$['android:name'] === 'com.google.android.geo.API_KEY'
      );

      if (existingMetaData) {
        existingMetaData.$['android:value'] = apiKey;
      } else {
        application['meta-data'].push({
          $: {
            'android:name': 'com.google.android.geo.API_KEY',
            'android:value': apiKey,
          },
        });
      }
    }

    return config;
  });
};
