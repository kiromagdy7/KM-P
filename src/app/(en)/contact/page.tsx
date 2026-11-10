import { contactMetadata, ContactView } from "@/views/contact";

// English version. The page itself lives in src/views/contact.tsx and is shared by both languages.
export const metadata = contactMetadata("en");

export default function Page() {
  return <ContactView locale="en" />;
}
