/**
 * FG Group CRM tracking for this site: cookie banner, visitor tracker, and the link that makes an inquiry and the
 * visitor's browsing one lead. Site key 'gls-partner-with-gomzi' is registered in fg-api src/config/website-sources.js, which
 * sends this site's leads to the GN section of the CRM. How it works: ./fg-crm-tracking.js
 */
import { initCrmTracking } from './fg-crm-tracking';

// This site has no API config of its own: production domains use the live API, everything else the dev API.
const host = window.location.hostname;
const isDev = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('test');
const apiBase = isDev ? 'https://dev-api.fggroup.in' : 'https://api.fggroup.in';

initCrmTracking({
  apiBase: apiBase,
  siteKey: 'gls-partner-with-gomzi',
  brand: 'Gomzi Lifesciences',
  accent: '#86c33a',
  accentText: '#0f172a',
  profileKeys: [],
});
