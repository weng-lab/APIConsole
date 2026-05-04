export function maskSecret(value: string, visibleSuffix = 4): string {
  if (!value) return "";

  const suffix = value.slice(-visibleSuffix);

  const lastUnderscore = value.lastIndexOf("_");
  if (lastUnderscore > -1 && lastUnderscore < value.length - visibleSuffix) {
    const prefix = value.slice(0, lastUnderscore + 1);
    const dots = "\u2022".repeat(value.length - prefix.length - suffix.length);

    return `${prefix}${dots}${suffix}`;
  }

  const dots = "\u2022".repeat(value.length - suffix.length);

  return `${dots}${suffix}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
