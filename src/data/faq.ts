export type FAQCategory =
  | "onboarding"
  | "tools"
  | "policies"
  | "culture"
  | "people"
  | "workflows"
  | "other";

export type FAQEntry = {
  id: string;
  question: string;
  answer: string; // Slack/Markdown-friendly
  keywords: string[]; // used for simple matching
  category: FAQCategory;
  link?: string; // optional deep link to doc / hub
};

export const FAQS: FAQEntry[] = [
  {
    id: "what_is_lunim",
    question: "What is Lunim and what do we do?",
    answer:
      "Lunim builds tools and services that make it easier for teams to form, fund, and ship projects together. We focus on reducing friction in collaboration, contracts, and discovery so more ideas actually make it into the world.",
    keywords: ["what is lunim", "company", "do you do", "about lunim"],
    category: "onboarding",
  },
  {
    id: "what_is_sprint_zero",
    question: "What is Sprint Zero?",
    answer:
      "Sprint Zero is your focused onboarding period at Lunim. It’s a short, intentional window where you set up tools, learn how we work, and ship your first small contribution. The goal isn’t perfection – it’s confidence, clarity, and momentum.",
    keywords: ["sprint zero", "onboarding sprint", "first week"],
    category: "onboarding",
  },
  {
    id: "first_week_focus",
    question: "What should I focus on in my first week?",
    answer:
      "In your first week, focus on three things: (1) **Context** – read the onboarding hub and get a feel for Lunim’s mission and current priorities. (2) **Connection** – introduce yourself in *#welcome-wall-december* and connect with your manager and buddy. (3) **Momentum** – complete your core setup and try to ship or contribute to one small piece of work.",
    keywords: ["first week", "what to do", "focus", "week one"],
    category: "onboarding",
  },

  {
    id: "which_channels_join",
    question: "Which Slack channels should I join first?",
    answer:
      "As a new joiner in the December cohort, start with:\n" +
      "- *#onboarding-december* – your main space for onboarding support and updates.\n" +
      "- *#welcome-wall-december* – introduce yourself and meet the cohort.\n" +
      "- *#weekly-update* – company / team updates.\n" +
      "- *#weekly-topic* and *#weekly-forum* – shared learning, discussion, and cohort conversations.\n" +
      "- *#all-engineers* or *#all-marketers* – depending on your role.\n" +
      "You’ll likely be invited to additional project- or team-specific channels as you ramp up.",
    keywords: ["channels", "which channels", "join", "slack"],
    category: "onboarding",
  },

  {
    id: "tools_overview",
    question: "What tools do we use day-to-day?",
    answer:
      "Day-to-day, we use Slack for communication and a mix of tools for docs, tasks, and experiments (for example Notion, Trello/Linear/Jira, or similar). During onboarding, you’ll mainly live in Slack, the onboarding hub, and any shared docs your team uses. Ask your manager or buddy which tools your specific team is using right now.",
    keywords: ["tools", "stack", "apps", "software", "day to day"],
    category: "tools",
  },
  {
    id: "slack_etiquette",
    question: "How should I use Slack here?",
    answer:
      "We prefer **public channels** over DMs so others can learn from the conversation. Use threads to keep things tidy, and add context when you ask for help. You can use *#onboarding-december* for onboarding questions, *#all-engineers* or *#all-marketers* for discipline-specific topics, and channels like *#ai-tools* or *news-ai* for sharing resources.",
    keywords: ["slack", "chat", "communication", "etiquette", "messaging"],
    category: "tools",
  },
  {
    id: "z_ignore_general",
    question: "Why is there a z-ignore channel and what about #general?",
    answer:
      "Slack workspaces come with a default *#general* channel. At Lunim, we don’t actively use *#general*, so you may see a channel like *#z-ignore* to make that clear. Instead of posting in *#general*, use the specific channels that match your topic, such as *#onboarding-december*, *#weekly-forum*, *#all-engineers*, or *#all-marketers*.",
    keywords: ["general", "z-ignore", "z ignore", "default channel"],
    category: "tools",
  },
  {
    id: "notion_docs",
    question: "Where do I find docs and onboarding materials?",
    answer:
      "Most onboarding materials live in the onboarding hub and shared documentation spaces (for example Notion). You’ll usually be given a direct link during onboarding. If you can’t find something, ask in *#onboarding-december* or your team channel and someone will point you in the right direction.",
    keywords: ["docs", "documentation", "notion", "onboarding hub"],
    category: "tools",
  },

  {
    id: "request_leave",
    question: "How do I request leave or time off?",
    answer:
      "For planned time off, let your manager know as early as you can and log your leave using the agreed process or tool. For anything unexpected (illness, emergencies), send a short Slack message to your manager and your main team channel as soon as you’re able. Exact tools and rules may vary by contract, so if you’re unsure, ask your manager for the current approach.",
    keywords: ["leave", "time off", "vacation", "holiday", "pto"],
    category: "policies",
  },
  {
    id: "expenses",
    question: "How do I submit expenses?",
    answer:
      "If you need to claim expenses (for example tools, travel, or approved equipment), keep your receipts and follow the process shared in your onboarding materials. If you don’t see a clear process, ask your manager or the relevant operations/finance contact so you can follow the current guidelines.",
    keywords: ["expenses", "reimbursement", "claim", "costs"],
    category: "policies",
  },
  {
    id: "working_hours",
    question: "What are the working hours and expectations?",
    answer:
      "We care more about outcomes and communication than strict office hours. There will usually be some overlap of core hours so collaboration is easier, but specifics can depend on your team and time zone. Talk with your manager about what a sustainable pattern looks like for you and your role.",
    keywords: ["working hours", "time", "schedule", "core hours"],
    category: "policies",
  },

  {
    id: "values_in_practice",
    question: "How do Lunim’s values show up in day-to-day work?",
    answer:
      "You’ll see our values in how we share work early, use AI as a collaborator, and focus on clear written context over noise. Channels like *#weekly-update*, *#weekly-topic*, *#weekly-forum*, and *#lunim-stars* reflect how we share progress, learn together, and recognise each other.",
    keywords: ["values", "culture", "day to day", "behaviours"],
    category: "culture",
  },
  {
    id: "feedback_culture",
    question: "What is the feedback culture like?",
    answer:
      "We try to make feedback normal and useful, not dramatic. That means sharing things that are going well and small course corrections early, rather than saving everything for a formal review. It’s okay to ask “Can I get feedback on this?” and it’s okay to say “Here’s something I think we could improve next time.”",
    keywords: ["feedback", "reviews", "performance", "retros"],
    category: "culture",
  },
  {
    id: "asking_questions",
    question: "Is it okay to ask a lot of questions?",
    answer:
      "Yes. Asking questions early is part of how we work. It’s better to ask and move forward than to stay blocked in silence. The only thing we ask is that you share a bit of context: what you’re trying to do, what you’ve already tried, and where you’re stuck. *#onboarding-december* and *#weekly-forum* are good places for cohort-wide questions.",
    keywords: ["questions", "help", "support", "stuck"],
    category: "culture",
  },

  {
    id: "news_channels",
    question: "What are all the news-* channels for?",
    answer:
      "Channels like *#news-marketing*, *#news-media-creator*, *#news-crypto-web3*, *#news-ai*, and *#news-daily-market* are for sharing and discussing relevant articles, updates, and trends. They help everyone stay sharp and plugged into what’s happening in our space without flooding core work channels.",
    keywords: [
      "news",
      "news-marketing",
      "news-ai",
      "news-crypto",
      "news channels",
    ],
    category: "workflows",
  },
  {
    id: "lunim_stars",
    question: "What is #lunim-stars for?",
    answer:
      "*#lunim-stars* is a dedicated space to recognise and celebrate wins, progress, and everyday effort. It’s where we call out people who have gone above and beyond, unblocked others, shipped something important, or quietly kept things running smoothly.",
    keywords: ["lunim-stars", "recognition", "shout out", "appreciation"],
    category: "culture",
  },
  {
    id: "weekly_update_forum_topic",
    question: "What are #weekly-update, #weekly-topic, and #weekly-forum for?",
    answer:
      "- *#weekly-update* is where you’ll see regular updates on priorities, progress, and key changes.\n" +
      "- *#weekly-topic* is for focused prompts and discussions on specific themes.\n" +
      "- *#weekly-forum* is a space for cohort-wide questions, reflections, and shared learning.\n" +
      "Together they give you a rhythm for staying aligned and connected.",
    keywords: ["weekly-update", "weekly-topic", "weekly-forum", "weekly"],
    category: "workflows",
  },
  {
    id: "ai_tools_channel",
    question: "What is #ai-tools for?",
    answer:
      "*#ai-tools* is a place to share prompts, tools, workflows, and experiments related to AI. It’s where people compare notes on what’s working, what isn’t, and how to use AI to get more leverage in day-to-day work.",
    keywords: ["ai-tools", "ai", "prompts", "tools"],
    category: "tools",
  },

  {
    id: "who_to_ask",
    question: "Who should I talk to if I’m not sure where something fits?",
    answer:
      "If you’re not sure where a question belongs, start with *#onboarding-december*, *#weekly-forum*, or your main role channel (for example *#all-engineers* or *#all-marketers*). It’s completely normal not to know the full channel map at the start – part of onboarding is learning it.",
    keywords: ["who to ask", "not sure", "ownership", "where to post"],
    category: "other",
  },
];
