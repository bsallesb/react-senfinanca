import { useMemo } from 'react';

import { CategoryType } from 'types/category';

import {
  TRANSACTION_TYPE_EXPENSE,
  TRANSACTION_TYPE_REVENUE,
} from '../types/transaction';

type UseCategoriesType = () => {
  categories: CategoryType[];
  revenueCategories: CategoryType[];
  expenseCategories: CategoryType[];
};

const categories = [
  // Expense categories
  { name: 'Alimentação', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Educação', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Impostos', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Lazer', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Moradia', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Outras despesas', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Presentes', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Roupa', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Saúde', type: TRANSACTION_TYPE_EXPENSE },
  { name: 'Transporte', type: TRANSACTION_TYPE_EXPENSE },

  // Revenue categories
  { name: 'Salário', type: TRANSACTION_TYPE_REVENUE },
  { name: 'Outras receitas', type: TRANSACTION_TYPE_REVENUE },
] as CategoryType[];

const useCategories: UseCategoriesType = () => {
  return useMemo(
    () => ({
      categories: categories.sort((a, b) => (b.name > a.name ? -1 : 1)),
      revenueCategories: categories.filter(
        (category) => category.type === TRANSACTION_TYPE_REVENUE,
      ),
      expenseCategories: categories.filter(
        (category) => category.type === TRANSACTION_TYPE_EXPENSE,
      ),
    }),
    [],
  );
};

export default useCategories;
