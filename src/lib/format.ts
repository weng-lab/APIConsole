export function maskSecret(value: string, visibleSuffix = 4): string {
  if (!value) return "";

  const suffix = value.slice(-visibleSuffix);

  const prefixEnd = value.indexOf("_", value.indexOf("_") + 1) + 1;
  if (prefixEnd > 0 && prefixEnd < value.length - visibleSuffix) {
    const prefix = value.slice(0, prefixEnd);
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
