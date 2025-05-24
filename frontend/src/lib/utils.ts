import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCentsToUsdStr(priceInCents: number) {
  return `$${priceInCents % 100 !== 0 ? (priceInCents / 100).toFixed(2) : priceInCents / 100}`
}

export function formatMinutesToHoursStr(durationInMinutes: number) {

  if (durationInMinutes === 0) return "";

  const minutes = durationInMinutes % 60;
  const hours = Math.floor(durationInMinutes / 60);

  if (hours === 0) {
    return `${minutes}m`;
  }

  return `${hours}.${Math.floor(minutes / 10)}hrs`;


}