

export const FormatGMV = (value: number | string | null | undefined) => {
  if (value === null || value === undefined) return "₦0";

  const numberValue = Number(value);

  if (isNaN(numberValue)) return "₦0";

  const formatted = new Intl.NumberFormat("en-NG", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(numberValue);

  return `₦${formatted}`;
};

export const DateFormatter = (date: string | Date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};