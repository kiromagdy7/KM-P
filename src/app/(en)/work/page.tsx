import { workMetadata, WorkView } from "@/views/work";

// English version. The page itself lives in src/views/work.tsx and is shared by both languages.
export const metadata = workMetadata("en");

export default function Page() {
  return <WorkView locale="en" />;
}
