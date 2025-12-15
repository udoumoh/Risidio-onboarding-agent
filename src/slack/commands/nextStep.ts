/**
 * /next-step command handler
 * Shows user their onboarding progress and next recommended steps
 * Requires user to have completed /onboard first
 */

import { SlackCommandMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { userStateManager, UserRole } from '../../state/userState';
import { getNextSteps } from '../../agent/tools';

/**
 * Handle the /next-step command
 * Checks user state and displays progress + next tasks
 */
export async function handleNextStepCommand(
  { command, ack, respond, client }: SlackCommandMiddlewareArgs & { client: WebClient }
): Promise<void> {
  try {
    // Acknowledge the command request
    await ack();

    const userId = command.user_id;
    const userState = userStateManager.getUserState(userId);

    // Check if user has completed onboarding setup
    if (!userState || userState.role === UserRole.UNASSIGNED) {
      await respond({
        text: 'Please complete the onboarding setup first',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '📋 *Let\'s get you started!*\n\nI notice you haven\'t set up your onboarding profile yet. Please run the `/onboard` command first to select your role and get your personalized checklist.'
            }
          }
        ]
      });
      return;
    }

    // Get next steps based on user state and progress
    const nextStepsMessage = getNextSteps(userId);

    // Format and send the progress update
    await respond({
      text: 'Here\'s your onboarding progress and next steps',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: nextStepsMessage
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Current Role:* ${userState.role.charAt(0).toUpperCase() + userState.role.slice(1)}\n*Started:* ${userState.onboardingStartDate.toLocaleDateString()}\n*Last Updated:* ${userState.lastUpdated.toLocaleDateString()}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: '💡 _Tip: Ask me questions by DMing me or @mentioning me in any channel_'
            }
          ]
        }
      ]
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in handleNextStepCommand:', errorMessage);

    try {
      await respond({
        text: '⚠️ I encountered an error while retrieving your progress. Please try again later.',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Error:* ${errorMessage}\n\nPlease contact your manager or post in #ask-anything if this persists.`
            }
          }
        ]
      });
    } catch (innerError) {
      console.error('Error sending error message:', innerError);
    }
  }
}
