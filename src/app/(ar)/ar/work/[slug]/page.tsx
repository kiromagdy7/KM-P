import { projectSlugs } from "@/content/work";
import { projectMetadata, ProjectView } from "@/views/project";

// Arabic version. The page itself lives in src/views/project.tsx and is shared by both languages.
const locale = "ar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only the slugs listed in src/content exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return projectMetadata(locale, slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProjectView locale={locale} slug={slug} />;
}
