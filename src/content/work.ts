import type { Locale } from "@/i18n/config";
import { projects, type Project } from "@/content/projects";
import { projectsAr } from "@/content/projects.ar";

// Language-aware access to the projects. English comes straight from
// projects.ts; Arabic lays the wording from projects.ar.ts over it.

function translate(project: Project): Project {
  const ar = projectsAr[project.slug];
  if (!ar) {
    throw new Error(`No Arabic text for project "${project.slug}". Add it to src/content/projects.ar.ts.`);
  }

  const title = ar.title ?? project.title;

  return {
    ...project,
    title,
    tagline: ar.tagline,
    status: ar.status,
    platform: ar.platform,
    duration: ar.duration,
    summary: ar.summary,
    intro: ar.intro,
    // The dense technical paragraph is English-only; the Arabic page goes
    // straight to the technology list.
    technical: null,
    note: ar.note,
    facts: project.facts.map((fact, index) => ({ value: fact.value, label: ar.factLabels[index] ?? fact.label })),
    highlightsHeading: ar.highlightsHeading,
    highlights: project.highlights.map((highlight, index) => ar.highlights[index] ?? highlight),
    specs: project.specs.map((spec, index) => ({ title: ar.specTitles[index] ?? spec.title, items: spec.items })),
    groups: project.groups.map((group) => ({ id: group.id, label: ar.groupLabels[group.id] ?? group.label })),
    shots: project.shots.map((shot) => {
      const shotTitle = ar.shotTitles[shot.file] ?? shot.title;
      return { ...shot, title: shotTitle, alt: `${title}: ${shotTitle}` };
    }),
    seoDescription: ar.summary,
  };
}

const arabicProjects = projects.map(translate);

export function getProjects(locale: Locale): Project[] {
  return locale === "ar" ? arabicProjects : projects;
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

/** Slugs are the same in every language. */
export const projectSlugs = projects.map((project) => project.slug);

/** Shown on the home page, in this order. The first one gets the large slot. */
export const featuredSlugs = ["jewelry-system", "kmz-hub", "wistore", "physiotherapy", "tahwega-cafe"];
