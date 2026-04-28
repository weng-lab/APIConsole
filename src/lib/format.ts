export function maskSecret(value: string, visibleSuffix = 4): string {
  if (!value) return "";

  const dots = "\u2022".repeat(16);
  const suffix = value.slice(-visibleSuffix);

  const lastUnderscore = value.lastIndexOf("_");
  if (lastUnderscore > -1 && lastUnderscore < value.length - visibleSuffix) {
    const prefix = value.slice(0, lastUnderscore + 1);
    return `${prefix}${dots}${suffix}`;
  }

  return `${dots}${suffix}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
