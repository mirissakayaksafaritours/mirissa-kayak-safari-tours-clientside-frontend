'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-sm font-medium text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ label, htmlFor, required, error, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

interface FormGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function FormGrid({ children, columns = 2, className }: FormGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
}

interface FormActionsProps {
  children: ReactNode
  className?: string
}

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div className={cn('flex items-center justify-end gap-3 pt-4', className)}>
      {children}
    </div>
  )
}
