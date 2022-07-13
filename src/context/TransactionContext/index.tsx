import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { v4 as generateUuidV4 } from 'uuid';

import useStoredState from 'hooks/useStoredState';

import {
  TransactionType,
  TRANSACTION_TYPE_EXPENSE,
  TRANSACTION_TYPE_REVENUE,
} from '../../types/transaction';

interface IContextProps {
  transactions: TransactionType[];
  filteredTransactions: TransactionType[];
  totalBalance: number;
  totalRevenue: number;
  totalExpense: number;
  typeFilter?: 'revenue' | 'expense';
  categoryFilter?: string;
  error: string | null;
  createTransaction(
    transaction: Partial<TransactionType>,
  ): TransactionType | null;
  updateTransaction(transaction: TransactionType): TransactionType | null;
  deleteTransaction(id: string): boolean;
  applyTypeFilter(type: 'revenue' | 'expense'): void;
  clearTypeFilter(): void;
  applyCategoryFilter(category: string): void;
  clearCategoryFilter(): void;
}

export const ReactContext = createContext<IContextProps>({} as IContextProps);

export const TransactionsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [transactions, setTransactions] = useStoredState<TransactionType[]>(
    '@senfinanca/transactions',
    [],
  );

  const [typeFilter, setTypeFilter] = useState<
    'revenue' | 'expense' | undefined
  >(undefined);

  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined,
  );

  const [error, setError] = useState<string | null>(null);

  const totalBalance = useMemo(
    () =>
      transactions.reduce(
        (total, transaction) =>
          total +
          transaction.value *
            (transaction.type === TRANSACTION_TYPE_REVENUE ? 1 : -1),
        0,
      ),
    [transactions],
  );

  const totalRevenue = useMemo(
    () =>
      transactions
        .filter((t) => t.type === TRANSACTION_TYPE_REVENUE)
        .reduce((total, transaction) => total + transaction.value, 0),
    [transactions],
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === TRANSACTION_TYPE_EXPENSE)
        .reduce((total, transaction) => total + transaction.value, 0),
    [transactions],
  );

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => (typeFilter ? t.type === typeFilter : true))
      .filter((t) => (categoryFilter ? t.category === categoryFilter : true));
  }, [categoryFilter, transactions, typeFilter]);

  const createTransaction = useCallback(
    (_transaction: Partial<TransactionType>) => {
      setError(null);
      try {
        const newTransactions = [
          ...transactions,
          {
            id: generateUuidV4(),
            ..._transaction,
            created_at: new Date().getTime(),
          },
        ];

        setTransactions(newTransactions as TransactionType[]);

        return newTransactions[newTransactions.length - 1] as TransactionType;
      } catch (e) {
        setError('Houve um erro ao criar a transação');
        return null;
      }
    },
    [setTransactions, transactions],
  );

  const updateTransaction = useCallback(
    (_transaction: TransactionType) => {
      setError(null);
      try {
        setTransactions(
          transactions.map((t) =>
            t.id === _transaction.id ? _transaction : t,
          ) as TransactionType[],
        );

        return _transaction as TransactionType;
      } catch (e) {
        setError('Houve um erro ao editar a transação');
        return null;
      }
    },
    [setTransactions, transactions],
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      setError(null);
      try {
        setTransactions(transactions.filter((t) => t.id !== id));

        return true;
      } catch (e) {
        setError('Houve um erro ao excluir a transação');
        return false;
      }
    },
    [setTransactions, transactions],
  );

  const applyTypeFilter = useCallback(
    (type: 'revenue' | 'expense') => setTypeFilter(type),
    [],
  );

  const clearTypeFilter = useCallback(() => setTypeFilter(undefined), []);

  const applyCategoryFilter = useCallback(
    (category: string) => setCategoryFilter(category),
    [],
  );

  const clearCategoryFilter = useCallback(
    () => setCategoryFilter(undefined),
    [],
  );

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          transactions,
          filteredTransactions,
          typeFilter,
          categoryFilter,
          totalBalance,
          totalRevenue,
          totalExpense,
          error,
          createTransaction,
          updateTransaction,
          deleteTransaction,
          applyTypeFilter,
          clearTypeFilter,
          applyCategoryFilter,
          clearCategoryFilter,
        }),
        [
          transactions,
          filteredTransactions,
          typeFilter,
          categoryFilter,
          totalBalance,
          totalRevenue,
          totalExpense,
          error,
          createTransaction,
          updateTransaction,
          deleteTransaction,
          applyTypeFilter,
          clearTypeFilter,
          applyCategoryFilter,
          clearCategoryFilter,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  );
};

export const useTransactions = (): IContextProps => {
  const context = useContext(ReactContext);

  if (!context) {
    throw new Error('useTransactions must be within TransactionsProvider');
  }

  return context;
};
