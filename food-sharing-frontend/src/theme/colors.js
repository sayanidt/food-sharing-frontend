// Core brand colors
export const colors = {
  primary: '#4CAF50',    // Vibrant Fresh Green - Main brand color
  secondary: '#00BCD4',  // Teal/Aqua Blue - Technology emphasis
  warning: '#FF9800',    // Action Orange - Urgent actions
  textPrimary: '#212121',// Dark Charcoal - Main text
  background: '#FFFFFF', // Pure White - Backgrounds
  
  // Additional shades
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  secondaryLight: '#4DD0E1',
  secondaryDark: '#0097A7',
  warningLight: '#FFB74D',
  warningDark: '#F57C00',
  textSecondary: '#757575',
  divider: '#E0E0E0',
};

// Ant Design theme token overrides
export const themeTokens = {
  colorPrimary: colors.primary,
  colorPrimaryBg: colors.primaryLight,
  colorPrimaryBgHover: colors.primaryDark,
  colorLink: colors.secondary,
  colorLinkHover: colors.secondaryDark,
  colorText: colors.textPrimary,
  colorTextSecondary: colors.textSecondary,
  colorBgContainer: colors.background,
  colorWarning: colors.warning,
  colorWarningBorder: colors.warningLight,
  colorWarningHover: colors.warningDark,
};