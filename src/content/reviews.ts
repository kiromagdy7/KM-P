import type { Locale } from "@/i18n/config";

// Client reviews, as the clients wrote them. Each one is kept in the language it
// was written in (`text`), with a translation into the other language. A page
// shows the original when it matches the page language; otherwise it shows the
// translation, marks it as translated and keeps the original one click away.

export interface Review {
  id: string;
  /** Name as shown on each language version */
  name: Record<Locale, string>;
  /** Short line under the name, or null for none */
  context: Record<Locale, string> | null;
  /** Project the review is about, linked from the card */
  project: string | null;
  /** Language the client wrote in */
  lang: Locale;
  /** The client's own words. Paragraphs are separated by a blank line. */
  text: string;
  /** Translation into the other language */
  translation: string;
}

/** The Google Business Profile. Update `count` when new reviews appear there. */
export const googleReviews = {
  rating: 5,
  count: 20,
  // Opens the reviews list of the profile directly (Place ID of "Kirollos Magdy").
  url: "https://search.google.com/local/reviews?placeid=ChIJoapXy69K9mYRO5IkMvcY8Gc",
};

/** In the order they are shown. */
export const reviews: Review[] = [
  {
    id: "david-emad",
    name: { en: "David Emad", ar: "ديفيد عماد" },
    context: { en: "Client, Jewelry System", ar: "عميل، نظام المجوهرات" },
    project: "jewelry-system",
    lang: "ar",
    text: `تجربة ممتازة مع المهندس كيرولس مجدي

أحب أن أشارك تقييمي لتجربتي مع المهندس كيرولس مجدي، والتي لا يمكن وصفها بأقل من ممتازة.

ما يميّز التعامل معه هو سعة صدره وحرصه على فهم جميع الاحتياجات المطلوبة بدقة، والعمل بجدية للوصول إلى الهدف المنشود، حتى مع الحاجة إلى إجراء تعديلات متكررة. كما أن سرعة استجابته للتعديلات والتزامه بالوقت يعكسان مستوى عالياً من الاحترافية والمسؤولية.

كان تعامله راقياً ومحترماً، وحرصه المستمر على تحقيق رضاي الكامل واضحاً في كل خطوة. وبالفعل، كانت تجربة مميزة مع مهندس ماهر، مجتهد، ومخلص في عمله، ويضع رضا عملائه في مقدمة أولوياته.

تشرفت بالتعامل معك يا بشمهندس، ومستمرون بإذن الله في أعمالنا الحالية، ونتطلع إلى المزيد من التعاون في المستقبل.

كل الشكر والتقدير لك.`,
    translation: `An excellent experience with Eng. Kirollos Magdy

I would like to share my review of my experience with Eng. Kirollos Magdy, which I can only describe as excellent.

What sets him apart is his patience and his care to understand every requirement precisely, and the serious work he puts in to reach the goal, even when repeated changes are needed. His quick response to changes and his commitment to deadlines show a high level of professionalism and responsibility.

He was courteous and respectful, and his constant care for my complete satisfaction was clear at every step. It truly was a distinguished experience with a skilled, hard-working and dedicated engineer who puts his clients' satisfaction first.

It was an honor working with you, Eng. We are continuing, God willing, with our current work, and we look forward to more cooperation in the future.

Many thanks and appreciation to you.`,
  },
  {
    id: "michael-nabil",
    name: { en: "Dr. Michael Nabil", ar: "د. مايكل نبيل" },
    context: { en: "Client, clinic website", ar: "عميل، موقع العيادة" },
    project: "physiotherapy",
    lang: "ar",
    text: "بشمهندس كيرلس من أشطر و اسرع المهندسين اللي اشتغلت معاهم حقيقي ❤️❤️❤️\nاتقان في الشغل رهيب 🙏🏻🙏🏻🙏🏻🌹",
    translation:
      "Eng. Kirollos is truly one of the most skilled and fastest engineers I have worked with ❤️❤️❤️\nIncredible quality of work 🙏🏻🙏🏻🙏🏻🌹",
  },
  {
    id: "karen-ibrahem",
    name: { en: "Karen Ibrahem", ar: "كارين إبراهيم" },
    context: { en: "Client, café website", ar: "عميلة، موقع الكافيه" },
    project: "tahwega-cafe",
    lang: "ar",
    text: "أشطر باشمهندس كيرو بجد عاملي ويب سايت للكافيه بتاعي وعملي كل حاجه بشكل منظم وجميل❤️❤️🥰",
    translation: "Truly the most skilled engineer, Kiro. He built the website for my café and did everything in an organized and beautiful way ❤️❤️🥰",
  },
  {
    id: "david-fouad",
    name: { en: "David Fouad", ar: "ديفيد فؤاد" },
    context: { en: "Client", ar: "عميل" },
    project: null,
    lang: "en",
    text: "I highly recommend him. He is very professional and competent. He delivered everything within the timeframe we discussed at the beginning of the agreement. He is also very flexible when it comes to changes I asked for. It was an amazing experience working with him.",
    translation:
      "أنصح به بشدة. محترف جداً وكفء. سلّم كل شيء في المدة التي اتفقنا عليها في بداية الاتفاق. وهو أيضاً مرن جداً في التعديلات التي طلبتها. كانت تجربة رائعة أن أعمل معه.",
  },
  {
    id: "mina-shenouda",
    name: { en: "Mina Shenouda", ar: "مينا شنودة" },
    context: { en: "Client", ar: "عميل" },
    project: null,
    lang: "en",
    text: "He’s highly skilled, professional, and a pleasure to work with. The quality of his work is excellent, and his attention to detail really shows. I’d happily work with him again and highly recommend him.",
    translation:
      "ماهر جداً، ومحترف، والعمل معه ممتع. جودة عمله ممتازة، واهتمامه بالتفاصيل واضح فعلاً. يسعدني أن أعمل معه مرة أخرى، وأنصح به بشدة.",
  },
  {
    id: "hazem-elgammal",
    name: { en: "Eng. Hazem Elgammal", ar: "م. حازم الجمال" },
    context: { en: "Client", ar: "عميل" },
    project: null,
    lang: "en",
    text: "He is one of the best people and young people I have dealt with in the field of computers and programming. He is also very ethical, punctual, committed to his work, and professional in dealing with computer-related problems.",
    translation:
      "من أفضل الأشخاص والشباب الذين تعاملت معهم في مجال الكمبيوتر والبرمجة. وهو أيضاً على خُلق عالٍ، ودقيق في مواعيده، وملتزم بعمله، ومحترف في التعامل مع مشاكل الكمبيوتر.",
  },
  {
    id: "mariam-emad",
    name: { en: "Eng. Mariam Emad", ar: "م. مريم عماد" },
    context: { en: "Client", ar: "عميلة" },
    project: null,
    lang: "ar",
    text: "تجربة ممتازة مع البشمهندس كيرلس شخص محترم و ملتزم جداً انصح بالتعامل معاه",
    translation: "An excellent experience with Eng. Kirollos. A respectful and very committed person. I recommend working with him.",
  },
];

export function reviewForProject(slug: string): Review | undefined {
  return reviews.find((review) => review.project === slug);
}
