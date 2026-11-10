import { servicesMetadata, ServicesView } from "@/views/services";

// English version. The page itself lives in src/views/services.tsx and is shared by both languages.
export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesView locale="en" />;
}
