import { contactMetadata, ContactView } from "@/views/contact";

// Arabic version. The page itself lives in src/views/contact.tsx and is shared by both languages.
export const metadata = contactMetadata("ar");

export default function Page() {
  return <ContactView locale="ar" />;
}
