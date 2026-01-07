import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

export type SubscriptionProps = {
  size?: number;
  color?: string;
};

export function Subscription({ size = 30, color = '#1C1E22' }: SubscriptionProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Rect width="30" height="30" rx="15" fill="#F4F4F6" />
      <Path
        d="M15 10V12.5L18.3333 9.16667L15 5.83334V8.33334C11.3167 8.33334 8.33333 11.3167 8.33333 15C8.33333 16.3083 8.71667 17.525 9.36667 18.55L10.5833 17.3333C10.2083 16.6417 10 15.8417 10 15C10 12.2417 12.2417 10 15 10ZM20.6333 11.45L19.4167 12.6667C19.7833 13.3667 20 14.1583 20 15C20 17.7583 17.7583 20 15 20V17.5L11.6667 20.8333L15 24.1667V21.6667C18.6833 21.6667 21.6667 18.6833 21.6667 15C21.6667 13.6917 21.2833 12.475 20.6333 11.45Z"
        fill={color}
      />
    </Svg>
  );
}

