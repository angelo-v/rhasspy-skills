export function announceWorldTime(
  locationName: string,
  local: DateTime,
  other: DateTime
) {
  const hours = other.hour;
  const minutes = other.minute;
  return `In ${locationName} ist es jetzt ${hours} Uhr ${minutes}!`;
}
