import { serviceSlugs } from "@/content/services";
import { serviceMetadata, ServiceView } from "@/views/services";

// English version. The page itself lives in src/views/services.tsx and is shared by both languages.
const locale = "en";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only the slugs listed in src/content exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return serviceMetadata(locale, slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceView locale={locale} slug={slug} />;
}
