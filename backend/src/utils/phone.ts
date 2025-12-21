/**
 * Validate phone number format
 * Accepts formats like: +2341234567890, 2341234567890, 01234567890
 */
export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Check if it starts with + or country code
  if (cleaned.startsWith("+")) {
    // International format: +2341234567890 (minimum 10 digits after +)
    return /^\+\d{10,15}$/.test(cleaned);
  } else if (cleaned.startsWith("234")) {
    // Nigerian format without +: 2341234567890
    return /^234\d{10}$/.test(cleaned);
  } else if (cleaned.startsWith("0")) {
    // Local format: 01234567890
    return /^0\d{10}$/.test(cleaned);
  }

  // If it's just digits, check length (10-15 digits)
  return /^\d{10,15}$/.test(cleaned);
}

/**
 * Normalize phone number to a standard format
 * Returns: +2341234567890 format
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // If it starts with 0, replace with 234
  if (cleaned.startsWith("0")) {
    return `+${cleaned.replace(/^0/, "234")}`;
  }

  // If it starts with 234, add +
  if (cleaned.startsWith("234")) {
    return `+${cleaned}`;
  }

  // If it's already international format, return as is
  if (cleaned.length >= 10) {
    return `+${cleaned}`;
  }

  // Default: assume it's a local number and add 234
  return `+234${cleaned}`;
}

