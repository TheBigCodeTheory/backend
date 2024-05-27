import * as crypto from 'crypto';
export function getSha256OfString(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex');
}
