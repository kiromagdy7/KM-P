import { homeMetadata, HomeView } from "@/views/home";

// Arabic version. The page itself lives in src/views/home.tsx and is shared by both languages.
export const metadata = homeMetadata("ar");

export default function Page() {
  return <HomeView locale="ar" />;
}
