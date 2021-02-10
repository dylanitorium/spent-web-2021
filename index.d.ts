interface CreateBudget {
  name: string;
  users?: string[];
}

interface Budget {
  name: string;
  budget_id: string;
  users: string[];
}