import { memo, useCallback, useMemo } from 'react';

import { Form, Row, Col } from 'react-bootstrap';

import { useTransactions } from 'context/TransactionContext';

import useCategories from 'hooks/useCategories';

import {
  TRANSACTION_TYPE_EXPENSE,
  TRANSACTION_TYPE_REVENUE,
} from 'types/transaction';

const Filters: React.FC = () => {
  const {
    typeFilter,
    categoryFilter,
    applyTypeFilter,
    clearTypeFilter,
    applyCategoryFilter,
    clearCategoryFilter,
  } = useTransactions();

  const { revenueCategories, expenseCategories, categories } = useCategories();

  const categoryList = useMemo(() => {
    if (typeFilter === TRANSACTION_TYPE_REVENUE) return revenueCategories;
    if (typeFilter === TRANSACTION_TYPE_EXPENSE) return expenseCategories;
    return categories;
  }, [categories, expenseCategories, revenueCategories, typeFilter]);

  const handleChangeTransactionType = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
      value
        ? applyTypeFilter(value as 'revenue' | 'expense')
        : clearTypeFilter(),
    [applyTypeFilter, clearTypeFilter],
  );

  const handleChangeCategory = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
      value ? applyCategoryFilter(value) : clearCategoryFilter(),
    [applyCategoryFilter, clearCategoryFilter],
  );

  return (
    <Row className="g-2">
      <Col className="col-12 col-md-6 col-lg-4 col-xl-3">
        <Form.Select value={typeFilter} onChange={handleChangeTransactionType}>
          <option value="">Todas as transações</option>
          <option value={TRANSACTION_TYPE_REVENUE}>Receitas</option>
          <option value={TRANSACTION_TYPE_EXPENSE}>Despesas</option>
        </Form.Select>
      </Col>
      <Col className="col-12 col-md-6 col-lg-4 col-xl-3">
        <Form.Select value={categoryFilter} onChange={handleChangeCategory}>
          <option value="">Todas as categorias</option>
          {categoryList.map((_category) => (
            <option
              key={`${_category.name}-${_category.type}`}
              value={_category.name}
            >
              {_category.name}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  );
};

export default memo(Filters);
