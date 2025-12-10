/**
 * LLM abstraction layer for both OpenAI and Claude (Anthropic)
 * Provides a unified interface for language model calls with tool support
 */

import axios, { AxiosInstance } from 'axios';

// Type definitions
export interface ToolDefinition {
  name: string;
  description: string;
  input_schema?: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
  parameters?: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string | ContentBlock[];
}

export interface ContentBlock {
  type: string;
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
}

export interface LLMResponse {
  content: string;
  toolCalls: ToolCall[] | undefined;
  raw: unknown;
}

export interface ToolCall {
  id: string;
  name: string;
  input: Record<string, unknown>;
}

export interface LLMOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  tools?: ToolDefinition[];
}

export type LLMProvider = 'openai' | 'claude' | 'auto';

/**
 * Generic LLM client that supports both OpenAI and Claude
 */
class LLMClient {
  private provider: LLMProvider;
  private apiKey: string;
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(provider: LLMProvider = 'auto') {
    this.provider = provider;

    // Auto-detect provider if not specified
    if (provider === 'auto') {
      const openaiKey = process.env.OPENAI_API_KEY;
      const anthropicKey = process.env.ANTHROPIC_API_KEY;

      if (openaiKey) {
        this.provider = 'openai';
        this.apiKey = openaiKey;
        this.baseURL = 'https://api.openai.com/v1';
      } else if (anthropicKey) {
        this.provider = 'claude';
        this.apiKey = anthropicKey;
        this.baseURL = 'https://api.anthropic.com/v1';
      } else {
        throw new Error('No LLM API key found. Set OPENAI_API_KEY or ANTHROPIC_API_KEY');
      }
    } else {
      this.baseURL = provider === 'openai'
        ? 'https://api.openai.com/v1'
        : 'https://api.anthropic.com/v1';

      const key = provider === 'openai'
        ? process.env.OPENAI_API_KEY
        : process.env.ANTHROPIC_API_KEY;

      if (!key) {
        throw new Error(`Missing API key for ${provider}`);
      }

      this.apiKey = key;
    }

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: this.getHeaders(),
      timeout: 30000
    });
  }

  private getHeaders(): Record<string, string> {
    if (this.provider === 'openai') {
      return {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };
    } else {
      return {
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      };
    }
  }

  /**
   * Call the LLM with messages and optional tools
   */
  async callLLM(
    messages: Message[],
    options: LLMOptions
  ): Promise<LLMResponse> {
    if (this.provider === 'openai') {
      return this.callOpenAI(messages, options);
    } else {
      return this.callClaude(messages, options);
    }
  }

  private async callOpenAI(
    messages: Message[],
    options: LLMOptions
  ): Promise<LLMResponse> {
    try {
      const payload: Record<string, unknown> = {
        model: options.model || 'gpt-3.5-turbo',
        messages: this.normalizeMessages(messages),
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1024
      };

      // Add tools if provided
      if (options.tools && options.tools.length > 0) {
        payload.tools = options.tools.map((tool) => ({
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters || tool.input_schema
          }
        }));
      }

      const response = await this.axiosInstance.post('/chat/completions', payload);
      const content = response.data.choices[0].message;

      let text = '';
      const toolCalls: ToolCall[] = [];

      // Extract text and tool calls
      if (content.content) {
        text = content.content;
      }

      if (content.tool_calls) {
        for (const toolCall of content.tool_calls) {
          toolCalls.push({
            id: toolCall.id,
            name: toolCall.function.name,
            input: JSON.parse(toolCall.function.arguments)
          });
        }
      }

      return {
        content: text,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
        raw: response.data
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${this.extractErrorMessage(error)}`);
    }
  }

  private async callClaude(
    messages: Message[],
    options: LLMOptions
  ): Promise<LLMResponse> {
    try {
      const payload: Record<string, unknown> = {
        model: options.model || 'claude-3-sonnet-20240229',
        messages: this.normalizeMessages(messages),
        max_tokens: options.maxTokens ?? 1024,
        temperature: options.temperature ?? 0.7
      };

      // Add tools if provided
      if (options.tools && options.tools.length > 0) {
        payload.tools = options.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          input_schema: tool.input_schema || tool.parameters
        }));
      }

      const response = await this.axiosInstance.post('/messages', payload);
      const content = response.data.content;

      let text = '';
      const toolCalls: ToolCall[] = [];

      // Extract text and tool calls from content blocks
      for (const block of content) {
        if (block.type === 'text') {
          text += block.text;
        } else if (block.type === 'tool_use') {
          toolCalls.push({
            id: block.id,
            name: block.name,
            input: block.input
          });
        }
      }

      return {
        content: text,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
        raw: response.data
      };
    } catch (error) {
      throw new Error(`Claude API error: ${this.extractErrorMessage(error)}`);
    }
  }

  private normalizeMessages(messages: Message[]): Message[] {
    return messages.map((msg) => ({
      role: msg.role,
      content: Array.isArray(msg.content)
        ? msg.content
        : msg.content
    }));
  }

  private extractErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.error?.message || error.message;
    }
    return error instanceof Error ? error.message : String(error);
  }

  /**
   * Get the current provider
   */
  getProvider(): LLMProvider {
    return this.provider;
  }
}

// Export singleton instance with auto-detection
let llmClientInstance: LLMClient | null = null;

export function getLLMClient(provider: LLMProvider = 'auto'): LLMClient {
  if (!llmClientInstance) {
    llmClientInstance = new LLMClient(provider);
  }
  return llmClientInstance;
}

// Export class for testing
export { LLMClient };
