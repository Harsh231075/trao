export function validateUrl(urlString) {
  try {
    const url = new URL(urlString);

    // Only allow http and https
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { valid: false, reason: 'Only HTTP and HTTPS URLs are allowed' };
    }

    const hostname = url.hostname.toLowerCase();

    // Block loopback
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '0.0.0.0') {
      return { valid: false, reason: 'Loopback addresses are not allowed' };
    }

    // Block private IP ranges
    const parts = hostname.split('.');
    if (parts.length === 4 && parts.every(p => /^\d+$/.test(p))) {
      const first = parseInt(parts[0]);
      const second = parseInt(parts[1]);
      if (first === 10) return { valid: false, reason: 'Private IP range (10.x.x.x)' };
      if (first === 172 && second >= 16 && second <= 31) return { valid: false, reason: 'Private IP range (172.16-31.x.x)' };
      if (first === 192 && second === 168) return { valid: false, reason: 'Private IP range (192.168.x.x)' };
      if (first === 169 && second === 254) return { valid: false, reason: 'Link-local address' };
      if (first === 0) return { valid: false, reason: 'Invalid IP address' };
    }

    return { valid: true, url };
  } catch {
    return { valid: false, reason: 'Invalid URL format' };
  }
}
