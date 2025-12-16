# Risidio Onboarding Buddy

An AI-powered Slack bot that provides intelligent, role-based onboarding assistance for new team members joining Risidio and Lunim. The bot uses large language models (OpenAI GPT or Anthropic Claude) to deliver personalized onboarding guidance, answer frequently asked questions, and guide new joiners through their first days.

## Features

- **AI-Powered Responses**: Uses OpenAI GPT or Anthropic Claude to provide intelligent, context-aware answers
- **Semantic Search (RAG)**: Search through custom Notion docs and Slack history using vector embeddings
- **Role-Based Onboarding**: Customized onboarding paths for different team roles (Engineering, Product, Design, Sales, etc.)
- **Interactive Commands**: Easy-to-use Slack slash commands for onboarding guidance
- **Step-by-Step Guidance**: Progressive onboarding with the `/next-step` command
- **FAQ Support**: Quick answers to frequently asked questions about Risidio and Lunim
- **Direct Messages**: Respond to direct messages with personalized assistance
- **App Mentions**: Respond to mentions in channels for team-wide help
- **User State Tracking**: Remembers user onboarding progress
- **Flexible LLM Support**: Works with either OpenAI or Anthropic APIs (or both)

## Prerequisites

- **Node.js** 18+ and npm 9+
- **Slack Workspace** with admin access to create/manage apps
- **API Keys** for at least one LLM provider:
  - OpenAI API key (for GPT models) - get at https://platform.openai.com/api-keys
  - Anthropic API key (for Claude models) - get at https://console.anthropic.com/

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd lunim-onboarding-agent
npm install
```

### 2. Create Slack App

1. Go to https://api.slack.com/apps
2. Click "Create New App" > "From scratch"
3. Name: "Risidio Onboarding Buddy"
4. Select your workspace
5. Go to "OAuth & Permissions" in the left sidebar
6. Under "Scopes", add these bot token scopes:
   - `app_mentions:read`
   - `chat:write`
   - `commands`
   - `im:history`
   - `im:read`
   - `im:write`
   - `users:read`
7. Click "Install to Workspace"
8. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```bash
   SLACK_BOT_TOKEN=xoxb-your-token-here
   SLACK_SIGNING_SECRET=your-signing-secret
   OPENAI_API_KEY=sk-proj-your-key-here
   PORT=3000
   NODE_ENV=development
   ```

### 4. Set Up Slack App Signing Secret

1. In your Slack app settings, go to "Basic Information"
2. Scroll to "App Credentials" and copy the **Signing Secret**
3. Paste it into your `.env` file as `SLACK_SIGNING_SECRET`

### 5. Configure Slack Event Subscriptions

1. In your Slack app, go to "Event Subscriptions"
2. Enable "Events"
3. Set the Request URL to: `https://your-domain.com/slack/events` (for production)
4. Subscribe to these bot events:
   - `app_mention`
   - `message.im`
5. Save changes

### 6. Add Slash Commands

1. In your Slack app, go to "Slash Commands"
2. Click "Create New Command"
3. Create `/onboard`:
   - Command: `/onboard`
   - Request URL: `https://your-domain.com/slack/commands` (for production)
   - Short Description: "Start your onboarding journey"
   - Usage Hint: `[role]`
4. Create `/next-step`:
   - Command: `/next-step`
   - Request URL: `https://your-domain.com/slack/commands` (for production)
   - Short Description: "Get your next onboarding step"
   - Usage Hint: `[topic]`

### 7. Configure Interactive Components (if needed)

1. In your Slack app, go to "Interactivity & Shortcuts"
2. Enable "Interactivity"
3. Set Request URL to: `https://your-domain.com/slack/interactivity` (for production)

## Environment Variables

### Required

- **SLACK_BOT_TOKEN**: Your Slack bot's OAuth token (starts with `xoxb-`)
  - Get from Slack app > OAuth & Permissions > Bot User OAuth Token

- **SLACK_SIGNING_SECRET**: Secret for verifying Slack requests
  - Get from Slack app > Basic Information > App Credentials > Signing Secret

### LLM Configuration (At least one required)

- **OPENAI_API_KEY**: (Optional) OpenAI API key for GPT models
  - Get from https://platform.openai.com/api-keys
  - Only set if using OpenAI

- **ANTHROPIC_API_KEY**: (Optional) Anthropic API key for Claude models
  - Get from https://console.anthropic.com/
  - Only set if using Anthropic

### Optional

- **PORT**: Server port (default: 3000)

- **NODE_ENV**: Environment mode (development or production, default: development)

## How to Run

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

This runs the bot with nodemon, which automatically restarts on file changes.

### Production Build

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Type Checking

Check for TypeScript errors without building:

```bash
npm run type-check
```

## Available Commands

### `/onboard [role]`

Initiates the onboarding process for a new team member.

**Usage:**
```
/onboard engineering
/onboard product
/onboard design
/onboard sales
```

**What it does:**
- Greets the new team member
- Presents a role selection menu if no role is specified
- Provides role-specific onboarding content
- Sets up user state for progress tracking

### `/next-step [topic]`

Gets the next recommended onboarding step.

**Usage:**
```
/next-step
/next-step setup
/next-step documentation
```

**What it does:**
- Shows the next recommended onboarding task
- Provides specific guidance for that step
- Tracks progress through onboarding checklist
- Offers links to relevant resources

## RAG System (Semantic Search)

The bot includes a Retrieval Augmented Generation (RAG) system that enables semantic search through your company's custom documentation.

### 🚀 Quick Setup

1. **Create your knowledge base file:**
   ```bash
   cp knowledge-base.example.json knowledge-base.json
   ```

2. **Add your content** (Notion docs, Slack history, etc.) to `knowledge-base.json`

3. **Ingest documents:**
   ```bash
   npm run ingest knowledge-base.json
   ```

4. **Test it out!** Ask the bot questions about your custom content

### How It Works

- Documents are split into chunks and converted to vector embeddings
- When users ask questions, the bot searches for semantically similar content
- The agent automatically decides when to use standard FAQs vs. custom knowledge base
- Works with any text content: Notion docs, Slack messages, wikis, etc.

### Commands

```bash
# Ingest documents
npm run ingest knowledge-base.json

# View stats
npm run ingest --stats

# Clear vector store
npm run ingest --clear
```

### 📚 Documentation

For detailed setup instructions, see:
- **[RAG-SETUP-GUIDE.md](RAG-SETUP-GUIDE.md)** - Complete usage guide
- **[RAG-SETUP-COMPLETE.md](RAG-SETUP-COMPLETE.md)** - Quick reference

### Cost

Embeddings cost ~$0.0001 per 1,000 tokens. A typical 50-page knowledge base costs $0.20-$0.50 one-time.

## Project Structure

```
lunim-onboarding-agent/
├── src/
│   ├── index.ts                    # Main Slack app initialization and event handlers
│   ├── config/
│   │   └── env.ts                  # Environment variable validation and configuration
│   ├── slack/
│   │   ├── commands/
│   │   │   ├── onboard.ts          # /onboard command handler
│   │   │   └── nextStep.ts         # /next-step command handler
│   │   └── events/
│   │       ├── appMention.ts       # @mention event handler
│   │       └── message.ts          # Direct message event handler
│   ├── agent/
│   │   ├── handleAgentMessage.ts   # LLM message processing
│   │   ├── systemPrompt.ts         # System prompts for LLM
│   │   └── tools.ts                # LLM tool definitions (includes RAG search)
│   ├── state/
│   │   └── userState.ts            # User progress and state tracking
│   ├── data/
│   │   ├── checklists.ts           # Onboarding checklists by role
│   │   ├── faqs.ts                 # FAQ database
│   │   ├── missionAndValues.ts     # Company mission and values
│   │   └── faq.ts                  # Legacy FAQ file
│   ├── utils/
│   │   ├── llmClient.ts            # LLM API client (OpenAI/Anthropic)
│   │   ├── embeddings.ts           # OpenAI embeddings client
│   │   └── vectorStore.ts          # Vector database for RAG
│   └── scripts/
│       └── ingestDocuments.ts      # Document ingestion script
├── data/                           # Generated by ingestion (gitignored)
│   └── vector-store.json           # Vector embeddings database
├── knowledge-base.json             # Your custom documentation (gitignored)
├── knowledge-base.example.json     # Example template for knowledge base
├── RAG-SETUP-GUIDE.md             # RAG system usage guide
├── RAG-SETUP-COMPLETE.md          # RAG setup summary
├── .env                            # Environment variables (local, not in git)
├── .env.example                    # Example environment variables (for documentation)
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Development Workflow

1. **Make Changes**: Edit TypeScript files in `src/`
2. **Auto Reload**: `npm run dev` automatically restarts the bot
3. **Type Safety**: TypeScript ensures type correctness
4. **Build**: `npm run build` compiles TypeScript to JavaScript in `dist/`
5. **Deploy**: Run `npm start` in production to serve the compiled code

## Slack App Setup Summary

| Component | Setting | Notes |
|-----------|---------|-------|
| Token | Bot User OAuth Token | Starts with `xoxb-` |
| Secret | Signing Secret | Under Basic Information |
| Scopes | `app_mentions:read`, `chat:write`, `commands`, `im:*`, `users:read` | Required for functionality |
| Events | `app_mention`, `message.im` | For responding to mentions and DMs |
| Commands | `/onboard`, `/next-step` | Slash command endpoints |
| URL Base | `https://your-domain.com` | Replace with actual domain |

## Troubleshooting

### Bot Not Responding
- Check that the bot is running: `npm run dev` or `npm start`
- Verify `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET` are correct
- Check Slack app permissions (ensure all required scopes are granted)
- Look for error messages in console output

### LLM Not Working
- Ensure at least one API key is set (`OPENAI_API_KEY` or `ANTHROPIC_API_KEY`)
- Check that API keys are valid and have appropriate permissions
- Verify API quotas/limits haven't been exceeded
- Check network connectivity to API endpoints

### Port Already in Use
- Change the `PORT` environment variable to an available port
- Or kill the process using the current port

### TypeScript Errors
- Run `npm run type-check` to identify issues
- Ensure TypeScript version matches `tsconfig.json` settings
- Check that all dependencies have type definitions

## Contributing

1. Follow the existing code style
2. Ensure TypeScript type safety (`npm run type-check`)
3. Test changes with `npm run dev`
4. Build before committing (`npm run build`)

## License

ISC

## Support

For issues or questions about setting up the bot, check:
- Slack API documentation: https://api.slack.com/
- TypeScript documentation: https://www.typescriptlang.org/
- Slack Bolt documentation: https://slack.dev/bolt-js/
- OpenAI API docs: https://platform.openai.com/docs/
- Anthropic API docs: https://docs.anthropic.com/
