export interface CreateBudget {
  name: string;
  users?: string[];
}

export interface Budget {
  name: string;
  budget_id: string;
  users: string[];
}