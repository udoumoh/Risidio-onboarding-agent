/**
 * Message event handler
 * Handles direct messages (DMs) to the bot
 * Routes DM conversations through the agent
 */

import { SlackEventMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { handleAgentMessage, formatSlackMessage } from '../../agent/handleAgentMessage';
import { userStateManager } from '../../state/userState';

/**
 * Handle message events in DMs
 * Called when user sends a direct message to the bot
 */
export async function handleDirectMessage(
  { event, say, client }: SlackEventMiddlewareArgs<'message'> & { client: WebClient }
): Promise<void> {
  try {
    // Type guards for message event properties
    if (event.type !== 'message') {
      return;
    }

    // Skip if this is a bot message
    if ('bot_id' in event && event.bot_id) {
      return;
    }

    // Skip if message has no text
    if (!('text' in event) || !event.text) {
      return;
    }

    // Skip if the message is a subtype (e.g., message_deleted, message_changed)
    if ('subtype' in event && event.subtype) {
      return;
    }

    // Type guard for user and channel
    if (!('user' in event) || !event.user || !('channel' in event) || !event.channel) {
      return;
    }

    const userId = event.user;
    const messageText = event.text;
    const channelId = event.channel;

    // Initialize user state if needed
    userStateManager.initializeUser(userId);

    // Show a typing indicator using a reaction
    try {
      if (event.ts) {
        await client.reactions.add({
          channel: channelId,
          timestamp: event.ts,
          name: 'hourglass_flowing_sand'
        });
      }
    } catch (reactionError) {
      console.log('Could not add reaction:', reactionError);
    }

    // Call the agent to process the message
    const response = await handleAgentMessage(userId, messageText);

    // Format the response for Slack
    const formattedResponse = formatSlackMessage(response);

    // Send the response
    await say({
      text: formattedResponse,
      blocks: formatResponseBlocks(formattedResponse)
    });

    // Remove the typing indicator
    try {
      if (event.ts) {
        await client.reactions.remove({
          channel: channelId,
          timestamp: event.ts,
          name: 'hourglass_flowing_sand'
        });
      }
    } catch (reactionError) {
      console.log('Could not remove reaction:', reactionError);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in handleDirectMessage:', errorMessage);

    try {
      await say({
        text: `I encountered an issue processing your message: ${errorMessage}\n\nPlease try again or reach out to your manager or in #ask-anything for assistance.`
      });
    } catch (innerError) {
      console.error('Error sending error message:', innerError);
    }
  }
}

/**
 * Format response message into Slack blocks for better presentation
 * Splits long messages and adds formatting
 */
function formatResponseBlocks(
  message: string
): Array<{ type: string; text?: { type: string; text: string } }> {
  const blocks: Array<{ type: string; text?: { type: string; text: string } }> = [];

  // Split message into sections
  const sections = message.split('\n\n');

  for (const section of sections) {
    if (section.trim()) {
      // If section is very long, we still need to break it up
      // Slack has a 3000 character limit per block text field
      if (section.length > 2500) {
        const lines = section.split('\n');
        let currentBlock = '';

        for (const line of lines) {
          if ((currentBlock + line).length > 2500) {
            if (currentBlock) {
              blocks.push({
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: currentBlock.trim()
                }
              });
            }
            currentBlock = line + '\n';
          } else {
            currentBlock += line + '\n';
          }
        }

        if (currentBlock.trim()) {
          blocks.push({
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: currentBlock.trim()
            }
          });
        }
      } else {
        blocks.push({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: section.trim()
          }
        });
      }
    }
  }

  // Add a helpful footer if response is short
  if (blocks.length === 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Hello! I\'m here to help with your onboarding. What would you like to know?'
      }
    });
  }

  return blocks;
}

/**
 * Helper function to detect if a message is a DM vs channel message
 * Used to ensure the handler only processes DMs
 */
export function isDirectMessage(channelId: string): boolean {
  // DM channel IDs start with 'D'
  return channelId.startsWith('D');
}
