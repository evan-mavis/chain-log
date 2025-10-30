export function formatDateForDB(date: Date): string {
  // use local timezone - this runs in the browser, so it uses user's actual timezone
  // ensures logs are created for the calendar day the user sees
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateFromDB(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00`);
}
