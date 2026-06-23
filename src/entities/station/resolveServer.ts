import { FALLBACK_SERVERS } from './constants';

let cachedBaseUrl: string | null = null;

export const resolveBaseUrl = async (): Promise<string> => {
  if (cachedBaseUrl) return cachedBaseUrl;

  try {
    const hosts = (await fetch(
      'https://all.api.radio-browser.info/json/servers',
    ).then((r) => r.json())) as Array<{ name: string }>;

    if (hosts.length > 0) {
      cachedBaseUrl = `https://${hosts[0].name}/json`;
      return cachedBaseUrl;
    }
  } catch {
    // fallthrough to static fallbacks
  }

  for (const server of FALLBACK_SERVERS) {
    try {
      const res = await fetch(`${server}/json/stats`, {
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        cachedBaseUrl = `${server}/json`;
        return cachedBaseUrl;
      }
    } catch {
      continue;
    }
  }

  cachedBaseUrl = `${FALLBACK_SERVERS[0]}/json`;
  return cachedBaseUrl;
};
