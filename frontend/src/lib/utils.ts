import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCentsToUsdStr(priceInCents: number) {
  return `$${priceInCents % 100 !== 0 ? (priceInCents / 100).toFixed(2) : priceInCents / 100}`
}