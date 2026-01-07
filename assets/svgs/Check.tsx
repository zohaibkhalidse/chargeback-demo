import React from 'react';
import Svg, { Path } from 'react-native-svg';

export type CheckProps = {
  size?: number;
  color?: string;
};

export function Check({ size = 17, color = '#002FFF' }: CheckProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none">
      <Path
        d="M8.33333 0C3.73333 0 0 3.73333 0 8.33333C0 12.9333 3.73333 16.6667 8.33333 16.6667C12.9333 16.6667 16.6667 12.9333 16.6667 8.33333C16.6667 3.73333 12.9333 0 8.33333 0ZM6.66667 12.5L2.5 8.33333L3.675 7.15833L6.66667 10.1417L12.9917 3.81667L14.1667 5L6.66667 12.5Z"
        fill={color}
      />
    </Svg>
  );
}

