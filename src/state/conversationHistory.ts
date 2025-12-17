/**
 * Conversation history manager
 * Tracks conversation history per user for context-aware responses
 */

import type { Message } from '../utils/llmClient';

interface ConversationHistory {
  userId: string;
  messages: Message[];
  lastUpdated: Date;
}

class ConversationHistoryManager {
  private histories: Map<string, ConversationHistory> = new Map();
  private readonly maxMessagesPerUser = 20; // Keep last 20 messages
  private readonly historyTTL = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Get conversation history for a user
   */
  getHistory(userId: string): Message[] {
    const history = this.histories.get(userId);

    if (!history) {
      return [];
    }

    // Clean up old history
    if (Date.now() - history.lastUpdated.getTime() > this.historyTTL) {
      this.histories.delete(userId);
      return [];
    }

    return history.messages;
  }

  /**
   * Add a message to user's conversation history
   */
  addMessage(userId: string, message: Message): void {
    let history = this.histories.get(userId);

    if (!history) {
      history = {
        userId,
        messages: [],
        lastUpdated: new Date()
      };
      this.histories.set(userId, history);
    }

    // Add message
    history.messages.push(message);
    history.lastUpdated = new Date();

    // Trim to max messages (keep recent ones)
    if (history.messages.length > this.maxMessagesPerUser) {
      history.messages = history.messages.slice(-this.maxMessagesPerUser);
    }
  }

  /**
   * Clear conversation history for a user
   */
  clearHistory(userId: string): void {
    this.histories.delete(userId);
  }

  /**
   * Clear all old histories (cleanup task)
   */
  cleanupOldHistories(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    for (const [userId, history] of this.histories.entries()) {
      if (now - history.lastUpdated.getTime() > this.historyTTL) {
        toDelete.push(userId);
      }
    }

    toDelete.forEach(userId => this.histories.delete(userId));

    if (toDelete.length > 0) {
      console.log(`Cleaned up ${toDelete.length} old conversation histories`);
    }
  }

  /**
   * Get stats about conversation histories
   */
  getStats(): { totalUsers: number; totalMessages: number } {
    let totalMessages = 0;

    for (const history of this.histories.values()) {
      totalMessages += history.messages.length;
    }

    return {
      totalUsers: this.histories.size,
      totalMessages
    };
  }
}

// Singleton instance
export const conversationHistoryManager = new ConversationHistoryManager();

// Run cleanup every hour
setInterval(() => {
  conversationHistoryManager.cleanupOldHistories();
}, 60 * 60 * 1000);
