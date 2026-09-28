/**
 * Web Crypto SHA-256 implementation
 */
export async function calculateFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function calculateTextHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateMockHash(seed: string = ''): string {
  // Deterministic or pseudo-random 64-char hex
  const chars = '0123456789abcdef';
  let hash = '';
  let val = 0;
  for (let i = 0; i < seed.length; i++) {
    val = (val << 5) - val + seed.charCodeAt(i);
    val |= 0;
  }
  const seedNum = Math.abs(val) + 1234567;
  for (let i = 0; i < 64; i++) {
    const idx = (seedNum * (i + 13) + i * 37) % 16;
    hash += chars[Math.abs(idx)];
  }
  return hash;
}

export function truncateHash(hash: string, lead: number = 8, trail: number = 8): string {
  if (!hash || hash.length <= lead + trail) return hash || '';
  return `${hash.slice(0, lead)}...${hash.slice(-trail)}`;
}

export function formatTimestamp(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return isoString;
  }
}
