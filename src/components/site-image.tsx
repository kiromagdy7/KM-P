import { resolveImage } from "@/lib/images";

interface SiteImageProps {
  /** Path under /public, e.g. /images/work/kmz-hub/home.webp */
  src: string;
  alt: string;
  /** Tells the browser how wide the image is drawn, so it can pick a variant */
  sizes: string;
  /** Set for the one image that is visible as soon as the page opens. It is fetched first and preloaded. */
  priority?: boolean;
  /**
   * Loads the image right away without preloading it. Used for the large image
   * near the top of project pages: a preload there would also fire whenever a
   * link to that page is prefetched, downloading images for pages nobody opened.
   */
  eager?: boolean;
  className?: string;
}

/**
 * <img> with width, height and srcset filled in from the image manifest.
 * Reserving the size up front means the page never jumps while images load.
 */
export function SiteImage({ src, alt, sizes, priority = false, eager = false, className }: SiteImageProps) {
  const image = resolveImage(src);
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={priority || eager ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
