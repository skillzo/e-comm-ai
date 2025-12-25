interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface LogEntry {
  timestamp: string;
  service: string;
  usage: TokenUsage;
  cost?: {
    promptCost: number;
    completionCost: number;
    total: number;
  };
}

const tokenLogs: LogEntry[] = [];

// Pricing for gpt-3.5-turbo (as of 2024, adjust as needed)
const PRICING = {
  "gpt-3.5-turbo": {
    prompt: 0.0005 / 1000, // $0.0005 per 1K tokens
    completion: 0.0015 / 1000, // $0.0015 per 1K tokens
  },
  "gpt-4": {
    prompt: 0.03 / 1000, // $0.03 per 1K tokens
    completion: 0.06 / 1000, // $0.06 per 1K tokens
  },
  "gpt-4o-mini": {
    prompt: 0.00015 / 1000, // $0.00015 per 1K tokens
    completion: 0.0006 / 1000, // $0.0006 per 1K tokens
  },
  "gpt-4-vision-preview": {
    prompt: 0.01 / 1000, // $0.01 per 1K tokens
    completion: 0.03 / 1000, // $0.03 per 1K tokens
  },
};

/**
 * Log token usage for OpenAI API calls
 */
export function logTokenUsage(
  service: string,
  usage: TokenUsage,
  model: string = "gpt-3.5-turbo"
): void {
  const pricing =
    PRICING[model as keyof typeof PRICING] || PRICING["gpt-3.5-turbo"];

  const promptCost = (usage.promptTokens / 1000) * pricing.prompt;
  const completionCost = (usage.completionTokens / 1000) * pricing.completion;
  const totalCost = promptCost + completionCost;

  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    service,
    usage,
    cost: {
      promptCost,
      completionCost,
      total: totalCost,
    },
  };

  tokenLogs.push(logEntry);

  // Log to console
  console.log(
    `[Token Usage] ${service} - ` +
      `Tokens: ${usage.totalTokens} (${usage.promptTokens} prompt + ${usage.completionTokens} completion) - ` +
      `Cost: $${totalCost.toFixed(6)}`
  );

  // Keep only last 1000 entries to prevent memory issues
  if (tokenLogs.length > 1000) {
    tokenLogs.shift();
  }
}

/**
 * Get token usage statistics
 */
export function getTokenStats(): {
  totalTokens: number;
  totalCost: number;
  byService: Record<string, { tokens: number; cost: number }>;
  recentLogs: LogEntry[];
} {
  const totalTokens = tokenLogs.reduce(
    (sum, log) => sum + log.usage.totalTokens,
    0
  );
  const totalCost = tokenLogs.reduce(
    (sum, log) => sum + (log.cost?.total || 0),
    0
  );

  const byService: Record<string, { tokens: number; cost: number }> = {};
  tokenLogs.forEach((log) => {
    if (!byService[log.service]) {
      byService[log.service] = { tokens: 0, cost: 0 };
    }
    byService[log.service].tokens += log.usage.totalTokens;
    byService[log.service].cost += log.cost?.total || 0;
  });

  return {
    totalTokens,
    totalCost,
    byService,
    recentLogs: tokenLogs.slice(-50), // Last 50 entries
  };
}

/**
 * Clear token logs
 */
export function clearTokenLogs(): void {
  tokenLogs.length = 0;
}
