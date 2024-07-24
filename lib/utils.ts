import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: number | Date | string) {
  const object = new Date(date);

  return Intl.DateTimeFormat('en-US',{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(object);
}

export function capitalize(text: string) {
  const formatted: string = text.split(' ').reduce((formatted, word) => {
    const capitalized = word[0].toUpperCase() + word.slice(1).toLowerCase();
    return formatted + " " + capitalized;
  }, '');
  
  return formatted;
  
}