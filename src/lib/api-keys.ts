import { randomBytes } from 'crypto';

export function generateApiKey() {
  return `ac_test_${randomBytes(24).toString('base64url')}`;
}
