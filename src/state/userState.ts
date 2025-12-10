/**
 * User state management for Slack onboarding agent
 * Stores user information and progress in-memory
 */

export enum UserRole {
  ENGINEER = 'engineer',
  PRODUCT = 'product',
  DESIGN = 'design',
  MANAGER = 'manager',
  OTHER = 'other',
  UNASSIGNED = 'unassigned'
}

export interface UserState {
  userId: string;
  role: UserRole;
  completedTasks: string[];
  onboardingStartDate: Date;
  lastUpdated: Date;
  slackName: string | undefined;
  email: string | undefined;
  department: string | undefined;
  metadata: Record<string, unknown> | undefined;
}

/**
 * In-memory user state storage
 * Maps userId to UserState
 */
class UserStateManager {
  private userStates: Map<string, UserState> = new Map();

  /**
   * Get the state for a specific user
   */
  getUserState(userId: string): UserState | undefined {
    return this.userStates.get(userId);
  }

  /**
   * Create a new user state if it doesn't exist
   */
  initializeUser(userId: string, slackName?: string, email?: string): UserState {
    let userState = this.userStates.get(userId);

    if (!userState) {
      userState = {
        userId,
        role: UserRole.UNASSIGNED,
        completedTasks: [],
        onboardingStartDate: new Date(),
        lastUpdated: new Date(),
        slackName: slackName,
        email: email,
        department: undefined,
        metadata: undefined
      };

      this.userStates.set(userId, userState);
    }

    return userState;
  }

  /**
   * Update user state with new data
   */
  updateUserState(userId: string, updates: Partial<UserState>): UserState {
    let userState = this.userStates.get(userId) || this.initializeUser(userId);

    const updatedState: UserState = {
      ...userState,
      ...updates,
      userId, // Ensure userId is never changed
      lastUpdated: new Date()
    };

    this.userStates.set(userId, updatedState);
    return updatedState;
  }

  /**
   * Set the role for a user
   */
  setUserRole(userId: string, role: UserRole): UserState {
    return this.updateUserState(userId, { role });
  }

  /**
   * Mark a task as completed for a user
   */
  markTaskComplete(userId: string, taskId: string): UserState {
    const userState = this.userStates.get(userId) || this.initializeUser(userId);

    if (!userState.completedTasks.includes(taskId)) {
      userState.completedTasks.push(taskId);
    }

    return this.updateUserState(userId, {
      completedTasks: userState.completedTasks
    });
  }

  /**
   * Mark a task as incomplete for a user
   */
  markTaskIncomplete(userId: string, taskId: string): UserState {
    const userState = this.userStates.get(userId) || this.initializeUser(userId);

    const filteredTasks = userState.completedTasks.filter((id) => id !== taskId);

    return this.updateUserState(userId, {
      completedTasks: filteredTasks
    });
  }

  /**
   * Get the onboarding progress for a user
   */
  getUserProgress(userId: string, totalTasks: number): {
    completedCount: number;
    totalCount: number;
    percentage: number;
    completedTasks: string[];
  } {
    const userState = this.userStates.get(userId);

    if (!userState) {
      return {
        completedCount: 0,
        totalCount: totalTasks,
        percentage: 0,
        completedTasks: []
      };
    }

    const completedCount = userState.completedTasks.length;
    const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    return {
      completedCount,
      totalCount: totalTasks,
      percentage,
      completedTasks: userState.completedTasks
    };
  }

  /**
   * Check if a user has completed a specific task
   */
  hasCompletedTask(userId: string, taskId: string): boolean {
    const userState = this.userStates.get(userId);
    return userState ? userState.completedTasks.includes(taskId) : false;
  }

  /**
   * Get all user states (for debugging or admin purposes)
   */
  getAllUserStates(): UserState[] {
    return Array.from(this.userStates.values());
  }

  /**
   * Clear all state (useful for testing)
   */
  clearAllStates(): void {
    this.userStates.clear();
  }

  /**
   * Delete a specific user's state
   */
  deleteUserState(userId: string): boolean {
    return this.userStates.delete(userId);
  }
}

// Export singleton instance
export const userStateManager = new UserStateManager();

// Export manager class for testing purposes
export { UserStateManager };
