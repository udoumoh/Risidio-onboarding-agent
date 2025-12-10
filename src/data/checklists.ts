export type Role =
  | "developer"
  | "marketing"
  | "design"
  | "product"
  | "data"
  | "operations"
  | "other";

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
      title: "Read the main onboarding hub overview",
      description:
        "Skim the onboarding hub to understand Lunim’s mission, current focus areas, and how teams are structured.",
      link: "#",
      category: "culture",
    },
    {
      id: "join_core_channels",
      title: "Join core Slack channels",
      description:
        "At minimum, join #announcements, #onboarding, and your main team channel (for example, #dev).",
      category: "people",
    },
    {
      id: "meet_manager_buddy",
      title: "Meet your manager and buddy",
      description:
        "Schedule quick intro calls with your manager and onboarding buddy to align expectations and ask early questions.",
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
        "Make sure you can access Slack, Notion, the code repo, and the issue tracker used by your team.",
      category: "tools",
    },
    {
      id: "first_small_change",
      title: "Ship a small change",
      description:
        "Work with your buddy or manager to pick a small issue or improvement you can ship in your first week to get familiar with the workflow.",
      category: "work",
    },
  ],

  marketing: [
    {
      id: "read_onboarding_hub",
      title: "Read the main onboarding hub overview",
      description:
        "Understand Lunim’s mission, target users, and high-level product areas.",
      category: "culture",
    },
    {
      id: "join_marketing_channels",
      title: "Join core marketing channels",
      description:
        "Join #marketing, #announcements, #onboarding, and any campaign- or project-specific channels.",
      category: "people",
    },
    {
      id: "brand_and_voice",
      title: "Review brand, messaging, and tone of voice",
      description:
        "Read the brand/voice guidelines to see how we talk about Lunim, our users, and our products.",
      category: "culture",
    },
    {
      id: "tool_access",
      title: "Confirm access to marketing tools",
      description:
        "Check that you have access to any analytics, social, email, or content tools you’ll need in your role.",
      category: "tools",
    },
    {
      id: "shadow_meetings",
      title: "Shadow at least one marketing or planning meeting",
      description:
        "Join a team sync or planning session to see how work is prioritised and discussed.",
      category: "work",
    },
    {
      id: "first_deliverable",
      title: "Complete a small first deliverable",
      description:
        "Work with your manager to pick a small asset, piece of copy, or analysis you can complete in your first week.",
      category: "work",
    },
  ],

  design: [
    {
      id: "read_onboarding_hub",
      title: "Read the main onboarding hub overview",
      description:
        "Get a sense of Lunim’s mission, users, and product surface area.",
      category: "culture",
    },
    {
      id: "join_design_channels",
      title: "Join core design/product channels",
      description:
        "Join #design, #product (or your team’s equivalent), #announcements, and #onboarding.",
      category: "people",
    },
    {
      id: "review_design_system",
      title: "Review the design system and key files",
      description:
        "Open the main design system file and recent project files in Figma or your design tool to see current patterns.",
      category: "tools",
    },
    {
      id: "meet_pod",
      title: "Meet your product/engineering partners",
      description:
        "Set up quick intros with the product manager and engineers you’ll work with most closely.",
      category: "people",
    },
    {
      id: "first_design_task",
      title: "Take on a small design task",
      description:
        "Work with your manager to find a low-risk, scoped design task where you can learn the workflow end-to-end.",
      category: "work",
    },
  ],

  product: [
    {
      id: "read_onboarding_hub",
      title: "Read the onboarding hub and product overview",
      description:
        "Understand the key product lines, users, and current priorities.",
      category: "culture",
    },
    {
      id: "join_product_channels",
      title: "Join core product and team channels",
      description:
        "Join #product, #announcements, #onboarding, and your squad/team channel.",
      category: "people",
    },
    {
      id: "roadmap_context",
      title: "Review current roadmap and priorities",
      description:
        "Look at the current roadmap, active projects, and any quarterly goals to see what’s in motion.",
      category: "work",
    },
    {
      id: "meet_core_team",
      title: "Meet your core cross-functional team",
      description:
        "Intro yourself to the design and engineering partners you’ll be working with most often.",
      category: "people",
    },
    {
      id: "first_backlog_grooming",
      title: "Join a backlog or planning session",
      description:
        "Observe how work is scoped, prioritised, and broken into tasks for the team.",
      category: "work",
    },
  ],

  data: [
    {
      id: "read_onboarding_hub",
      title: "Read the onboarding hub and data overview (if available)",
      description:
        "Get a sense of how data is used to support decisions and products at Lunim.",
      category: "culture",
    },
    {
      id: "join_data_channels",
      title: "Join core data/analytics channels",
      description:
        "Join any data, analytics, or experimentation channels plus #announcements and #onboarding.",
      category: "people",
    },
    {
      id: "tool_access",
      title: "Confirm access to data tools",
      description:
        "Check you have access to the warehouse, BI tools, notebooks, and any relevant dashboards.",
      category: "tools",
    },
    {
      id: "first_data_task",
      title: "Complete a small analysis or dashboard task",
      description:
        "Work with your manager to pick a small, contained task to get familiar with the stack and data model.",
      category: "work",
    },
  ],

  operations: [
    {
      id: "read_onboarding_hub",
      title: "Read the onboarding hub and operations overview",
      description:
        "Understand how operations supports the rest of the company and what’s currently most important.",
      category: "culture",
    },
    {
      id: "join_ops_channels",
      title: "Join core operations channels",
      description:
        "Join any operations-focused channels plus #announcements and #onboarding.",
      category: "people",
    },
    {
      id: "process_overview",
      title: "Review key processes you’ll own or support",
      description:
        "Look through documents describing the key workflows you’ll help run or improve (e.g. expenses, vendor management, hiring support).",
      category: "work",
    },
  ],

  other: [
    {
      id: "read_onboarding_hub",
      title: "Read the general onboarding overview",
      description:
        "Start with the onboarding hub to understand Lunim’s mission, values, and how teams fit together.",
      category: "culture",
    },
    {
      id: "join_core_channels",
      title: "Join core Slack channels",
      description:
        "Join #announcements, #onboarding, and your main team channel so you see relevant updates.",
      category: "people",
    },
    {
      id: "introduce_yourself",
      title: "Introduce yourself in the welcome/onboarding channel",
      description:
        "Share a short intro about who you are, what you’ll be working on, and anything fun you want to add.",
      category: "people",
    },
  ],
};

/**
 * Get the onboarding checklist for a specific role
 */
export function getRoleChecklist(role: Role): ChecklistItem[] {
  return CHECKLISTS[role] || CHECKLISTS.other;
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
    lower.includes("dev")
  ) {
    return "developer";
  }

  if (
    lower.includes("market") ||
    lower.includes("growth") ||
    lower.includes("demand gen") ||
    lower.includes("brand")
  ) {
    return "marketing";
  }

  if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) {
    return "design";
  }

  if (
    lower.includes("product") ||
    lower.includes("pm") ||
    lower.includes("analyst")
  ) {
    return "product";
  }

  if (lower.includes("data") || lower.includes("analytics")) {
    return "data";
  }

  if (
    lower.includes("operation") ||
    lower.includes("finance") ||
    lower.includes("admin")
  ) {
    return "operations";
  }

  return "other";
}
