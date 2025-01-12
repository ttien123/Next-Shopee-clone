import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleSplitAccessToken = (accessToken: string) => {
  return accessToken.split(" ")[1]
}