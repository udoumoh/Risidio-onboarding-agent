/**
 * Comprehensive FAQ database for Risidio/Lunim onboarding
 * Includes company info, product info, policies, and onboarding guidance
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category:
    | "company"
    | "product"
    | "policies"
    | "channels"
    | "tools"
    | "firstweek"
    | "benefits";
  keywords: string[];
}

export const faqs: FAQ[] = [
  // Company & Culture FAQs
  {
    id: "company-mission",
    question: "What is Risidio's mission?",
    answer: `Risidio is on a mission to empower creators and brands through innovative blockchain technology.
We build products that make digital ownership accessible, transparent, and valuable for everyone.`,
    category: "company",
    keywords: ["mission", "risidio", "purpose", "goal"]
  },
  {
    id: "company-values",
    question: "What are Risidio's core values?",
    answer: `Our core values are:
1. Innovation First - We embrace cutting-edge technology to solve real problems
2. Creator-Centric - Our users' success is our success
3. Transparency - We believe in open communication and honest feedback
4. Collaboration - We work together across teams to achieve our goals
5. Continuous Learning - We grow together and support each other's development`,
    category: "company",
    keywords: ["values", "principles", "culture", "beliefs"]
  },
  {
    id: "company-culture",
    question: "What is the culture like at Risidio?",
    answer: `At Risidio, we foster a remote-first, async-friendly culture where autonomy and ownership are valued.
We encourage experimentation, celebrate wins together, and learn from failures as a team.
Weekly updates keep everyone aligned, and we prioritize work-life balance.`,
    category: "company",
    keywords: ["culture", "environment", "remote", "team", "work-life"]
  },
  {
    id: "company-working-style",
    question: "How does Risidio work operationally?",
    answer: `We operate with these principles:
• Remote-first: Work from anywhere, collaborate asynchronously
• Weekly sync-ups: Join #weekly-update for company-wide progress
• Async communication: Use Slack threads and document decisions
• Ownership mindset: Take initiative and drive your projects forward
• Regular 1:1s: Connect with your manager weekly or bi-weekly`,
    category: "company",
    keywords: ["work", "process", "operational", "remote", "async"]
  },

  // Lunim Product FAQs
  {
    id: "product-lunim-overview",
    question: "What is Lunim?",
    answer: `Lunim is Risidio's flagship platform for digital asset management and NFT marketplaces.
It enables creators, brands, and enterprises to launch their own branded NFT experiences with ease.`,
    category: "product",
    keywords: ["lunim", "product", "platform", "nft", "marketplace"]
  },
  {
    id: "product-features",
    question: "What are Lunim's key features?",
    answer: `Lunim provides:
• White-label NFT marketplace creation
• Customizable storefront and branding
• Multi-chain support (Ethereum, Polygon, etc.)
• Creator tools for minting and managing collections
• Built-in analytics and reporting
• Secure wallet integration`,
    category: "product",
    keywords: ["features", "capabilities", "functionality", "what can"]
  },
  {
    id: "product-tech-stack",
    question: "What technology does Lunim use?",
    answer: `Lunim is built on:
• Frontend: React, TypeScript, Next.js
• Backend: Node.js, PostgreSQL
• Blockchain: Ethereum, Polygon, Web3.js
• Infrastructure: AWS, Docker, Kubernetes`,
    category: "product",
    keywords: ["tech", "technology", "stack", "tools", "built"]
  },
  {
    id: "product-channels",
    question: "What are the Lunim-specific Slack channels?",
    answer: `Join these channels to stay updated on Lunim:
• #lunim-dev - Development discussions and technical updates
• #lunim-product - Product updates and roadmap discussions
• #lunim-support - Customer support issues and solutions`,
    category: "product",
    keywords: ["lunim", "channels", "slack", "join"]
  },

  // Policies - Leave & Time Off
  {
    id: "policy-pto",
    question: "How do I request time off or PTO?",
    answer: `To request time off:
1. Submit your request in advance (at least 2 weeks for planned time off)
2. Use the HR management system or ask your manager for the process
3. Keep your team informed about your absence
4. Set an out-of-office message in Slack
5. Delegate critical tasks before you leave
For emergency time off, notify your manager directly in Slack or phone.`,
    category: "policies",
    keywords: ["pto", "time off", "vacation", "leave", "absence", "days off"]
  },
  {
    id: "policy-leave-types",
    question: "What types of leave are available?",
    answer: `Risidio offers:
• Paid Time Off (PTO) - Flexible paid time off for vacation, personal days, etc.
• Sick Leave - Paid leave for illness and medical appointments
• Parental Leave - Support for new parents
• Bereavement Leave - Support during difficult times
For specific details on entitlements, check with HR or ask in #ask-anything`,
    category: "policies",
    keywords: ["leave", "types", "pto", "sick", "parental", "bereavement"]
  },

  // Policies - Expenses & Reimbursement
  {
    id: "policy-expenses",
    question: "How do I request expense reimbursement?",
    answer: `For expense reimbursement:
1. Keep receipts for all business expenses
2. Submit expenses through the company expense management system
3. Include a description of what the expense was for
4. Get manager approval if required
5. Processing typically takes 5-10 business days
For questions about what's reimbursable, ask in #ask-anything or your manager.`,
    category: "policies",
    keywords: ["expenses", "reimbursement", "receipt", "submit", "cost"]
  },
  {
    id: "policy-travel",
    question: "What's the policy on business travel expenses?",
    answer: `For business travel:
• Flights and transportation are reimbursed (book through company process if available)
• Accommodation is covered for business travel
• Meals are reimbursed within reasonable limits
• Get pre-approval for major expenses before booking
Submit all receipts and use the expense management system for reimbursement.
Ask your manager or HR for specific guidance on your travel.`,
    category: "policies",
    keywords: ["travel", "flights", "accommodation", "business"]
  },
  {
    id: "policy-equipment",
    question: "What equipment and tools will I receive?",
    answer: `As a Risidio employee, you'll receive:
• Laptop (typically MacBook or Windows based on preference and role)
• Monitor, keyboard, mouse (if working from office)
• Necessary software licenses
• VPN access and security tools
Reach out to IT or #ask-anything to request specific equipment or tools you need.`,
    category: "policies",
    keywords: ["equipment", "laptop", "tools", "setup", "hardware"]
  },

  // Slack Channels
  {
    id: "channels-general",
    question: "What are the main Slack channels I should join?",
    answer: `Key channels for all employees:
• #general - Company-wide announcements and discussions
• #onboarding-december - Your cohort's onboarding channel
• #weekly-update - Weekly company progress updates
• #random - Casual chat and team bonding
• #ask-anything - Questions about processes, tools, and policies
• #celebrations - Team wins and milestones`,
    category: "channels",
    keywords: ["channels", "slack", "join", "main", "important"]
  },
  {
    id: "channels-team-specific",
    question: "Are there team-specific channels I should know about?",
    answer: `Yes! Depending on your role, you should join:
• Engineering: #all-engineers, #backend, #frontend, #devops
• Product: #lunim-product, #product-sync
• Design: #design, #design-reviews
• Marketing: #marketing, #content
• Data: #data-analytics, #data-eng
• Management: #managers
• Cross-team: #lunim-dev, #lunim-support
Ask your manager which channels are most relevant for your role.`,
    category: "channels",
    keywords: ["team", "channels", "role", "department", "join"]
  },
  {
    id: "channels-community",
    question: "Are there community and social channels?",
    answer: `Absolutely! We have:
• #random - Memes, funny stuff, off-topic chat
• #coffee-talk - Virtual coffee chats and socializing
• #wellness - Health, fitness, and mental wellness tips
• #book-club - Reading and discussion group
• #games - Gaming and esports chat
• #announcements - Important company news
These are great ways to connect with teammates outside of work projects!`,
    category: "channels",
    keywords: ["community", "social", "fun", "random", "chat"]
  },

  // Tools & Access
  {
    id: "tools-request",
    question: "How do I request access to tools or software?",
    answer: `To request tool access:
1. Ask your manager what tools you need for your role
2. Submit a request through the IT system or email it-support@risidio.com
3. For GitHub, Notion, or Slack integrations, ask in #ask-anything
4. Most access is provisioned on your first day or within 24 hours
5. If you're waiting for access, message your manager or IT in Slack`,
    category: "tools",
    keywords: ["tools", "access", "request", "software", "account"]
  },
  {
    id: "tools-github",
    question: "How do I get access to GitHub?",
    answer: `To get GitHub access:
1. Ask your manager to add you to the Risidio GitHub organization
2. You should be invited within 24 hours
3. Make sure to enable 2FA for security
4. Check out the #all-engineers or #backend/#frontend channels for repo guidance
5. Your manager will point you to documentation and onboarding repos`,
    category: "tools",
    keywords: ["github", "git", "code", "repository", "access"]
  },
  {
    id: "tools-notion",
    question: "How do I access Notion and documentation?",
    answer: `Notion access:
1. You'll receive a Notion invite to your onboarding email
2. The Risidio workspace contains company handbook, docs, and wikis
3. Start with the 'New Hires' page for comprehensive onboarding docs
4. Each team has their own Notion space - join relevant ones
5. Ask in #ask-anything if you can't find something or need access`,
    category: "tools",
    keywords: ["notion", "documentation", "wiki", "docs", "knowledge"]
  },
  {
    id: "tools-development",
    question: "How do I set up my development environment?",
    answer: `To set up development environment (for engineers):
1. Clone the repositories from GitHub
2. Follow the README.md in each repo for setup instructions
3. Install Node.js, PostgreSQL, and Docker (versions specified in docs)
4. Run 'npm install' and local setup scripts
5. Ask in #backend or #frontend for help with specific setup issues
6. The Engineering Wiki in Notion has detailed setup guides`,
    category: "tools",
    keywords: ["development", "environment", "setup", "coding", "dev"]
  },
  {
    id: "tools-vpn",
    question: "Do I need VPN access?",
    answer: `VPN depends on your location:
• If in the office: VPN may not be necessary
• If remote: You likely need VPN for security and database access
• Ask IT or your manager about VPN requirements for your role
• VPN details and setup will be provided during onboarding
• For access questions, email it-support@risidio.com`,
    category: "tools",
    keywords: ["vpn", "security", "network", "access", "remote"]
  },

  // First Week Guidance
  {
    id: "firstweek-what-to-do",
    question: "What should I focus on in my first week?",
    answer: `Your first week priorities:
1. Get access to all tools and platforms (Slack, GitHub, Notion, etc.)
2. Join relevant Slack channels for your role
3. Complete HR paperwork and compliance training
4. Set up your development environment (if engineering)
5. Schedule intro calls with team members
6. Review key documentation and product demos
7. Attend the company orientation/onboarding session
8. Ask questions - there are no stupid questions!`,
    category: "firstweek",
    keywords: ["first week", "onboarding", "start", "beginning", "priorities"]
  },
  {
    id: "firstweek-meetings",
    question: "What meetings should I attend in my first week?",
    answer: `Key meetings to attend:
• Company onboarding session (usually on day 1)
• Team introductions with your direct manager
• 1:1 with your manager to discuss goals and expectations
• Team meetings and standups (ask manager for schedule)
• Async product demos (watch at your own pace)
• Skip if conflicting with timezone - catch recording later
Most meetings are async-friendly, so don't worry about early/late time zones!`,
    category: "firstweek",
    keywords: ["meetings", "first week", "introduction", "attend"]
  },
  {
    id: "firstweek-questions",
    question: "How should I ask questions during onboarding?",
    answer: `Please ask questions! We have many ways:
• #ask-anything - Post questions about processes, tools, or policies
• Your manager - For role-specific or career questions
• Onboarding buddy (if assigned) - For day-to-day help
• Slack threads - Prefix with [QUESTION] for visibility
• Office hours - Many teams have open office hours for questions
Remember: No question is too basic. Everyone was new once!`,
    category: "firstweek",
    keywords: ["questions", "ask", "help", "support", "confused"]
  },
  {
    id: "firstweek-intro-calls",
    question: "How do I schedule intro calls with my team?",
    answer: `To schedule intro calls:
1. Your manager will provide a list of key people to meet
2. Send friendly Slack DMs asking to set up a 15-30 min call
3. Use Slack's calendar integration to find their availability
4. Start with your immediate team, then expand to related teams
5. Have some questions ready (projects, background, advice, etc.)
6. Keep notes and follow up with thanks messages
This is a great way to build relationships and learn the ropes!`,
    category: "firstweek",
    keywords: ["intro calls", "meetings", "schedule", "introduction", "talk"]
  },
  {
    id: "firstweek-code-review",
    question: "When should I start reviewing code or contributing?",
    answer: `Don't rush into code contribution:
• Days 1-3: Focus on environment setup and understanding the codebase
• Days 3-5: Review existing PRs to understand patterns
• Week 2+: Start with small tasks or bug fixes
• Ask your manager for a good "first task"
• Start with documentation or tests - low risk, high learning
• Always ask for code review feedback - use it to learn
Your manager will guide you on the timeline - it's not a race!`,
    category: "firstweek",
    keywords: ["code", "contribution", "pr", "coding", "tasks"]
  },

  // Benefits & Perks
  {
    id: "benefits-health",
    question: "What health and wellness benefits does Risidio offer?",
    answer: `Risidio provides:
• Health insurance (medical, dental, vision)
• Mental health support (therapy/counseling coverage)
• Wellness stipend (gym, meditation apps, etc.)
• Flexible work hours
• Work-from-home support
For specific plan details and enrollment, HR will provide information during onboarding.`,
    category: "benefits",
    keywords: ["health", "insurance", "wellness", "benefits", "medical"]
  },
  {
    id: "benefits-professional-dev",
    question: "Does Risidio support professional development?",
    answer: `Yes! We invest in your growth:
• Learning stipend for courses, conferences, books ($1500-3000/year depending on role)
• Conference attendance and travel support
• Internal mentorship and career coaching
• Time for personal projects and learning
• Skill-sharing sessions and internal talks
Talk to your manager about development goals - we want you to grow!`,
    category: "benefits",
    keywords: ["learning", "development", "training", "education", "growth"]
  },
  {
    id: "benefits-equity",
    question: "Does Risidio offer equity/stock options?",
    answer: `Yes, eligible employees receive equity packages:
• Stock options or RSUs depending on your level and role
• Specific details will be in your offer letter
• Vesting schedule details are provided during onboarding
• Ask HR or your manager if you have questions about your grant
This is a way to align our success with yours!`,
    category: "benefits",
    keywords: ["equity", "stock", "options", "ownership", "rsu"]
  },
  {
    id: "benefits-perks",
    question: "What other perks does Risidio offer?",
    answer: `Additional perks include:
• Flexible work hours and remote-first culture
• Home office setup allowance
• Lunch and snacks budget (for office days)
• Team retreats and in-person meetups (1-2x per year)
• Birthday recognition and team celebrations
• Community giveback opportunities
• Parental leave and family support
• Pet-friendly culture (bring your dog to office!)
Check with HR for the full benefits package!`,
    category: "benefits",
    keywords: ["perks", "benefits", "office", "allowance", "celebration"]
  },

  // General Onboarding
  {
    id: "general-first-day",
    question: "What happens on my first day?",
    answer: `Your first day typically includes:
• Welcome message from CEO or team lead
• Access provisioning and setup help
• Slack introduction and channel joins
• Meeting with your direct manager
• Company orientation (if group onboarding)
• Setup your workspace/laptop
• Say hi to your team in #general or team channel
Don't worry if you don't get everything done - you have the whole week!`,
    category: "firstweek",
    keywords: ["first day", "day one", "start", "orientation"]
  },
  {
    id: "general-onboarding-buddy",
    question: "Will I have an onboarding buddy?",
    answer: `You may have an onboarding buddy assigned:
• They're a peer who can answer day-to-day questions
• Great resource for informal questions and advice
• Perfect person to grab lunch or coffee with
If not assigned automatically, ask your manager to assign one!`,
    category: "firstweek",
    keywords: ["buddy", "onboarding", "mentor", "help", "peer"]
  },
  {
    id: "general-handbook",
    question: "Where is the company handbook?",
    answer: `The Risidio handbook is in Notion:
• You'll receive access during onboarding
• Main workspace: Team Handbook & Policies
• Search the Notion workspace for specific policies
• Ask in #ask-anything if you can't find something
• Update your personal info and preferences in onboarding section
The handbook has everything from policies to fun team info!`,
    category: "company",
    keywords: ["handbook", "policies", "notion", "documentation"]
  },
  {
    id: "general-connect-with-people",
    question: "How can I connect with people at Risidio?",
    answer: `Ways to connect with teammates:
• Slack direct messages - Reach out to people in your team
• #coffee-talk channel - Schedule virtual coffee chats
• Team meetings and syncs - Meet your immediate team
• Office visits (if you're in location) - Come in occasionally
• Team retreats - Usually happen 1-2x per year
• Interest groups - Gaming, book club, wellness, etc.
Our culture values collaboration - don't be shy!`,
    category: "company",
    keywords: ["connect", "people", "team", "relationship", "chat"]
  }
];

/**
 * Simple fuzzy matching function to find relevant FAQs
 * Searches question, answer, and keywords for matches
 */
function calculateFuzzyMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  // Exact match
  if (t.includes(q)) return 100;

  // Word matching
  const queryWords = q.split(/\s+/);
  const matchedWords = queryWords.filter(word => t.includes(word)).length;
  const wordScore = (matchedWords / queryWords.length) * 80;

  // Character similarity (basic Levenshtein-like logic)
  if (wordScore > 0) return wordScore;

  return 0;
}

/**
 * Get FAQ answer by fuzzy matching the query
 * Returns the best matching FAQ or a helpful message
 */
export function getFAQAnswer(query: string): string {
  if (!query || query.trim().length === 0) {
    return "Please ask a question! Try asking about policies, tools, Lunim, or how to get started.";
  }

  let bestMatch: FAQ | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    // Calculate match score across question, keywords, and answer
    const questionScore = calculateFuzzyMatch(query, faq.question);
    const keywordScore = faq.keywords
      .map(k => calculateFuzzyMatch(query, k))
      .reduce((max, score) => Math.max(max, score), 0);
    const answerScore = calculateFuzzyMatch(query, faq.answer) * 0.5; // Lower weight for answer

    const totalScore = Math.max(questionScore, keywordScore, answerScore);

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestMatch = faq;
    }
  }

  if (bestMatch && bestScore > 30) {
    return bestMatch.answer;
  }

  return `I couldn't find a matching FAQ for "${query}". Try asking about:
• Company mission and values
• Lunim product features
• Leave and time off policies
• Expense reimbursement
• Slack channels
• Tools and access
• First week guidance
• Benefits and perks
Or ask your manager or in #ask-anything!`;
}

/**
 * Get all FAQs in a specific category
 */
export function getFAQsByCategory(
  category: FAQ["category"]
): FAQ[] {
  return faqs.filter(faq => faq.category === category);
}

/**
 * Get a formatted string of all FAQs for display
 */
export function formatAllFAQs(): string {
  const categories = [
    "company",
    "product",
    "policies",
    "channels",
    "tools",
    "firstweek",
    "benefits"
  ] as const;

  const formatted = categories
    .map(category => {
      const categoryFaqs = getFAQsByCategory(category);
      const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
      const faqList = categoryFaqs
        .map(faq => `• ${faq.question}`)
        .join("\n");
      return `*${categoryTitle}*\n${faqList}`;
    })
    .join("\n\n");

  return formatted;
}
