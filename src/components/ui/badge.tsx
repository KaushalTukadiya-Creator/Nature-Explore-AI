import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'forest' | 'sage' | 'amber' | 'blue' | 'purple' | 'outline';
}

export function Badge({ className, variant = 'forest', children, ...props }: BadgeProps) {
  const variants = {
    forest: 'bg-forest-100 text-forest-800 border-forest-200',
    sage: 'bg-sage-100 text-sage-800 border-sage-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    blue: 'bg-sky-100 text-sky-800 border-sky-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    outline: 'border border-sage-300 text-sage-700 bg-white/60',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
