/**
 * Tool implementations for the Risidio AI Onboarding Buddy agent
 * Provides functions that the agent can call to fetch data and provide relevant information
 */

import {
  getFAQAnswer as getFAQAnswerFromDB,
  getFAQsByCategory
} from '../data/faqs';
import {
  getRisidioMissionAndValues as getMissionFromDB,
  getLunimOverview as getLunimFromDB
} from '../data/missionAndValues';
import {
  getRoleChecklist as getRoleChecklistFromDB,
  formatChecklistForSlack
} from '../data/checklists';
import { userStateManager, UserRole } from '../state/userState';
import type { Role } from '../data/checklists';
import type { ToolDefinition } from '../utils/llmClient';

/**
 * Get Risidio's mission, values, and culture information
 */
export function getRisidioMissionAndValues(): string {
  return getMissionFromDB();
}

/**
 * Get Lunim product overview with features and tech stack
 */
export function getLunimOverview(): string {
  return getLunimFromDB();
}

/**
 * Search FAQs for an answer to a user's question
 */
export function getFAQAnswer(query: string): string {
  return getFAQAnswerFromDB(query);
}

/**
 * Get role-based onboarding checklist
 */
export function getRoleChecklist(role: string): string {
  const validRole = role.toLowerCase() as Role;
  return formatChecklistForSlack(validRole);
}

/**
 * Get personalized next steps for a user based on their state and role
 */
export function getNextSteps(userId: string): string {
  const userState = userStateManager.getUserState(userId);

  if (!userState) {
    return `I don't have any information about your onboarding yet. Let's get started! What's your role at Risidio? (e.g., developer, product, design, marketing, data, operations, or other)`;
  }

  // Get the checklist items for the user's role
  const roleStr = userState.role === UserRole.ENGINEER ? 'developer' : userState.role === UserRole.UNASSIGNED ? 'other' : userState.role;
  const checklistItems = getRoleChecklistFromDB(roleStr as Role);

  // Calculate progress
  const completedCount = userState.completedTasks.length;
  const totalCount = checklistItems.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Find next incomplete tasks
  const nextTasks = checklistItems.filter(
    item => !userState.completedTasks.includes(item.id)
  ).slice(0, 3);

  let message = `\n*Your Onboarding Progress: ${percentage}% Complete* (${completedCount}/${totalCount} tasks)\n\n`;

  if (nextTasks.length === 0) {
    message += `🎉 *Congratulations!* You've completed all your onboarding tasks!\n\n`;
    message += `You're all set to dive into your work at Risidio. Remember:\n`;
    message += `• Keep exploring and learning - there's always more to discover\n`;
    message += `• Don't hesitate to ask questions in #ask-anything\n`;
    message += `• Your manager and team are here to support you\n`;
    message += `• Check out our community channels for connection and fun!\n\n`;
    message += `Welcome to the team!`;
  } else {
    message += `*Here are your next focus areas:*\n\n`;
    nextTasks.forEach((task, idx) => {
      message += `${idx + 1}. *${task.title}*\n`;
      if (task.description) {
        message += `   ${task.description}\n`;
      }
      message += `\n`;
    });

    message += `Keep up the great work! You're doing awesome. 💪`;
  }

  return message;
}

/**
 * Tool definitions for LLM function calling
 * These define what tools the LLM can call and how to call them
 */
export const toolDefinitions: ToolDefinition[] = [
  {
    name: 'getRisidioMissionAndValues',
    description:
      'Get comprehensive information about Risidio\'s mission, core values, company culture, and ways of working. Use this when the user asks about company mission, values, culture, or operational philosophy.',
    input_schema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'getLunimOverview',
    description:
      'Get detailed information about Lunim product, including description, key features, technology stack, and related Slack channels. Use this when the user asks about Lunim, its features, or technology.',
    input_schema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'getFAQAnswer',
    description:
      'Search the comprehensive FAQ database to find answers about policies, processes, tools, channels, benefits, and first-week guidance. Use this for specific questions about HR policies, tool access, Slack channels, expense reimbursement, PTO, equipment, development setup, or onboarding procedures.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The question or topic to search for (e.g., "What is PTO?", "How do I get GitHub access?", "What channels should I join?")'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'getRoleChecklist',
    description:
      'Get the role-specific onboarding checklist for a new employee. Use this when the user asks about their onboarding checklist or what they should focus on based on their role.',
    input_schema: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          enum: ['developer', 'product', 'design', 'marketing', 'data', 'operations', 'other'],
          description: 'The employee\'s role/department'
        }
      },
      required: ['role']
    }
  },
  {
    name: 'getNextSteps',
    description:
      'Get personalized next steps for an employee based on their role and completed onboarding tasks. Shows progress and recommends the next 2-3 priority items. Use this when the user asks what to do next or wants to see their progress.',
    input_schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'The Slack user ID of the employee'
        }
      },
      required: ['userId']
    }
  }
];

/**
 * Execute a tool by name with the given input
 * Used by the message handler to execute tool calls from the LLM
 */
export async function executeTool(
  toolName: string,
  input: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case 'getRisidioMissionAndValues':
      return getRisidioMissionAndValues();

    case 'getLunimOverview':
      return getLunimOverview();

    case 'getFAQAnswer':
      return getFAQAnswer(String(input.query || ''));

    case 'getRoleChecklist':
      return getRoleChecklist(String(input.role || 'other'));

    case 'getNextSteps':
      return getNextSteps(String(input.userId || ''));

    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}
