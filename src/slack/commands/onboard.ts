/**
 * /onboard command handler
 * Initiates the onboarding process by asking user to select their role
 * Uses interactive Slack blocks for role selection
 */

import { SlackCommandMiddlewareArgs, SlackActionMiddlewareArgs } from '@slack/bolt';
import { BlockAction } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { userStateManager, UserRole } from '../../state/userState';
import { getRoleChecklist } from '../../agent/tools';

/**
 * Handle the /onboard command
 * Displays role selection modal or blocks
 */
export async function handleOnboardCommand(
  { command, ack, respond, client }: SlackCommandMiddlewareArgs & { client: WebClient },
): Promise<void> {
  try {
    // Acknowledge the command request immediately
    await ack();

    const userId = command.user_id;
    const userName = command.user_name;

    // Initialize or get user state
    userStateManager.initializeUser(userId, userName);

    // Send role selection message with interactive buttons
    await respond({
      text: 'Welcome to Lunim! Let\'s get you onboarded. What\'s your role?',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Welcome to Lunim Onboarding!* 🎉\n\nLet\'s get started by identifying your role. This will help me provide you with a customized onboarding checklist.'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*What\'s your role at Risidio?*'
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '👨‍💻 Developer'
              },
              action_id: 'onboard_role_developer',
              value: 'developer'
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '👥 HR'
              },
              action_id: 'onboard_role_hr',
              value: 'hr'
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📢 Marketing Intern'
              },
              action_id: 'onboard_role_marketing',
              value: 'marketing'
            }
          ]
        }
      ]
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in handleOnboardCommand:', errorMessage);
  }
}

/**
 * Handle role selection button actions
 * Maps button clicks to role selection and displays relevant checklist
 */
export async function handleRoleSelection(
  { body, ack, respond, client }: SlackActionMiddlewareArgs<BlockAction> & { client: WebClient },
): Promise<void> {
  try {
    // Acknowledge the action immediately
    await ack();

    const userId = body.user?.id || 'unknown';
    const userName = body.user?.name || body.user?.username || 'User';
    const actionValue = (body as any).actions?.[0]?.value || 'other';

    // Map action values to UserRole enum
    const roleMap: Record<string, UserRole> = {
      developer: UserRole.ENGINEER,
      hr: UserRole.OTHER,
      marketing: UserRole.OTHER
    };

    const role = roleMap[actionValue] || UserRole.OTHER;

    // Save role to user state
    userStateManager.setUserRole(userId, role);

    // Get the role-based checklist
    const checklist = getRoleChecklist(actionValue);

    // Update the original message with the checklist
    await respond({
      replace_original: true,
      text: `Great! I've set your role to ${actionValue}. Here's your personalized onboarding checklist:`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `✅ *Role Selected: ${actionValue.charAt(0).toUpperCase() + actionValue.slice(1)}*\n\nHere's your personalized onboarding checklist:`
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: checklist
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Next Steps:*\n• Use \`/next-step\` to see what to focus on next\n• Ask me questions anytime by mentioning @Lunim Onboarding Buddy\n• Check out #ask-anything for broader company questions`
          }
        }
      ]
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in handleRoleSelection:', errorMessage);
  }
}
