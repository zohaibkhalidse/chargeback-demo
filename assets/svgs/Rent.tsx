import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export type RentProps = {
  size?: number;
  color?: string;
};

export function Rent({ size = 30, color = '#1C1E22' }: RentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Rect width="30" height="30" rx="15" fill="#F4F4F6" />
      <Path
        d="M15 10.1583L19.1667 13.9083V20.4167H17.5V15.4167H12.5V20.4167H10.8333V13.9083L15 10.1583ZM15 7.91666L6.66667 15.4167H9.16667V22.0833H14.1667V17.0833H15.8333V22.0833H20.8333V15.4167H23.3333L15 7.91666Z"
        fill={color}
      />
    </Svg>
  );
}

