import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import userImage from '../../public/user.svg'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleSplitAccessToken = (accessToken: string) => {
  return accessToken.split(" ")[1]
}

export const getAvatarUrl = (avatarName?: string) => (avatarName ? `https://api-ecom.duthanhduoc.com/images/${avatarName}` : '');
