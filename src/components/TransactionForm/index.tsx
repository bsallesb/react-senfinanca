import { memo, useCallback, useMemo } from 'react';

import { Button, Form, Stack } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { FormProvider, useForm } from 'react-hook-form';

import { useTransactions } from 'context/TransactionContext';

import { currencyToFloat, floatToLocaleDecimal } from 'helpers';

import useCategories from 'hooks/useCategories';

import {
  TransactionType,
  TRANSACTION_TYPE_EXPENSE,
  TRANSACTION_TYPE_REVENUE,
} from '../../types/transaction';
import { TransactionFormDataType } from '../../types/transactionFormData';

interface ITransactionFormProps {
  transaction?: TransactionType;
  onSuccess(): void;
  onCancel(): void;
}

const TransactionForm: React.FC<ITransactionFormProps> = ({
  transaction,
  onSuccess,
  onCancel,
}) => {
  const defaultFormValues = useMemo(
    () =>
      transaction
        ? { ...transaction, value: floatToLocaleDecimal(transaction.value) }
        : {
            title: '',
            type: TRANSACTION_TYPE_REVENUE,
            value: '',
            category: '',
          },
    [transaction],
  );

  const methods = useForm<TransactionFormDataType>({
    defaultValues: defaultFormValues,
  });

  const { handleSubmit, register, watch, reset } = methods;
  const { revenueCategories, expenseCategories } = useCategories();
  const { createTransaction, updateTransaction } = useTransactions();

  const type = watch('type');

  const categories = useMemo(
    () =>
      type === TRANSACTION_TYPE_REVENUE ? revenueCategories : expenseCategories,
    [expenseCategories, revenueCategories, type],
  );

  const handleCreateTransaction = useCallback(
    (data: TransactionFormDataType) => {
      if (
        createTransaction({
          ...data,
          value: currencyToFloat(data.value),
        } as Partial<TransactionType>)
      ) {
        onSuccess();
        reset(defaultFormValues);
      }
    },
    [createTransaction, defaultFormValues, onSuccess, reset],
  );

  const handleUpdateTransaction = useCallback(
    (data: TransactionFormDataType) => {
      if (
        updateTransaction({
          ...data,
          value: currencyToFloat(data.value),
        } as TransactionType)
      ) {
        onSuccess();
        reset(defaultFormValues);
      }
    },
    [defaultFormValues, onSuccess, reset, updateTransaction],
  );

  const onSubmit = useCallback(
    (data: TransactionFormDataType) =>
      (data.id ? handleUpdateTransaction : handleCreateTransaction)(data),
    [handleCreateTransaction, handleUpdateTransaction],
  );

  const handleCancel = useCallback(() => {
    reset(defaultFormValues);
    onCancel();
  }, [defaultFormValues, onCancel, reset]);

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {transaction && (
          <input type="hidden" value={transaction.id} {...register('id')} />
        )}
        <Form.Group className="mb-3">
          <Form.Check
            inline
            label="Receita"
            type="radio"
            value={TRANSACTION_TYPE_REVENUE}
            {...register('type')}
          />
          <Form.Check
            inline
            label="Despesa"
            type="radio"
            value={TRANSACTION_TYPE_EXPENSE}
            {...register('type')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Título"
            autoFocus
            required
            {...register('title')}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select required {...register('category')}>
            <option value="">Categoria</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <CurrencyInput
            className="form-control"
            required
            placeholder="Valor"
            decimalsLimit={2}
            allowNegativeValue={false}
            decimalSeparator=","
            groupSeparator="."
            {...register('value')}
          />
        </Form.Group>
        <Form.Group>
          <Stack className="justify-content-end" direction="horizontal" gap={3}>
            <Button variant="none" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="success">
              Salvar
            </Button>
          </Stack>
        </Form.Group>
      </Form>
    </FormProvider>
  );
};

export default memo(TransactionForm);
