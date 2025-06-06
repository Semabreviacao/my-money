
import { useLocalStorage } from './useLocalStorage';
import { Transaction, Goal, FinancialSummary } from '../types/transaction';

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('mm-transactions', []);
  const [goals, setGoals] = useLocalStorage<Goal[]>('mm-goals', []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const getSummary = (): FinancialSummary => {
    const totalIncome = transactions
      .filter(t => t.type === 'entrada')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'saida')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      activeGoals: goals.length,
    };
  };

  const filterTransactions = (filters: {
    type?: string;
    period?: string;
    tags?: string[];
  }) => {
    return transactions.filter(transaction => {
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.tags && !filters.tags.some(tag => transaction.tags.includes(tag))) return false;
      
      if (filters.period) {
        const now = new Date();
        const transactionDate = new Date(transaction.date);
        
        switch (filters.period) {
          case 'hoje':
            return transactionDate.toDateString() === now.toDateString();
          case 'semana':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return transactionDate >= weekAgo;
          default:
            return true;
        }
      }
      
      return true;
    });
  };

  return {
    transactions,
    goals,
    addTransaction,
    addGoal,
    getSummary,
    filterTransactions,
  };
}
