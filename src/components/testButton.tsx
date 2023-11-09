'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
};
export default function TestButton({
  color = 'primary',
  size = 'medium',
  variant = 'contained',
  ...props
}: ButtonProps) {
  const router = useRouter();

  const sizeStyles = {
    small: 'text-xs px-2.5 py-1.5',
    medium: 'text-sm leading-4 px-3 py-2',
    large: 'text-sm px-4 py-2',
  };

  const variantStyles = {
    contained: 'border border-transparent',
    outlined: 'bg-transparent border',
    text: 'bg-transparent border-transparent',
  };

  const colorStyles = {
    text: {
      primary: 'text-black bg-transparent',
      secondary: 'text-black bg-transparent',
    },
    contained: {
      primary: 'text-white bg-blue-500 hover:bg-amber-900 rounded-lg',
      secondary: 'text-white bg-amber-500 hover:bg-blue-500  rounded-lg',
    },
    outlined: {
      primary:
        'text-primary-default border-primary-default hover:bg-primary-50 active:bg-primary-100',
      secondary:
        'text-secondary-500 border-secondary-500 hover:bg-secondary-50 active:bg-secondary-100',
    },
  };

  return (
    <>
      <button
        onClick={() => router.push('/post')}
        /*
        tailwind에서는 먼저 선언 된 것이 적용된다. (ex. bg 색상을 두 번 작성하면 첫번 째 색상 적용)
      */
        //className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouned bg-amber-300'
        /*
        twMerge를 사용하면 마지막에 선언한 것이 적용된다. (ex. bg 색상을 두 번 작성하면 두번 째 색상 적용)
      */
        //className={twMerge(
        //  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouned bg-amber-300'
        //)}
        //className={twMerge(`bg-amber-900 ${pending && 'bg-blue-500'}`)}

        /* 객체 형태로 사용하고 싶을 경우 clsx 사용  */
        className={cn(
          /* size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-md px-3',
          lg: 'h-11 rounded-md px-8',
          icon: 'h-10 w-10',
        }, */

          variantStyles[variant],
          sizeStyles[size],
          colorStyles[variant][color]
        )}
        {...props}
      >
        Click Me
      </button>
    </>
  );
}
