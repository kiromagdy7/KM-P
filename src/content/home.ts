import type { Locale } from "@/i18n/config";

export interface HomeContent {
  /** The steps of a project, in order */
  process: { title: string; body: string }[];
  credentials: { title: string; issuer: string; year: string }[];
  stack: { area: string; items: string[] }[];
  faqs: { question: string; answer: string }[];
}

// Tool names stay in English in both languages; only the group names are translated.
const stackItems = {
  backend: ["C#", "ASP.NET Core", "Web API", "MVC", "Entity Framework Core", "LINQ", "SignalR", "JWT authentication", "Clean Architecture"],
  frontend: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
  desktop: [".NET MAUI", "Blazor Hybrid", "WPF"],
  data: ["SQL Server", "SQLite", "Stored procedures", "Query optimization"],
  deployment: ["Windows VPS", "IIS", "Docker", "Cloudflare", "Azure", "AWS", "SSL setup"],
  tools: ["Git and GitHub", "Visual Studio", "Postman", "Swagger", "SSMS", "Figma"],
};

const en: HomeContent = {
  process: [
    {
      title: "A first conversation",
      body: "You explain how your business works today and what is slowing it down. A call or a WhatsApp chat is enough to start.",
    },
    {
      title: "A written scope and price",
      body: "I send a short document listing what will be built, how long it will take and what it costs, so nothing is left to guesswork.",
    },
    {
      title: "Building, with regular demos",
      body: "You see the system take shape as it is built and can correct the direction early, while changes are still cheap.",
    },
    {
      title: "Launch and handover",
      body: "I deploy the system, set it up with your data and show your team how to use it. After launch I stay available for fixes and new features.",
    },
  ],
  credentials: [
    { title: "Full Stack .NET Web Developer", issuer: "Digital Egypt Pioneers Initiative (DEPI)", year: "2025" },
    { title: "Top Student, Certificate of Appreciation", issuer: "DEPI, Ministry of Communications and Information Technology", year: "2025" },
    { title: "React Bootcamp, Best Project", issuer: "IEEE Alexandria Student Branch", year: "2026" },
    { title: "AI Advanced: Empower Yourself", issuer: "Microsoft and MCIT, Fast Lane", year: "2026" },
    { title: "Build with AI: Masr Edition", issuer: "Google for Developers and ITI", year: "2026" },
  ],
  stack: [
    { area: "Back end", items: stackItems.backend },
    { area: "Front end", items: stackItems.frontend },
    { area: "Desktop", items: stackItems.desktop },
    { area: "Data", items: stackItems.data },
    { area: "Deployment", items: stackItems.deployment },
    { area: "Tools", items: stackItems.tools },
  ],
  faqs: [
    {
      question: "What do you build?",
      answer:
        "Three things: websites and web applications, Windows desktop software, and POS and ERP systems for shops and businesses. I handle the whole project, from the database to the interface to getting it live.",
    },
    {
      question: "Do you work with clients outside Egypt?",
      answer:
        "Yes. I am based in Alexandria and work remotely with clients in any country, in Arabic or English. We talk over WhatsApp, email or video calls, and you see progress through regular demos.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "It depends on what the system has to do. After a first conversation I send a written scope with a fixed price and timeline, so you know the full cost before any work starts.",
    },
    {
      question: "How long does a project take?",
      answer:
        "A business website usually takes a few weeks. A desktop system such as KMZ Hub took about two months. A full ERP is built in stages, and the first stage is in use long before the last one is finished.",
    },
    {
      question: "Can the system work without internet?",
      answer:
        "Yes. Desktop systems store their data on your own machine and keep working offline. KMZ Hub, my system for PlayStation centers, runs this way.",
    },
    {
      question: "Do your systems support Arabic?",
      answer:
        "Yes. Interfaces, invoices, receipts and reports are available in Arabic with proper right-to-left layout, in English, or in both.",
    },
    {
      question: "What happens after the system is delivered?",
      answer:
        "I deploy it, set it up with your data and show your team how to use it. After that I stay available for fixes, changes and new features as your business grows.",
    },
  ],
};

const ar: HomeContent = {
  process: [
    {
      title: "محادثة أولى",
      body: "تشرح لي كيف يسير عملك اليوم وما الذي يعطّله. مكالمة أو محادثة على واتساب تكفي للبدء.",
    },
    {
      title: "عرض مكتوب بالنطاق والسعر",
      body: "أرسل لك مستنداً قصيراً يوضّح ما سيُبنى، والمدة، والتكلفة، حتى لا يبقى شيء للتخمين.",
    },
    {
      title: "التنفيذ مع عروض دورية",
      body: "ترى النظام يتشكّل أثناء بنائه، وتصحّح الاتجاه مبكراً حين يكون التعديل سهلاً وغير مكلف.",
    },
    {
      title: "التشغيل والتسليم",
      body: "أشغّل النظام، وأجهّزه ببياناتك، وأدرّب فريقك على استخدامه. وبعد التشغيل أبقى متاحاً للإصلاحات والإضافات الجديدة.",
    },
  ],
  credentials: [
    { title: "Full Stack .NET Web Developer", issuer: "مبادرة رواد مصر الرقمية (DEPI)", year: "2025" },
    { title: "الطالب المتميّز، شهادة تقدير", issuer: "DEPI، وزارة الاتصالات وتكنولوجيا المعلومات", year: "2025" },
    { title: "React Bootcamp، أفضل مشروع", issuer: "IEEE، فرع طلاب الإسكندرية", year: "2026" },
    { title: "AI Advanced: Empower Yourself", issuer: "مايكروسوفت ووزارة الاتصالات، Fast Lane", year: "2026" },
    { title: "Build with AI: Masr Edition", issuer: "Google for Developers ومعهد تكنولوجيا المعلومات (ITI)", year: "2026" },
  ],
  stack: [
    { area: "الخادم", items: stackItems.backend },
    { area: "الواجهات", items: stackItems.frontend },
    { area: "الديسكتوب", items: stackItems.desktop },
    { area: "قواعد البيانات", items: stackItems.data },
    { area: "التشغيل", items: stackItems.deployment },
    { area: "الأدوات", items: stackItems.tools },
  ],
  faqs: [
    {
      question: "ماذا تبني بالضبط؟",
      answer:
        "ثلاثة أشياء: المواقع وتطبيقات الويب، وبرامج ويندوز للديسكتوب، وأنظمة نقاط البيع (POS) وأنظمة ERP للمحلات والشركات. أتولى المشروع كله، من قاعدة البيانات إلى الواجهة إلى تشغيله فعلياً.",
    },
    {
      question: "هل تعمل مع عملاء خارج مصر؟",
      answer:
        "نعم. أقيم في الإسكندرية وأعمل عن بُعد مع عملاء من أي دولة، بالعربية أو الإنجليزية. نتواصل عبر واتساب أو البريد الإلكتروني أو مكالمات الفيديو، وتتابع التقدّم من خلال عروض دورية.",
    },
    {
      question: "كم تكلفة المشروع؟",
      answer:
        "تعتمد على ما يجب أن يفعله النظام. بعد المحادثة الأولى أرسل لك عرضاً مكتوباً بسعر ثابت ومدة محددة، فتعرف التكلفة كاملة قبل بدء أي عمل.",
    },
    {
      question: "كم يستغرق المشروع؟",
      answer:
        "موقع الشركة يستغرق عادةً بضعة أسابيع. نظام ديسكتوب مثل KMZ Hub استغرق نحو شهرين. أما نظام ERP الكامل فيُبنى على مراحل، وتبدأ في استخدام المرحلة الأولى قبل اكتمال الأخيرة بوقت طويل.",
    },
    {
      question: "هل يعمل النظام بدون إنترنت؟",
      answer:
        "نعم. أنظمة الديسكتوب تحفظ بياناتها على جهازك وتستمر في العمل دون اتصال. هكذا يعمل KMZ Hub، نظامي لإدارة صالات البلايستيشن.",
    },
    {
      question: "هل تدعم أنظمتك اللغة العربية؟",
      answer:
        "نعم. الواجهات والفواتير والإيصالات والتقارير متاحة بالعربية باتجاه صحيح من اليمين إلى اليسار، أو بالإنجليزية، أو باللغتين معاً.",
    },
    {
      question: "ماذا يحدث بعد تسليم النظام؟",
      answer:
        "أشغّله، وأجهّزه ببياناتك، وأدرّب فريقك عليه. وبعدها أبقى متاحاً للإصلاحات والتعديلات والإضافات كلما كبر عملك.",
    },
  ],
};

const content: Record<Locale, HomeContent> = { en, ar };

export function getHome(locale: Locale): HomeContent {
  return content[locale];
}
