import { cva } from 'class-variance-authority';

const buttonStyles = cva(['hover:bg-secondary-hover']);

export function Button() {
  return <button />;
}
