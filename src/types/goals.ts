export type GoalKey = "long" | "short" | "daily";

export type GoalLabel = "Long-term" | "Short-term" | "Daily";

export type ActiveGoalsData = {
  long: string | null;
  short: string | null;
  daily: string | null;
};

export type GoalItem = {
  id: GoalKey;
  label: GoalLabel;
  value: string;
  draft?: string;
  editing?: boolean;
  completing?: boolean;
  highlightText?: boolean;
};
