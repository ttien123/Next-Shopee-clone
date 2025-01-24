import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleSplitAccessToken = (accessToken: string) => {
  return accessToken.split(" ")[1]
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency);
}

// chuyển đổi số từ 10000 => 10K

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1,
  })
      .format(value)
      .replace('.', ',')
      .toLocaleLowerCase();
}
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%';

// đoạn dưới để custom URL
// hàm removeSpecialCharacter để loại bỏ ký tự đặc biệt khỏi chuỗi
const removeSpecialCharacter = (str: string) =>
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  // /\s/g là dấu cách theo regex => replace(/\s/g, '-') thay dấu cách thành - trong chuỗi
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-');

  return arr[arr.length - 1];
};