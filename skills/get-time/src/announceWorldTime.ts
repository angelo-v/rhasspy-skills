export function announceWorldTime(
  locationName: string,
  local: DateTime,
  other: DateTime
) {
  const hours = other.hour;
  const minutes = other.minute;
  if (
    local.day < other.day ||
    local.month < other.month ||
    local.year < other.year
  ) {
    return `In ${locationName} ist es bereits ${hours} Uhr ${minutes} am nächsten Tag!`;
  } else {
    return `In ${locationName} ist es jetzt ${hours} Uhr ${minutes}!`;
  }
}
