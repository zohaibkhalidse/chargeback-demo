import { colors } from '@/constants/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export type BackProps = {
  size?: number;
  color?: string;
};

export function Back({ size = 16, color = colors.textPrimary }: BackProps) {
  return (
    <Svg width={size} height={size * 0.875} viewBox="0 0 16 14" fill="none">
      <Path
        d="M0.915039 6.91501H14.915M0.915039 6.91501L6.91504 12.915M0.915039 6.91501L6.91504 0.915009"
        stroke={color}
        strokeWidth="1.83"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

