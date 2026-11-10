import { SiteImage } from "@/components/site-image";
import { SiteLink as Link } from "@/components/site-link";
import type { Project } from "@/content/projects";
import { fill, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { shotPath } from "@/lib/images";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  /** How wide the card is drawn, for picking the right image variant */
  sizes?: string;
  /** Use h2 on listing pages and h3 inside a section that already has an h2 */
  headingLevel?: "h2" | "h3";
  /** Load the image immediately; set for cards visible when the page opens */
  eager?: boolean;
}

/** A project shown by a real screenshot of it, with one line on what it is. */
export function ProjectCard({
  project,
  locale,
  sizes = "(min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 92vw",
  headingLevel: Heading = "h3",
  eager = false,
}: ProjectCardProps) {
  const t = getDictionary(locale);
  const cover = project.shots.find((shot) => shot.file === project.cover);

  return (
    <Link href={localePath(locale, `/work/${project.slug}`)} className="group flex flex-col">
      <div className="aspect-[16/10] overflow-hidden rounded-lg border border-line bg-wash">
        <SiteImage
          src={shotPath(project.slug, project.cover)}
          alt={cover?.alt ?? fill(t.project.screenshotAlt, { title: project.title })}
          sizes={sizes}
          eager={eager}
          className={`size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03] ${project.coverPosition === "left" ? "object-left-top" : "object-top"}`}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <Heading className="text-xl font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </Heading>
        <span className="shrink-0 text-sm text-muted">{t.project.kind[project.kind]}</span>
      </div>
      <p className="mt-1.5 leading-relaxed text-muted">{project.summary}</p>
      {/* Technology names are always left-to-right, even on the Arabic page. */}
      <p dir="ltr" className="mt-3 font-mono text-[0.8125rem] text-muted rtl:text-right">
        {project.stack.join(", ")}
      </p>
    </Link>
  );
}
