import { JSX } from "solid-js/jsx-runtime";

export enum CustomButtonVariants{
  TRANSPARENT = 'transparent',
  COLORED = 'colored'
};

export interface CustomButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: CustomButtonVariants,
};