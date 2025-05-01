import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/util';
import { ComponentProps } from 'react';

const buttonVariants = cva(['transition-colors'], {
  variants: {
    variant: {
      default: ['bg-gray-100', 'hover:bg-secondary-hover'],
      ghost: ['hover:bg-gray-300'],
      dark: ['bg-gray-800', 'text-white'],
    },
    size: {
      default: ['rounded', 'p-2'],
      icon: [
        'rounded-full',
        'w-10',
        'h-10',
        'flex',
        'items-center',
        'justify-center',
        'p-2.5',
      ],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = VariantProps<typeof buttonVariants> &
  ComponentProps<'button'>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}
