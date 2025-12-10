/**
 * Main message handler for the Risidio AI Onboarding Buddy agent
 * Orchestrates the conversation flow with LLM tool calling
 */

import { getLLMClient } from '../utils/llmClient';
import type { Message, LLMResponse } from '../utils/llmClient';
import { toolDefinitions, executeTool } from './tools';
import { getSystemPrompt } from './systemPrompt';
import { userStateManager } from '../state/userState';

/**
 * Main handler for agent messages
 * Processes user input, calls LLM with tool definitions, executes tools as needed, and returns response
 */
export async function handleAgentMessage(
  userId: string,
  messageText: string
): Promise<string> {
  try {
    // Step 1: Ensure user is initialized in state
    userStateManager.initializeUser(userId);

    // Step 2: Build the conversation messages
    const systemPrompt = getSystemPrompt();
    const userMessage: Message = {
      role: 'user',
      content: messageText
    };

    const messages: Message[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      userMessage
    ];

    // Step 3: Call LLM with tool definitions
    const llmClient = getLLMClient();
    const firstResponse = await llmClient.callLLM(messages, {
      model: 'claude-3-5-sonnet-20241022',
      temperature: 0.7,
      maxTokens: 1024,
      tools: toolDefinitions
    });

    // Step 4: Check if tools were called
    if (
      firstResponse.toolCalls &&
      firstResponse.toolCalls.length > 0
    ) {
      // Execute tool calls
      const toolResults: Array<{
        toolName: string;
        result: string;
      }> = [];

      for (const toolCall of firstResponse.toolCalls) {
        try {
          const result = await executeTool(toolCall.name, toolCall.input);
          toolResults.push({
            toolName: toolCall.name,
            result
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          toolResults.push({
            toolName: toolCall.name,
            result: `Error executing tool: ${errorMessage}`
          });
        }
      }

      // Step 5: Build context for second LLM call with tool results
      const assistantResponse: Message = {
        role: 'assistant',
        content: firstResponse.content || formatToolCallsAsText(firstResponse.toolCalls)
      };

      // Format tool results for Claude API (if using Claude)
      const toolResultContent = toolResults
        .map(
          tr =>
            `Tool: ${tr.toolName}\nResult: ${tr.result}`
        )
        .join('\n\n');

      const toolResultMessage: Message = {
        role: 'user',
        content: `Here are the results from the tools that were called:\n\n${toolResultContent}\n\nPlease use these results to provide a helpful response to the original question.`
      };

      // Step 6: Call LLM again with tool results
      const messagesWithResults = [
        ...messages,
        assistantResponse,
        toolResultMessage
      ];

      const finalResponse = await llmClient.callLLM(messagesWithResults, {
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.7,
        maxTokens: 1024
      });

      return finalResponse.content || 'I apologize, but I encountered an issue processing your request.';
    }

    // Step 7: Return response if no tools were called
    return (
      firstResponse.content ||
      'I apologize, but I encountered an issue processing your request.'
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    console.error('Error in handleAgentMessage:', errorMessage);

    // Graceful error handling
    return `I encountered an issue processing your message: ${errorMessage}. Please try again or reach out to your manager or in #ask-anything for assistance.`;
  }
}

/**
 * Format tool calls as readable text
 * Fallback for displaying tool calls when there's no text response
 */
function formatToolCallsAsText(toolCalls: Array<{
  id: string;
  name: string;
  input: Record<string, unknown>;
}>): string {
  const callDescriptions = toolCalls
    .map(
      call =>
        `Calling ${call.name} with: ${JSON.stringify(call.input)}`
    )
    .join('\n');

  return `Processing your request by calling: ${callDescriptions}`;
}

/**
 * Format a message for display in Slack
 * Useful for cleaning up formatting and ensuring proper markdown
 */
export function formatSlackMessage(message: string): string {
  // Ensure proper formatting for Slack
  return message
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n');
}
