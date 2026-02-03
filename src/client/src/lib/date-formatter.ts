import { format as dateFnsFormat } from "date-fns";

/**
 * Converts a UTC date string/Date object to local browser time and formats it.
 * @param date - The date string or Date object from the server (UTC)
 * @param formatStr - The desired date-fns format (default: 'yyyy-MM-dd hh:mm a')
 * @returns Formatted local date string
 */
export const formatToLocalTime = (
  date: string | Date | null | undefined,
  formatStr: string = "yyyy-MM-dd hh:mm a",
): string => {
  if (!date) return "N/A";

  try {
    // Parsing a string like "2026-02-02 22:49" assumes UTC if not specified
    // or handles standard ISO strings automatically.
    const utcDate = new Date(date);

    // date-fns format() uses the local system time zone by default
    return dateFnsFormat(utcDate, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
