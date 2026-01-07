import { colors } from '@/constants/colors';
import React from 'react';
import { Platform, StyleSheet, Switch, View } from 'react-native';

export type ToggleSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
};

export function ToggleSwitch({ value, onValueChange, disabled = false }: ToggleSwitchProps) {
  return (
    <View style={styles.container}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.success }}
        thumbColor={Platform.OS === 'ios' ? colors.white : value ? colors.white : colors.white}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container styles if needed
  },
});

