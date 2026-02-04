#!/bin/bash

# List of screen files that need back handler
screens=(
  "screens/HelpSupportScreen.tsx"
  "screens/client/ChatScreen.tsx"
  "screens/client/JobHistoryScreen.tsx"
  "screens/client/NotificationsScreen.tsx"
  "screens/client/UpcomingJobsScreen.tsx"
  "screens/client/TrackingScreen.tsx"
  "screens/client/ServiceSelectionScreen.tsx"
  "screens/client/ServiceRequestScreen.tsx"
  "screens/client/ReviewScreen.tsx"
  "screens/client/ProviderProfileScreen.tsx"
  "screens/client/PaymentMethodsScreen.tsx"
  "screens/provider/JobDetailsScreen.tsx"
  "screens/provider/DashboardScreen.tsx"
  "screens/provider/AvailableJobsScreen.tsx"
  "screens/provider/AvailabilityScreen.tsx"
  "screens/provider/ServiceManagementScreen.tsx"
  "screens/provider/ProfileScreen.tsx"
  "screens/provider/PaymentMethodsScreen.tsx"
  "screens/provider/NotificationsScreen.tsx"
  "screens/provider/JobInProgressScreen.tsx"
  "screens/provider/JobHistoryScreen.tsx"
)

echo "Adding back handler to screens..."
echo "This script will display instructions for each screen."
echo ""

for screen in "${screens[@]}"; do
  file="/home/nick/coding/wirasasa/$screen"
  if [ -f "$file" ]; then
    # Check if it already has useFocusEffect
    if grep -q "useFocusEffect" "$file"; then
      echo "✓ $screen already has back handler"
    else
      echo "→ $screen needs back handler"
    fi
  else
    echo "✗ $screen not found"
  fi
done

echo ""
echo "Process complete!"
