"use client";

import { usePathname } from "next/navigation";
import { SiteLink as Link } from "@/components/site-link";
import { cn } from "@/components/ui";

export interface NavItem {
  href: string;
  label: string;
}

function isCurrent(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation. Marks the section the visitor is in. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const current = isCurrent(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "rounded-[5px] px-3 py-2 text-[0.9375rem] transition-colors duration-200",
                current ? "font-medium text-ink" : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
