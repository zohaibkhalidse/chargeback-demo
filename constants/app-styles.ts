import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './typography';

export const appStyles = StyleSheet.create({
  // Headers
  largeTitle: {
    fontSize: 34,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  mediumTitle: {
    fontSize: 22,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  smallTitle: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },

  // Body Text
  largeBody: {
    fontSize: 19,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },
  mediumBody: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  smallBody: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },

  // Secondary Text
  largeSecondary: {
    fontSize: 19,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  secondary: {
    fontSize: 17,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  mediumSecondary: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  smallSecondary: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },

  // Labels
  label: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  mediumLabel: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  smallLabel: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textPrimary,
  },

  // Buttons
  buttonText: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  buttonTextLarge: {
    fontSize: 19,
    fontFamily: fonts.semiBold,
    color: colors.primary,
  },
  buttonTextWhite: {
    fontSize: 17,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  buttonTextDelete: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.delete,
  },

  // Headers (Navigation)
  headerTitle: {
    fontSize: 17,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  headerButton: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.primary,
  },

  // Special
  caption: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  overline: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    textTransform: 'uppercase' as const,
  },
});

