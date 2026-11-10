import { homeMetadata, HomeView } from "@/views/home";

// English version. The page itself lives in src/views/home.tsx and is shared by both languages.
export const metadata = homeMetadata("en");

export default function Page() {
  return <HomeView locale="en" />;
}
