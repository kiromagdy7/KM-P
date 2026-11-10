import { servicesMetadata, ServicesView } from "@/views/services";

// Arabic version. The page itself lives in src/views/services.tsx and is shared by both languages.
export const metadata = servicesMetadata("ar");

export default function Page() {
  return <ServicesView locale="ar" />;
}
