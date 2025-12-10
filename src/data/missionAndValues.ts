/**
 * Risidio mission, values, culture, and Lunim product overview
 */

export const risidioMission = {
  mission: `Risidio is on a mission to empower creators and brands through innovative blockchain technology.
We build products that make digital ownership accessible, transparent, and valuable for everyone.`,

  values: [
    "Innovation First: We embrace cutting-edge technology to solve real problems",
    "Creator-Centric: Our users' success is our success",
    "Transparency: We believe in open communication and honest feedback",
    "Collaboration: We work together across teams to achieve our goals",
    "Continuous Learning: We grow together and support each other's development"
  ],

  culture: `At Risidio, we foster a remote-first, async-friendly culture where autonomy and ownership are valued.
We encourage experimentation, celebrate wins together, and learn from failures as a team.
Weekly updates keep everyone aligned, and we prioritize work-life balance.`,

  waysOfWorking: [
    "Remote-first: Work from anywhere, collaborate asynchronously",
    "Weekly sync-ups: Join #weekly-update for company-wide progress",
    "Async communication: Use Slack threads, document decisions",
    "Ownership mindset: Take initiative and drive your projects forward",
    "Regular 1:1s: Connect with your manager weekly or bi-weekly"
  ]
};

export const lunimOverview = {
  name: "Lunim",

  description: `Lunim is Risidio's flagship platform for digital asset management and NFT marketplaces.
It enables creators, brands, and enterprises to launch their own branded NFT experiences with ease.`,

  keyFeatures: [
    "White-label NFT marketplace creation",
    "Customizable storefront and branding",
    "Multi-chain support (Ethereum, Polygon, etc.)",
    "Creator tools for minting and managing collections",
    "Built-in analytics and reporting",
    "Secure wallet integration"
  ],

  techStack: [
    "Frontend: React, TypeScript, Next.js",
    "Backend: Node.js, PostgreSQL",
    "Blockchain: Ethereum, Polygon, Web3.js",
    "Infrastructure: AWS, Docker, Kubernetes"
  ],

  importantChannels: [
    "#lunim-dev - Development discussions",
    "#lunim-product - Product updates and roadmap",
    "#lunim-support - Customer support issues"
  ]
};

export const generalOnboardingInfo = {
  firstWeekFocus: [
    "Get access to all tools and platforms (Slack, GitHub, Notion, etc.)",
    "Join relevant Slack channels for your role",
    "Complete HR paperwork and compliance training",
    "Set up your development environment (if engineering)",
    "Schedule intro calls with team members",
    "Review key documentation and product demos",
    "Ask questions - there are no stupid questions!"
  ],

  keyChannels: [
    "#general - Company-wide announcements",
    "#onboarding-december - New joiners cohort channel",
    "#weekly-update - Weekly company progress updates",
    "#random - Casual chat and team bonding",
    "#ask-anything - Questions about processes, tools, etc.",
    "#celebrations - Team wins and milestones"
  ],

  importantLinks: [
    "Company Handbook: [Ask your manager for Notion link]",
    "Product Roadmap: [Ask in #lunim-product]",
    "Engineering Wiki: [Ask in #all-engineers]",
    "Design System: [Ask in #design]"
  ]
};

export function getRisidioMissionAndValues(): string {
  return `
**🏢 About Risidio**

${risidioMission.mission}

**Our Values:**
${risidioMission.values.map((v, i) => `${i + 1}. ${v}`).join('\n')}

**Culture:**
${risidioMission.culture}

**How We Work:**
${risidioMission.waysOfWorking.map((w, i) => `• ${w}`).join('\n')}
  `.trim();
}

export function getLunimOverview(): string {
  return `
**🚀 About Lunim**

${lunimOverview.description}

**Key Features:**
${lunimOverview.keyFeatures.map(f => `• ${f}`).join('\n')}

**Tech Stack:**
${lunimOverview.techStack.map(t => `• ${t}`).join('\n')}

**Lunim Channels:**
${lunimOverview.importantChannels.map(c => `• ${c}`).join('\n')}
  `.trim();
}
