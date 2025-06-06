
export interface Transaction {
  id: string;
  type: 'entrada' | 'saida' | 'meta';
  amount: number;
  description: string;
  category: string;
  tags: string[];
  date: string;
  audioText?: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  description: string;
  createdAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  activeGoals: number;
}
