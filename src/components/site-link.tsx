import Link from "next/link";
import type { ComponentProps } from "react";

type SiteLinkProps = Omit<ComponentProps<typeof Link>, "href" | "prefetch"> & { href: string };

/**
 * Pages that open with a large image (home, the work list, each project) ask
 * the browser to preload it. Next.js would pass that request along every time
 * it prefetches a link to one of them, downloading images for pages the
 * visitor may never open. Those links load on click instead; they are static
 * files on a CDN, so the difference is not noticeable.
 */
function opensWithLargeImage(href: string) {
  // Ignore the Arabic prefix: "/ar/work" behaves like "/work".
  const path = href.replace(/^\/ar(?=\/|#|$)/, "") || "/";
  return path === "/" || path.startsWith("#") || path.startsWith("/#") || path === "/work" || path.startsWith("/work/");
}

/** Internal link. Use this instead of next/link so prefetching stays cheap. */
export function SiteLink({ href, ...props }: SiteLinkProps) {
  return <Link href={href} prefetch={opensWithLargeImage(href) ? false : undefined} {...props} />;
}
