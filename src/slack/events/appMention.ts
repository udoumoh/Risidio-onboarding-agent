/**
 * App mention event handler
 * Handles @mentions of the bot in channels and threads
 * Extracts question and calls agent to generate response
 */

import { SlackEventMiddlewareArgs } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { handleAgentMessage, formatSlackMessage } from '../../agent/handleAgentMessage';
import { userStateManager } from '../../state/userState';

/**
 * Handle app mention events
 * Called when user @mentions the bot with a question
 */
export async function handleAppMention(
  { event, say, client }: SlackEventMiddlewareArgs<'app_mention'> & { client: WebClient }
): Promise<void> {
  try {
    const userId = event.user;
    const messageText = event.text || '';
    const channelId = event.channel;
    const threadTs = event.thread_ts || event.ts;

    // Validate required fields
    if (!userId) {
      return;
    }

    // Initialize user state if needed
    userStateManager.initializeUser(userId);

    // Extract the question by removing the bot mention
    // The message format is typically: <@BOT_ID> question here
    const questionText = messageText
      .replace(/<@[A-Z0-9]+>/g, '') // Remove all bot mentions
      .replace(/<@[^>]+>/g, '') // Remove any other mentions
      .trim();

    if (!questionText) {
      await say({
        text: '👋 Hi! I\'m the Lunim Onboarding Buddy. Feel free to ask me anything about onboarding, company policies, tools, or your role-specific checklist.',
        thread_ts: threadTs
      });
      return;
    }

    // Show a typing indicator (reaction)
    try {
      await client.reactions.add({
        channel: channelId,
        timestamp: event.ts || '',
        name: 'thinking_face'
      });
    } catch (reactionError) {
      console.log('Could not add reaction (may not have permission):', reactionError);
    }

    // Call the agent to process the message
    const response = await handleAgentMessage(userId, questionText);

    // Format the response for Slack
    const formattedResponse = formatSlackMessage(response);

    // Send the response in the thread if it's a thread reply, or in the channel
    await say({
      text: formattedResponse,
      thread_ts: threadTs,
      blocks: formatResponseBlocks(formattedResponse)
    });

    // Remove the typing indicator
    try {
      await client.reactions.remove({
        channel: channelId,
        timestamp: event.ts,
        name: 'thinking_face'
      });
    } catch (reactionError) {
      console.log('Could not remove reaction:', reactionError);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error in handleAppMention:', errorMessage);

    try {
      const errorThreadTs = event.thread_ts || event.ts;
      await say({
        text: `I encountered an issue processing your question: ${errorMessage}\n\nPlease try again or reach out to your manager or in #ask-anything for assistance.`,
        ...(errorThreadTs && { thread_ts: errorThreadTs })
      });
    } catch (innerError) {
      console.error('Error sending error message:', innerError);
    }
  }
}

/**
 * Format response message into Slack blocks for better presentation
 * Splits long messages and adds context blocks
 */
function formatResponseBlocks(
  message: string
): Array<{ type: string; text?: { type: string; text: string }; elements?: Array<{ type: string; text: { type: string; text: string } }> }> {
  const blocks: Array<{ type: string; text?: { type: string; text: string }; elements?: Array<{ type: string; text: { type: string; text: string } }> }> = [];

  // Split message into sections if it's very long
  const sections = message.split('\n\n');

  for (const section of sections) {
    if (section.trim()) {
      // If section is very long, split it further
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

  // Add a footer block if no blocks were created
  if (blocks.length === 0) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'I\'m here to help! Ask me anything about your onboarding.'
      }
    });
  }

  return blocks;
}
