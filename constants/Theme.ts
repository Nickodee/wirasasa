// WiraSasa Brand Colors - Green Primary (as per PRD)
export const Colors = {
  // Primary brand colors - GREEN for trust and growth
  primary: '#10B981',        // Emerald green (WiraSasa brand)
  primaryDark: '#059669',    // Deeper emerald
  primaryLight: '#34D399',   // Lighter emerald
  primarySoft: '#D1FAE5',    // Very light green for backgrounds
  
  // Secondary colors
  secondary: '#0EA5E9',      // Sky blue accent
  secondaryLight: '#38BDF8', // Lighter blue
  secondarySoft: '#E0F2FE',  // Very light blue
  
  // Accent colors for variety
  accent: '#F59E0B',         // Amber for highlights
  accentLight: '#FCD34D',    // Lighter amber
  accentSoft: '#FEF3C7',     // Pale amber
  
  // Neutral tones - warm grays for better readability
  background: '#FAFAFA',     // Off-white, less harsh
  surface: '#FFFFFF',        // Pure white for cards
  surfaceHover: '#F8FAFC',   // Subtle hover state
  
  // Text colors with better contrast
  text: '#1E293B',           // Dark slate - easier on eyes
  textSecondary: '#64748B',  // Mid slate gray
  textTertiary: '#94A3B8',   // Light slate gray
  textLight: '#CBD5E1',      // Very light gray
  
  // Border and dividers
  border: '#E2E8F0',         // Subtle borders
  borderLight: '#F1F5F9',    // Even lighter
  borderDark: '#CBD5E1',     // Stronger borders
  
  // Semantic colors
  success: '#10B981',        // Emerald green
  successLight: '#D1FAE5',   // Light green
  error: '#EF4444',          // Red
  errorLight: '#FEE2E2',     // Light red
  warning: '#F59E0B',        // Amber
  warningLight: '#FEF3C7',   // Light amber
  info: '#3B82F6',           // Blue
  infoLight: '#DBEAFE',      // Light blue
  
  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
  shadow: 'rgba(0, 0, 0, 0.08)',
  
  // Service category colors - Bold and distinct
  electric: '#F59E0B',       // Amber - electricity/energy
  plumbing: '#0EA5E9',       // Sky blue - water
  mechanical: '#EF4444',     // Red - automotive
  garden: '#10B981',         // Emerald green - nature
  carpentry: '#92400E',      // Brown - wood
  painting: '#8B5CF6',       // Purple - creativity
  cleaning: '#06B6D4',       // Cyan - freshness
  welding: '#DC2626',        // Dark red - fire/heat
  
  // Provider status colors
  online: '#10B981',         // Green - available
  offline: '#94A3B8',        // Gray - unavailable
  busy: '#F59E0B',           // Amber - in a job
};

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const Typography = {
  // Display styles - for hero sections
  display: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  // Headings with better hierarchy
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.1,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  // Body text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 26,
  },
  bodySmall: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  // Supporting text
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  tiny: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 14,
  },
  // Button text
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
};

// Shadows for depth
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
};

// Animation durations
export const Animation = {
  fast: 150,
  normal: 250,
  slow: 350,
};

