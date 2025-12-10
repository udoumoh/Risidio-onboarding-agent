/**
 * Environment variable validation and configuration
 * Ensures all required environment variables are set and properly typed
 */

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export interface Config {
  // Slack configuration (required)
  slack: {
    botToken: string;
    signingSecret: string;
  };

  // LLM configuration (at least one required)
  llm: {
    openaiApiKey: string | undefined;
    anthropicApiKey: string | undefined;
    provider: 'openai' | 'claude' | 'auto';
  };

  // Server configuration (optional)
  port: number;

  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Validate and parse environment variables
 */
function validateEnv(): Config {
  const errors: string[] = [];

  // Validate Slack configuration
  const slackBotToken = process.env.SLACK_BOT_TOKEN;
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

  if (!slackBotToken) {
    errors.push('SLACK_BOT_TOKEN environment variable is required');
  }

  if (!slackSigningSecret) {
    errors.push('SLACK_SIGNING_SECRET environment variable is required');
  }

  // Validate LLM configuration (at least one API key required)
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!openaiApiKey && !anthropicApiKey) {
    errors.push(
      'At least one LLM API key is required: set either OPENAI_API_KEY or ANTHROPIC_API_KEY'
    );
  }

  // If there are validation errors, throw them
  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  // Determine LLM provider
  let llmProvider: 'openai' | 'claude' | 'auto' = 'auto';
  if (openaiApiKey && !anthropicApiKey) {
    llmProvider = 'openai';
  } else if (anthropicApiKey && !openaiApiKey) {
    llmProvider = 'claude';
  }

  // Parse port with default
  const port = parseInt(process.env.PORT || '3000', 10);
  if (isNaN(port)) {
    errors.push('PORT must be a valid number');
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  const nodeEnv = process.env.NODE_ENV || 'development';

  return {
    slack: {
      botToken: slackBotToken as string,
      signingSecret: slackSigningSecret as string
    },
    llm: {
      openaiApiKey: openaiApiKey as string | undefined,
      anthropicApiKey: anthropicApiKey as string | undefined,
      provider: llmProvider
    },
    port,
    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production'
  };
}

// Validate on module load
let config: Config;
try {
  config = validateEnv();
} catch (error) {
  console.error('Failed to load environment configuration:', error);
  process.exit(1);
}

export const getConfig = (): Config => {
  return config;
};

export default config;
