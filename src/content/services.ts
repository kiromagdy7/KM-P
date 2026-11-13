import type { Locale } from "@/i18n/config";

export interface Service {
  slug: string;
  /** Short name used in navigation and cards */
  name: string;
  /** Page heading */
  title: string;
  /** One line for cards */
  summary: string;
  /** Who typically asks for this */
  audience: string;
  intro: string;
  includes: { title: string; body: string }[];
  /** Slugs of projects that show this kind of work */
  projects: string[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  /** Message pre-filled when the visitor opens WhatsApp from this page */
  whatsappMessage: string;
}

const en: Service[] = [
  {
    slug: "business-systems",
    name: "POS and ERP systems",
    title: "POS and ERP systems for shops and growing businesses",
    summary: "Sales, stock, accounts and staff permissions in one system built around how your business already works.",
    audience: "Retail shops, workshops, cafés, gaming centers and businesses with more than one branch.",
    intro:
      "Off-the-shelf software makes you work its way. I build the system around your business instead: your pricing rules, your invoice layout, your branches and the way your staff hand over a shift. You get one place for sales, stock and money, with a clear record of who did what.",
    includes: [
      {
        title: "Sales and invoicing",
        body: "A fast sales screen with barcode support, returns and refunds, discounts and coupons, and invoices or thermal receipts printed in Arabic or English.",
      },
      {
        title: "Stock across branches",
        body: "Stock tracked per branch and per storage location, transfers between them, quick stock counts by barcode, and a full history of every movement.",
      },
      {
        title: "Accounts and cash",
        body: "Supplier and customer balances, safes and cash drawers, expenses, and shift closing with a cash count so shortages are caught the same day.",
      },
      {
        title: "Users, permissions and audit log",
        body: "Each employee sees only what their role allows. Sensitive changes are logged with who made them and when, and can be protected with two-factor login.",
      },
      {
        title: "Reports you can act on",
        body: "Profit, sales, stock and supplier reports on screen, with PDF and Excel export for your accountant.",
      },
      {
        title: "Setup and handover",
        body: "I install the system on your server or machines, load your opening data, and walk your staff through daily use.",
      },
    ],
    projects: ["jewelry-system", "kmz-hub"],
    faqs: [
      {
        question: "Can the system follow pricing rules that are specific to my trade?",
        answer:
          "Yes. The jewelry ERP I built prices each piece from its weight, the current metal rate and a workmanship fee, using formulas the owner can edit without a developer. The same approach works for any trade with its own pricing rules.",
      },
      {
        question: "Will it work if the internet goes down?",
        answer:
          "It can. KMZ Hub, my system for PlayStation centers, stores everything on the local machine and runs fully offline. For multi-branch businesses that need shared live data, a web-based system is usually the better fit. I recommend one or the other after seeing how you work.",
      },
      {
        question: "Does it print Arabic invoices and receipts?",
        answer:
          "Yes. Both systems print in Arabic with correct right-to-left layout: A4 and A5 invoices, 80mm thermal receipts and barcode labels.",
      },
      {
        question: "Can you move my existing data into the new system?",
        answer:
          "In most cases, yes. Products, customers, suppliers and opening balances can be imported from Excel or from your current software's export.",
      },
    ],
    seoTitle: "POS and ERP system developer in Egypt",
    seoDescription:
      "Custom POS and ERP systems for shops, workshops and multi-branch businesses: sales, stock, accounts, permissions and Arabic invoices. Built by Kirollos Magdy in Alexandria, Egypt.",
    whatsappMessage: "Hi Kirollos, I need a POS/ERP system for my business.",
  },
  {
    slug: "websites",
    name: "Websites and web apps",
    title: "Websites and web applications",
    summary:
      "Business websites that are easy to find and easy to act on, and web applications with accounts, bookings and online payment.",
    audience: "Clinics, cafés and restaurants, shops, service businesses and startups.",
    intro:
      "A website has one job: turn a visitor into a booking, an order or a message. I build fast, clear sites in Arabic, English or both, and full web applications when you need customer accounts, bookings, payments or a dashboard behind the scenes.",
    includes: [
      {
        title: "Business websites",
        body: "Clear pages for what you offer, where you are and how to reach you, with WhatsApp, phone and map links one tap away on mobile.",
      },
      {
        title: "Web applications",
        body: "Customer accounts, bookings, orders and notifications, with an admin area where your team manages everything.",
      },
      {
        title: "Online payment",
        body: "Card payments through Stripe or the payment provider that works in your country, with secure checkout and payment records.",
      },
      {
        title: "Arabic and English",
        body: "Proper right-to-left layout and Arabic typography, not a mirrored English page.",
      },
      {
        title: "Built to be found",
        body: "Fast loading, clean page structure, and the metadata search engines and AI assistants read. This site is built the same way.",
      },
      {
        title: "Domain, hosting and launch",
        body: "I set up the domain, hosting and SSL, and hand over a site that is live and yours.",
      },
    ],
    projects: ["physiotherapy", "tahwega-cafe", "wistore"],
    faqs: [
      {
        question: "Can I update the content myself?",
        answer:
          "Yes, when the project calls for it. For content that changes often, such as a menu, prices or articles, I add a simple admin area. For pages that rarely change, I keep the site static because it is faster and cheaper to host, and I make the edits for you.",
      },
      {
        question: "Do you design the site as well as build it?",
        answer:
          "Yes. I design and build it, and you review the design before development starts. If you already have a designer or a brand guide, I work from that.",
      },
      {
        question: "Which technologies do you use?",
        answer:
          "Next.js and React for websites and front ends, and ASP.NET Core with SQL Server when the project needs a back end, accounts or payments.",
      },
    ],
    seoTitle: "Website and web application developer in Egypt",
    seoDescription:
      "Business websites and web applications with bookings, accounts and online payment, in Arabic and English. Designed and built by Kirollos Magdy with Next.js and ASP.NET Core.",
    whatsappMessage: "Hi Kirollos, I need a website for my business.",
  },
  {
    slug: "desktop-software",
    name: "Desktop software",
    title: "Windows desktop software",
    summary: "Programs that run on your own machines, work without internet, and talk to your printers and scanners.",
    audience: "Counters, reception desks and venues where the software has to keep running whatever happens to the connection.",
    intro:
      "Some work cannot wait for a browser tab or a stable connection. I build Windows programs that start instantly, keep their data on your machine, and print straight to the receipt printer on the counter.",
    includes: [
      {
        title: "Works offline",
        body: "Data is stored locally, so the program keeps working through internet cuts and never depends on a remote server.",
      },
      {
        title: "Printers and scanners",
        body: "Direct printing to 80mm thermal receipt printers, barcode label output, and barcode scanner input.",
      },
      {
        title: "Timers and live sessions",
        body: "Running timers with different rates, automatic rounding and billing, as used to charge by the hour in a gaming center.",
      },
      {
        title: "Shifts and cash control",
        body: "Opening and closing a shift, counting the drawer, and a report for the owner at the end of each shift.",
      },
      {
        title: "Staff accounts",
        body: "Separate logins for each employee, securely hashed passwords, and a recycle bin so nothing is lost by accident.",
      },
      {
        title: "Installation and updates",
        body: "I install the program on your machines, connect the printers, and deliver updates when you need changes.",
      },
    ],
    projects: ["kmz-hub"],
    faqs: [
      {
        question: "Should I get a desktop program or a web system?",
        answer:
          "Choose desktop when the work happens on one or a few fixed machines, must survive internet cuts, or depends on local hardware. Choose web when several branches or people need the same live data from anywhere. I help you decide after seeing how you work.",
      },
      {
        question: "Which versions of Windows are supported?",
        answer: "Windows 10 and Windows 11.",
      },
      {
        question: "What technology is the software built with?",
        answer: "C# on .NET, with .NET MAUI Blazor Hybrid or WPF for the interface and a local SQLite database.",
      },
    ],
    seoTitle: "Windows desktop software developer in Egypt",
    seoDescription:
      "Custom Windows desktop software that works offline and connects to thermal printers and barcode scanners. Built with C# and .NET by Kirollos Magdy in Alexandria, Egypt.",
    whatsappMessage: "Hi Kirollos, I need a desktop program for my business.",
  },
];

const ar: Service[] = [
  {
    slug: "business-systems",
    name: "أنظمة POS و ERP",
    title: "أنظمة نقاط البيع و ERP للمحلات والشركات",
    summary: "المبيعات والمخزون والحسابات وصلاحيات الموظفين في نظام واحد مبني على طريقة عملك الفعلية.",
    audience: "محلات التجزئة، والورش، والكافيهات، وصالات الألعاب، والأنشطة التي لها أكثر من فرع.",
    intro:
      "البرامج الجاهزة تُلزمك بطريقتها في العمل. أنا أبني النظام حول عملك أنت: قواعد التسعير عندك، وشكل فاتورتك، وفروعك، وطريقة تسليم الوردية بين موظفيك. فتحصل على مكان واحد للمبيعات والمخزون والأموال، مع سجل واضح بمن فعل ماذا.",
    includes: [
      {
        title: "المبيعات والفواتير",
        body: "شاشة بيع سريعة تدعم الباركود، والمرتجعات والاسترداد، والخصومات والكوبونات، مع طباعة الفواتير أو الإيصالات الحرارية بالعربية أو الإنجليزية.",
      },
      {
        title: "المخزون بين الفروع",
        body: "متابعة المخزون لكل فرع ولكل مكان تخزين، والتحويل بينها، والجرد السريع بالباركود، مع سجل كامل لكل حركة.",
      },
      {
        title: "الحسابات والنقدية",
        body: "أرصدة الموردين والعملاء، والخزائن وأدراج النقدية، والمصروفات، وإقفال الوردية بجرد النقدية حتى يُكتشف أي عجز في اليوم نفسه.",
      },
      {
        title: "المستخدمون والصلاحيات وسجل التغييرات",
        body: "كل موظف يرى فقط ما تسمح به صلاحياته. التغييرات الحساسة تُسجَّل باسم من أجراها ووقتها، ويمكن حمايتها بتسجيل دخول بخطوتين.",
      },
      {
        title: "تقارير تبني عليها قرارك",
        body: "تقارير الأرباح والمبيعات والمخزون والموردين على الشاشة، مع تصدير PDF و Excel لمحاسبك.",
      },
      {
        title: "التجهيز والتسليم",
        body: "أثبّت النظام على خادمك أو أجهزتك، وأُدخل بياناتك الافتتاحية، وأدرّب موظفيك على الاستخدام اليومي.",
      },
    ],
    projects: ["jewelry-system", "kmz-hub"],
    faqs: [
      {
        question: "هل يمكن أن يتبع النظام قواعد تسعير خاصة بمجالي؟",
        answer:
          "نعم. نظام المجوهرات الذي بنيته يسعّر كل قطعة حسب وزنها وسعر المعدن الحالي والمصنعية، بمعادلات يعدّلها صاحب المحل بنفسه دون مبرمج. والطريقة نفسها تصلح لأي مجال له قواعد تسعير خاصة.",
      },
      {
        question: "هل يعمل النظام إذا انقطع الإنترنت؟",
        answer:
          "يمكن ذلك. KMZ Hub، نظامي لصالات البلايستيشن، يحفظ كل شيء على الجهاز نفسه ويعمل بدون إنترنت تماماً. أما الأنشطة ذات الفروع المتعددة التي تحتاج بيانات مشتركة لحظية، فالنظام المعتمد على الويب أنسب لها غالباً. أنصحك بأحدهما بعد أن أرى كيف يسير عملك.",
      },
      {
        question: "هل يطبع الفواتير والإيصالات بالعربية؟",
        answer:
          "نعم. النظامان يطبعان بالعربية باتجاه صحيح من اليمين إلى اليسار: فواتير A4 و A5، وإيصالات حرارية 80 مم، وملصقات الباركود.",
      },
      {
        question: "هل يمكن نقل بياناتي الحالية إلى النظام الجديد؟",
        answer:
          "في أغلب الحالات نعم. يمكن استيراد الأصناف والعملاء والموردين والأرصدة الافتتاحية من Excel أو من ملف التصدير في برنامجك الحالي.",
      },
    ],
    seoTitle: "برمجة أنظمة نقاط البيع POS و ERP للمحلات والشركات في مصر",
    seoDescription:
      "أنظمة POS و ERP مخصصة للمحلات والورش والأنشطة متعددة الفروع: مبيعات، مخزون، حسابات، صلاحيات، وفواتير بالعربية. ينفّذها كيرلس مجدي في الإسكندرية، مصر.",
    whatsappMessage: "أهلاً كيرلس، أحتاج نظام POS/ERP لنشاطي.",
  },
  {
    slug: "websites",
    name: "المواقع وتطبيقات الويب",
    title: "المواقع وتطبيقات الويب",
    summary: "مواقع للأنشطة التجارية يسهل الوصول إليها والتصرف من خلالها، وتطبيقات ويب بحسابات وحجوزات ودفع إلكتروني.",
    audience: "العيادات، والكافيهات والمطاعم، والمحلات، وشركات الخدمات، والشركات الناشئة.",
    intro:
      "للموقع مهمة واحدة: أن يحوّل الزائر إلى حجز أو طلب أو رسالة. أبني مواقع سريعة وواضحة بالعربية أو الإنجليزية أو بهما معاً، وتطبيقات ويب كاملة حين تحتاج حسابات للعملاء أو حجوزات أو دفعاً إلكترونياً أو لوحة تحكم.",
    includes: [
      {
        title: "مواقع الأنشطة التجارية",
        body: "صفحات واضحة لما تقدّمه، ومكانك، وطريقة الوصول إليك، مع روابط واتساب والهاتف والخريطة على بُعد ضغطة واحدة من الموبايل.",
      },
      {
        title: "تطبيقات الويب",
        body: "حسابات للعملاء، وحجوزات، وطلبات، وإشعارات، مع لوحة تحكم يدير منها فريقك كل شيء.",
      },
      {
        title: "الدفع الإلكتروني",
        body: "الدفع بالبطاقات عبر Stripe أو مزوّد الدفع المتاح في بلدك، مع صفحة دفع آمنة وسجل للمدفوعات.",
      },
      {
        title: "العربية والإنجليزية",
        body: "اتجاه صحيح من اليمين إلى اليسار وخطوط عربية مناسبة، لا صفحة إنجليزية معكوسة.",
      },
      {
        title: "مبنية ليُعثر عليها",
        body: "تحميل سريع، وبنية صفحات نظيفة، والبيانات الوصفية التي تقرؤها محركات البحث ومساعدات الذكاء الاصطناعي. وهذا الموقع مبني بالطريقة نفسها.",
      },
      {
        title: "الدومين والاستضافة والإطلاق",
        body: "أجهّز الدومين والاستضافة وشهادة SSL، وأسلّمك موقعاً يعمل وملكيته لك.",
      },
    ],
    projects: ["physiotherapy", "tahwega-cafe", "wistore"],
    faqs: [
      {
        question: "هل أستطيع تعديل المحتوى بنفسي؟",
        answer:
          "نعم، حين يحتاج المشروع ذلك. للمحتوى الذي يتغير كثيراً، مثل قائمة الطعام أو الأسعار أو المقالات، أضيف لوحة تحكم بسيطة. أما الصفحات التي يندر تغييرها فأبقيها ثابتة لأنها أسرع وأقل تكلفة في الاستضافة، وأجري لك التعديلات عند الحاجة.",
      },
      {
        question: "هل تصمّم الموقع أيضاً أم تبرمجه فقط؟",
        answer:
          "أصمّمه وأبرمجه، وتراجع التصميم قبل بدء البرمجة. وإن كان لديك مصمّم أو هوية بصرية جاهزة فأعمل على أساسها.",
      },
      {
        question: "ما التقنيات التي تستخدمها؟",
        answer:
          "Next.js و React للمواقع والواجهات، و ASP.NET Core مع SQL Server حين يحتاج المشروع خادماً أو حسابات أو مدفوعات.",
      },
    ],
    seoTitle: "تصميم وبرمجة المواقع وتطبيقات الويب في مصر",
    seoDescription:
      "مواقع للأنشطة التجارية وتطبيقات ويب بحجوزات وحسابات ودفع إلكتروني، بالعربية والإنجليزية. يصمّمها ويبرمجها كيرلس مجدي باستخدام Next.js و ASP.NET Core.",
    whatsappMessage: "أهلاً كيرلس، أحتاج موقعاً لنشاطي.",
  },
  {
    slug: "desktop-software",
    name: "برامج الديسكتوب",
    title: "برامج ويندوز للديسكتوب",
    summary: "برامج تعمل على أجهزتك أنت، وبدون إنترنت، وتتصل بطابعاتك وقارئات الباركود.",
    audience: "الكاشير، ومكاتب الاستقبال، والأماكن التي يجب أن يستمر فيها البرنامج في العمل مهما حدث للاتصال.",
    intro:
      "بعض الأعمال لا تحتمل انتظار صفحة في المتصفح ولا اتصالاً متقطعاً. أبني برامج ويندوز تفتح فوراً، وتحفظ بياناتها على جهازك، وتطبع مباشرة على طابعة الإيصالات عند الكاشير.",
    includes: [
      {
        title: "يعمل بدون إنترنت",
        body: "البيانات محفوظة على الجهاز نفسه، فيستمر البرنامج في العمل عند انقطاع الإنترنت ولا يعتمد على خادم بعيد.",
      },
      {
        title: "الطابعات وقارئات الباركود",
        body: "طباعة مباشرة على طابعات الإيصالات الحرارية 80 مم، وإخراج ملصقات الباركود، والقراءة من قارئ الباركود.",
      },
      {
        title: "المؤقّتات والجلسات الحيّة",
        body: "مؤقّتات تعمل بأسعار مختلفة، مع تقريب وحساب تلقائي للفاتورة، كما في محاسبة الساعات داخل صالة ألعاب.",
      },
      {
        title: "الورديات وضبط النقدية",
        body: "فتح الوردية وإقفالها، وجرد الدرج، وتقرير لصاحب المكان في نهاية كل وردية.",
      },
      {
        title: "حسابات الموظفين",
        body: "دخول مستقل لكل موظف، وكلمات مرور مشفّرة بأمان، وسلة محذوفات حتى لا يضيع شيء بالخطأ.",
      },
      {
        title: "التثبيت والتحديثات",
        body: "أثبّت البرنامج على أجهزتك، وأوصّل الطابعات، وأسلّمك التحديثات كلما احتجت تعديلاً.",
      },
    ],
    projects: ["kmz-hub"],
    faqs: [
      {
        question: "أيّهما أختار: برنامج ديسكتوب أم نظام ويب؟",
        answer:
          "اختر الديسكتوب إذا كان العمل على جهاز واحد أو أجهزة ثابتة قليلة، أو يجب أن يستمر عند انقطاع الإنترنت، أو يعتمد على أجهزة موصّلة مباشرة. واختر الويب إذا احتاجت عدة فروع أو أشخاص البيانات اللحظية نفسها من أي مكان. أساعدك في القرار بعد أن أرى كيف يسير عملك.",
      },
      {
        question: "ما إصدارات ويندوز المدعومة؟",
        answer: "ويندوز 10 وويندوز 11.",
      },
      {
        question: "بأي تقنية يُبنى البرنامج؟",
        answer: "بلغة C# على منصة ‎.NET، مع ‎.NET MAUI Blazor Hybrid أو WPF للواجهة، وقاعدة بيانات SQLite محلية.",
      },
    ],
    seoTitle: "برمجة برامج ويندوز للديسكتوب في مصر",
    seoDescription:
      "برامج ويندوز مخصصة تعمل بدون إنترنت وتتصل بالطابعات الحرارية وقارئات الباركود. يبنيها كيرلس مجدي بلغة C# في الإسكندرية، مصر.",
    whatsappMessage: "أهلاً كيرلس، أحتاج برنامج ديسكتوب لنشاطي.",
  },
];

const content: Record<Locale, Service[]> = { en, ar };

export function getServices(locale: Locale): Service[] {
  return content[locale];
}

export function getService(locale: Locale, slug: string): Service | undefined {
  return content[locale].find((service) => service.slug === slug);
}

/** Slugs are the same in every language. */
export const serviceSlugs = en.map((service) => service.slug);
