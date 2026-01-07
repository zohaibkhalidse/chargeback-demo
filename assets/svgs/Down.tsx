import { colors } from '@/constants/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export type DownProps = {
  size?: number;
  color?: string;
};

export function Down({ size = 7, color = colors.textSecondary }: DownProps) {
  return (
    <Svg width={size} height={size * 2} viewBox="0 0 7 14" fill="none">
      <Path
        d="M3.4425 2.1225L5.82 4.5L6.8775 3.4425L3.4425 0L0 3.4425L1.065 4.5L3.4425 2.1225ZM3.4425 11.3775L1.065 9L0.00750017 10.0575L3.4425 13.5L6.885 10.0575L5.82 9L3.4425 11.3775Z"
        fill={color}
      />
    </Svg>
  );
}

