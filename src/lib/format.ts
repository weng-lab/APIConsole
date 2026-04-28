/**
 * Mask a secret like `ac_test_<base64url>` so the prefix stays readable
 * and only the last `visibleSuffix` characters of the raw value are shown.
 *
 * Example: `maskSecret('ac_test_abcdefghijklmnopqrstuvwxyz1234')`
 *          → `ac_test_••••••••••••••••1234`
 */
export function maskSecret(value: string, visibleSuffix = 4): string {
  if (!value) return '';

  const dots = '\u2022'.repeat(16);
  const suffix = value.slice(-visibleSuffix);

  const lastUnderscore = value.lastIndexOf('_');
  if (lastUnderscore > -1 && lastUnderscore < value.length - visibleSuffix) {
    const prefix = value.slice(0, lastUnderscore + 1);
    return `${prefix}${dots}${suffix}`;
  }

  return `${dots}${suffix}`;
}

/**
 * Format an ISO date string as a short, locale-aware date.
 * Example: "Apr 12, 2026"
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
