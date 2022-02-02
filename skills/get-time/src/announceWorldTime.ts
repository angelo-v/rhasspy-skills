export function announceWorldTime(
  locationName: string,
  local: DateTime,
  other: DateTime
) {
  const hours = other.hour;
  const minutes = other.minute;
  const otherIsOnNextDay =
    local.day + 1 == other.day ||
    local.month + 1 == other.month ||
    local.year + 1 == other.year;
  const otherIsOnPreviousDay =
    local.day - 1 == other.day ||
    local.month - 1 == other.month ||
    local.year - 1 == other.year;
  if (otherIsOnNextDay) {
    return `In ${locationName} ist es bereits ${hours} Uhr ${minutes} am nächsten Tag!`;
  } else if (otherIsOnPreviousDay) {
    return `In ${locationName} ist es noch ${hours} Uhr ${minutes} am vorherigen Tag!`;
  } else {
    return `In ${locationName} ist es jetzt ${hours} Uhr ${minutes}!`;
  }
}
