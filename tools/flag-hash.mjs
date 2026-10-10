// Print the hash a `flag` check stores: node tools/flag-hash.mjs "WP{answer}"
import { createHash } from 'node:crypto';
export const flagHash = (s) => createHash('sha256').update('wp-flag:' + String(s).trim().toLowerCase()).digest('hex');
if (process.argv[1] && process.argv[1].endsWith('flag-hash.mjs')) console.log(flagHash(process.argv[2] || ''));
