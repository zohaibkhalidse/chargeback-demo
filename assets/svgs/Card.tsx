import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export type CardProps = {
  size?: number;
  color?: string;
};

export function Card({ size = 30, color = '#1C1E22' }: CardProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Rect width="30" height="30" rx="15" fill="#F4F4F6" />
      <Path
        d="M21.6667 8.33333H8.33333C7.40833 8.33333 6.675 9.07499 6.675 9.99999L6.66667 20C6.66667 20.925 7.40833 21.6667 8.33333 21.6667H21.6667C22.5917 21.6667 23.3333 20.925 23.3333 20V9.99999C23.3333 9.07499 22.5917 8.33333 21.6667 8.33333ZM21.6667 20H8.33333V15H21.6667V20ZM21.6667 11.6667H8.33333V9.99999H21.6667V11.6667Z"
        fill={color}
      />
    </Svg>
  );
}

