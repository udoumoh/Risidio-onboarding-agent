import { App } from "@slack/bolt";
import dotenv from "dotenv";
import { getConfig } from "./config/env";
import { handleOnboardCommand, handleRoleSelection } from "./slack/commands/onboard";
import { handleNextStepCommand } from "./slack/commands/nextStep";
import { handleAppMention } from "./slack/events/appMention";
import { handleDirectMessage } from "./slack/events/message";

dotenv.config();

// Validate environment variables
const config = getConfig();

// Initialize Slack app
const app = new App({
  token: config.slack.botToken,
  signingSecret: config.slack.signingSecret,
  socketMode: false,
});

console.log("🤖 Risidio Onboarding Buddy initializing...");

// ===== SLASH COMMANDS =====

// /onboard - Start role-based onboarding
app.command("/onboard", async (args) => {
  try {
    await handleOnboardCommand(args);
  } catch (error) {
    console.error("Error in /onboard command:", error);
    await args.ack();
    await args.say("Sorry, something went wrong. Please try again.");
  }
});

// /next-step - Get next onboarding steps
app.command("/next-step", async (args) => {
  try {
    await handleNextStepCommand(args);
  } catch (error) {
    console.error("Error in /next-step command:", error);
    await args.ack();
    await args.say("Sorry, something went wrong. Please try again.");
  }
});

// ===== INTERACTIVE ACTIONS =====

// Handle role selection from /onboard command
app.action(/^onboard_role_/, async (args) => {
  try {
    await handleRoleSelection(args as any);
  } catch (error) {
    console.error("Error in role selection:", error);
    const errorMessage = error instanceof Error ? error.message : '';
    // Only ack if not already acknowledged
    if (!errorMessage.includes('already been acknowledged')) {
      await args.ack();
    }
  }
});

// ===== EVENTS =====

// Handle @mentions in channels
app.event("app_mention", async (args) => {
  try {
    await handleAppMention(args);
  } catch (error) {
    console.error("Error in app_mention event:", error);
  }
});

// Handle direct messages
app.event("message", async (args) => {
  try {
    await handleDirectMessage(args);
  } catch (error) {
    console.error("Error in message event:", error);
  }
});

// Health check
app.event("app_home_opened", async ({ event }) => {
  console.log(`App home opened by user ${event.user}`);
});

// ===== START SERVER =====

(async () => {
  try {
    await app.start(config.port);
    console.log(`⚡ Risidio Onboarding Buddy is running on port ${config.port}!`);
    console.log(`🔑 Using LLM provider: ${config.llm.provider}`);
    console.log(`✅ Ready to help new joiners learn about Risidio and Lunim!`);
  } catch (error) {
    console.error("Failed to start app:", error);
    process.exit(1);
  }
})();
