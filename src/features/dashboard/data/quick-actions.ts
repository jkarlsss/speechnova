export interface QuickActions {
  title: string;
  description: string;
  gradient: string;
  href: string;
}

export const quickActions: QuickActions[] = [
  {
    title: "Narrate a story",
    description: "Bring characters to life with voiceover narration.",
    gradient: "from-cyan-400 to-cyan-50",
    href: `/text-to-speech?text=In a village tucked between mist-covered mountains, there lived an old clockmaker named Mr. Clock who fixed timepieces that carried forgotten memories.`,
  },
  {
    title: "Motivational speech",
    description: "Generate inspiring speeches with powerful tone.",
    gradient: "from-emerald-400 to-emerald-50",
    href: `/text-to-speech?text=Success does not come from what you do occasionally, but from what you do consistently. Every step forward matters, no matter how small.`,
  },
  {
    title: "Kids bedtime story",
    description: "Create gentle bedtime stories for children.",
    gradient: "from-purple-400 to-purple-50",
    href: `/text-to-speech?text=Once upon a time, in a glowing forest filled with fireflies, a little rabbit named Lumo set off on an adventure to find the brightest star in the sky.`,
  },
  {
    title: "Podcast intro",
    description: "Generate professional podcast introductions.",
    gradient: "from-orange-400 to-orange-50",
    href: `/text-to-speech?text=Welcome to today's episode where we explore ideas that shape the future of technology, creativity, and innovation.`,
  },
  {
    title: "News headline reading",
    description: "Turn news summaries into spoken reports.",
    gradient: "from-rose-400 to-rose-50",
    href: `/text-to-speech?text=Breaking news today: Scientists have unveiled a new discovery that could transform renewable energy systems worldwide.`,
  },
  {
    title: "Product advertisement",
    description: "Create energetic promotional voiceovers.",
    gradient: "from-indigo-400 to-indigo-50",
    href: `/text-to-speech?text=Introducing the next generation of smart devices designed to simplify your life and keep you connected wherever you go.`,
  },
];