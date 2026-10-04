# Cloudflare and Vercel security configuration

## Current deployment topology

Cloudflare is authoritative for `anigosjayaperkasa.com` DNS, while Vercel
serves the application. The observed apex A record resolves directly to
Vercel's `76.76.21.21`, `www` points to Vercel DNS, and production responses
include Vercel headers without Cloudflare proxy headers. This is consistent
with DNS-only records; confirm the cloud icons in Cloudflare DNS before
changing anything.

Keep the website records DNS-only unless the deployment architecture is
deliberately changed. Vercel's current guidance does not recommend putting
Cloudflare's reverse proxy in front of Vercel because it obscures traffic
signals used by Vercel Firewall and Bot Protection, adds latency, and can
complicate caching. Do not enable Cloudflare proxying or cache rules as an
assumed security fix.

## Recommended Cloudflare account settings

1. Keep the apex and `www` records pointed at the exact values shown in the
   Vercel Domains dashboard. Do not alter MX, TXT, or domain-verification
   records.
2. Enable DNSSEC in Cloudflare and complete any registrar-side DS-record step
   Cloudflare shows. Verify the DS record before considering DNSSEC active.
3. Review DNS records and remove only records confirmed to be obsolete. Keep
   email and verification records intact.
4. Do not add a blanket cache-everything rule. The application has dynamic
   APIs, preview endpoints, and personalized responses; cache policy should
   remain owned by the application/Vercel unless a route is reviewed
   individually.
5. Use Vercel Firewall/WAF and its native bot controls for HTTP-layer
   protection while traffic remains DNS-only. If Cloudflare proxying becomes
   a firm requirement, first plan and test a supported reverse-proxy
   architecture and its interaction with Vercel domains, SSL, caching, and
   firewall visibility.

With DNS-only records, Cloudflare SSL/TLS edge settings, WAF rules, and HTTP
rate limits do not inspect or protect website requests; DNSSEC protects DNS
integrity, not the HTTP origin.

## Application response headers

The application sets HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, and `Permissions-Policy`. It also sends a narrow enforced
Content Security Policy containing `object-src 'none'`, `base-uri 'self'`, and
`frame-ancestors 'none'`. This policy hardens plugin loading, base URL
injection, and framing without restricting the app's scripts, Sanity media,
or Firebase requests.

## Verification

Check the Cloudflare DNS proxy status in the dashboard, then inspect the live
site response headers. DNS-only traffic should reach Vercel directly. If
traffic is intentionally proxied in the future, verify `CF-Ray`/Cloudflare
response headers, Vercel origin TLS, application APIs, Sanity preview, media
byte ranges, and cache behavior before enabling security or cache rules.

## References

- [Cloudflare proxy status](https://developers.cloudflare.com/dns/proxy-status/)
- [Cloudflare Full (strict) TLS mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)
- [Vercel guidance on Cloudflare reverse proxies](https://vercel.com/kb/guide/cloudflare-with-vercel)
