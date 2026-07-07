export type AssistantRole = "user" | "assistant" | "system";

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  timestamp: string;
}

export interface AssistantContext {
  dashboard_summary?: string;
  recent_alerts?: string[];
  active_route?: string;
}
