export interface CreateBudget {
  name: string;
  users?: string[];
}

export interface Budget {
  name: string;
  budget_id: string;
  users: string[];
}

export interface Import {
  name: string;
  bucket: string;
  path: string;
  user: string;
  budget: string;
  contentType: string;
  import_id: string;
}
