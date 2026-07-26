export function formatDate(input?: string, locale: string = "en-US"): string {
  if (!input) return "";
  if (input.toLowerCase() === "present") {
    return locale === "ja-JP" ? "現在" : "Present";
  }

  // Accept "YYYY-MM" or "YYYY-MM-DD"
  const parts = input.split("-");
  if (parts.length < 2) return input;

  const [y, m] = parts;
  const date = new Date(Number(y), Number(m) - 1);
  
  if (isNaN(date.getTime())) return input;

  return date.toLocaleString(locale, { month: "short", year: "numeric" });
}
