export type Role =
  | "developer"
  | "hr"
  | "marketing";

export type ChecklistItemCategory = "tools" | "people" | "culture" | "work";

export type ChecklistItem = {
  id: string;
  title: string;
  description?: string;
  link?: string;
  category: ChecklistItemCategory;
};

export const CHECKLISTS: Record<Role, ChecklistItem[]> = {
  developer: [
    {
      id: "read_onboarding_hub",
      title: "Read the why we're here list on trello",
      description:
        "Skim the why we're here list on trello to understand Lunim’s mission, current focus areas, and how teams are structured.",
      link: "#",
      category: "culture",
    },
    {
      id: "join_core_channels",
      title: "Join core Slack channels",
      description:
        "At minimum, join #attendance, #onboarding-december, #general, and your main team channel (for example, #dev).",
      category: "people",
    },
    {
      id: "meet_HR_Point_of_Contact",
      title: "Meet your HR point of contact and onboarding buddy",
      description:
        "Your HR contact can help with any questions about benefits, policies, or paperwork. Your onboarding buddy is a go-to for day-to-day questions about processes and culture.",
      category: "people",
    },
    {
      id: "dev_env_setup",
      title: "Set up your local development environment",
      description:
        "Clone the main repository, install dependencies, configure environment variables, and run the app locally. Ask in the dev channel if you get stuck.",
      category: "tools",
    },
    {
      id: "access_core_tools",
      title: "Confirm access to core tools",
      description:
        "Make sure you can access Slack, Notion, Trello, the code repo, and the issue tracker used by your team.",
      category: "tools",
    },
    {
      id: "capstone_project",
      title: "Get set for your capstone project",
      description: "Read through the cards in the Why We're Here list to get set for your capstone project",
      category: "work"
    },
    {
      id: "first_small_change",
      title: "Ship a small change",
      description:
        "Work with your buddy or manager to pick a small issue or improvement you can ship in your first week to get familiar with the workflow.",
      category: "work",
    },
  ],

  hr: [
    {
      id: "read_onboarding_hub",
      title: "Read the why we're here list on trello",
      description:
        "Skim the why we're here list on trello to understand Lunim's mission, current focus areas, and how teams are structured.",
      link: "#",
      category: "culture",
    },
    {
      id: "join_core_channels",
      title: "Join core Slack channels",
      description:
        "At minimum, join #attendance, #onboarding-december, #general, and your main team channel (for example, #hr).",
      category: "people",
    },
    {
      id: "meet_HR_Point_of_Contact",
      title: "Meet your HR point of contact and onboarding buddy",
      description:
        "Your HR contact can help with any questions about benefits, policies, or paperwork. Your onboarding buddy is a go-to for day-to-day questions about processes and culture.",
      category: "people",
    },
    {
      id: "access_core_tools",
      title: "Confirm access to core tools",
      description:
        "Make sure you can access Slack, Notion, Trello, and any HR management tools used by your team.",
      category: "tools",
    },
    {
      id: "review_hr_processes",
      title: "Review key HR processes and policies",
      description:
        "Familiarize yourself with onboarding procedures, employee policies, and documentation standards.",
      category: "tools",
    },
    {
      id: "capstone_project",
      title: "Get set for your capstone project",
      description: "Read through the cards in the Why We're Here list to get set for your capstone project",
      category: "work"
    },
    {
      id: "first_small_task",
      title: "Complete a small HR task",
      description:
        "Work with your buddy or manager to pick a small task you can complete in your first week to get familiar with the workflow.",
      category: "work",
    },
  ],

  marketing: [
    {
      id: "read_onboarding_hub",
      title: "Read the why we're here list on trello",
      description:
        "Skim the why we're here list on trello to understand Lunim's mission, current focus areas, and how teams are structured.",
      link: "#",
      category: "culture",
    },
    {
      id: "join_marketing_channels",
      title: "Join core Slack channels",
      description:
        "At minimum, join #attendance, #onboarding-december, #general, and your main team channel (for example, #marketing).",
      category: "people",
    },
    {
      id: "meet_HR_Point_of_Contact",
      title: "Meet your HR point of contact and onboarding buddy",
      description:
        "Your HR contact can help with any questions about benefits, policies, or paperwork. Your onboarding buddy is a go-to for day-to-day questions about processes and culture.",
      category: "people",
    },
    {
      id: "access_core_tools",
      title: "Confirm access to core tools",
      description:
        "Make sure you can access Slack, Notion, Trello, and any marketing tools used by your team.",
      category: "tools",
    },
    {
      id: "brand_and_voice",
      title: "Review brand, messaging, and tone of voice",
      description:
        "Read the brand/voice guidelines to see how we talk about Lunim, our users, and our products.",
      category: "tools",
    },
    {
      id: "capstone_project",
      title: "Get set for your capstone project",
      description: "Read through the cards in the Why We're Here list to get set for your capstone project",
      category: "work"
    },
    {
      id: "first_deliverable",
      title: "Complete a small first deliverable",
      description:
        "Work with your buddy or manager to pick a small marketing task you can complete in your first week to get familiar with the workflow.",
      category: "work",
    },
  ],
};

/**
 * Get the onboarding checklist for a specific role
 */
export function getRoleChecklist(role: Role): ChecklistItem[] {
  return CHECKLISTS[role] || CHECKLISTS.developer;
}

/**
 * Format a role checklist into a readable Slack message
 */
export function formatChecklistForSlack(role: Role): string {
  const checklist = getRoleChecklist(role);
  const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1);

  let message = `*Welcome to Risidio as a ${roleDisplay}!*\n\n`;
  message += `Here's your onboarding checklist:\n\n`;

  const categories: ChecklistItemCategory[] = [
    "culture",
    "people",
    "tools",
    "work"
  ];

  for (const category of categories) {
    const items = checklist.filter(item => item.category === category);
    if (items.length === 0) continue;

    const categoryDisplay =
      category.charAt(0).toUpperCase() + category.slice(1);
    message += `*${categoryDisplay}*\n`;

    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.title}\n`;
      if (item.description) {
        message += `   ${item.description}\n`;
      }
    });

    message += "\n";
  }

  message += `_Questions? Ask in #ask-anything or reach out to your manager!_`;

  return message;
}

/**
 * Create a checkbox checklist version for tracking
 */
export function createChecklistItems(role: Role) {
  const checklist = getRoleChecklist(role);
  return checklist.map(item => ({
    ...item,
    completed: false
  }));
}

/**
 * Format checklist items for display
 */
export function formatChecklistItems(items: ChecklistItem[]): string {
  const categories: ChecklistItemCategory[] = [
    "culture",
    "people",
    "tools",
    "work"
  ];

  let formatted = "";

  for (const category of categories) {
    const categoryItems = items.filter(i => i.category === category);
    if (categoryItems.length === 0) continue;

    const categoryDisplay =
      category.charAt(0).toUpperCase() + category.slice(1);

    formatted += `*${categoryDisplay}*\n`;
    formatted += categoryItems
      .map(item => `☐ ${item.title}`)
      .join("\n");
    formatted += "\n\n";
  }

  return formatted;
}

/**
 * Get available roles
 */
export function getAvailableRoles(): Role[] {
  return Object.keys(CHECKLISTS) as Role[];
}

/**
 * Get role suggestion based on keywords in job title
 */
export function suggestRole(jobTitle: string): Role {
  const lower = jobTitle.toLowerCase();

  if (
    lower.includes("engineer") ||
    lower.includes("developer") ||
    lower.includes("backend") ||
    lower.includes("frontend") ||
    lower.includes("dev") ||
    lower.includes("software")
  ) {
    return "developer";
  }

  if (
    lower.includes("hr") ||
    lower.includes("human resources") ||
    lower.includes("people") ||
    lower.includes("recruiting") ||
    lower.includes("talent")
  ) {
    return "hr";
  }

  if (
    lower.includes("market") ||
    lower.includes("growth") ||
    lower.includes("demand gen") ||
    lower.includes("brand") ||
    lower.includes("content") ||
    lower.includes("social media")
  ) {
    return "marketing";
  }

  return "developer";
}
