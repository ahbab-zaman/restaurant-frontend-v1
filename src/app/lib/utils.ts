import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Returns today's date as YYYY-MM-DD string for date input min */
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

/** Format a Date to a readable display string */
export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Generate a mock confirmation code */
export function generateConfirmationCode(): string {
  const prefix = 'EL'
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${suffix}`
}