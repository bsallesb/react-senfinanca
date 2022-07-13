import { memo, useMemo } from 'react';

import { Table, Stack, Button, Card } from 'react-bootstrap';
import { TbTrashX, TbPencil } from 'react-icons/tb';

import { useTransactions } from 'context/TransactionContext';

import ColoredCurrency from 'components/ColoredCurrency';
import TypeIcon from 'components/TypeIcon';

import { timestampToDate } from 'helpers';

import useWindowSize from 'hooks/useWindowSize';

import {
  TransactionType,
  TRANSACTION_TYPE_EXPENSE,
  TRANSACTION_TYPE_REVENUE,
} from 'types/transaction';

interface ITransactionsTableProps {
  onClickToAddNewTransaction(): void;
  onClickToEditTransaction(transaction: TransactionType): void;
  onClickToDeleteTransaction(transaction: TransactionType): void;
}

const TransactionsTable: React.FC<ITransactionsTableProps> = ({
  onClickToAddNewTransaction,
  onClickToEditTransaction,
  onClickToDeleteTransaction,
}) => {
  const { filteredTransactions } = useTransactions();
  const { width: windowWidth } = useWindowSize();

  const totalValue = useMemo(
    () =>
      filteredTransactions.reduce(
        (total, transaction) =>
          total +
          transaction.value *
            (transaction.type === TRANSACTION_TYPE_REVENUE ? 1 : -1),
        0,
      ),
    [filteredTransactions],
  );

  const tFootSpan = useMemo(
    () => ((windowWidth ?? 0) >= 768 ? 4 : 2),
    [windowWidth],
  );

  return (
    <Card>
      <Card.Body>
        <Table responsive>
          <thead>
            <tr>
              <th className="d-none d-md-table-cell" style={{ width: 120 }}>
                Data
              </th>
              <th className="d-none d-md-table-cell" style={{ width: 60 }}>
                Tipo
              </th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th className="text-end" style={{ width: 175 }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions
              .sort((a, b) => b.created_at - a.created_at)
              .map((transaction) => (
                <tr key={transaction.id}>
                  <td className="d-none d-md-table-cell">
                    {timestampToDate(transaction.created_at)}
                  </td>
                  <td className="d-none d-md-table-cell">
                    <TypeIcon type={transaction.type} />
                  </td>
                  <td>{transaction.title}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <ColoredCurrency
                      value={transaction.value}
                      positive={transaction.type === TRANSACTION_TYPE_REVENUE}
                      negative={transaction.type === TRANSACTION_TYPE_EXPENSE}
                    />
                  </td>
                  <td>
                    <Stack
                      className="justify-content-end"
                      direction="horizontal"
                      gap={2}
                    >
                      <Button
                        variant="light"
                        onClick={() => onClickToEditTransaction(transaction)}
                        title="Editar transação"
                      >
                        <TbPencil size={22} />
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => onClickToDeleteTransaction(transaction)}
                        title="Excluir transação"
                      >
                        <TbTrashX size={22} />
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            {!filteredTransactions.length && (
              <tr>
                <td colSpan={6}>
                  <div className="d-flex py-5">
                    <Stack
                      gap={2}
                      className="mx-auto align-items-center justify-content-center"
                    >
                      <p>Nenhuma transação encontrada</p>
                      <Button
                        variant="primary"
                        onClick={onClickToAddNewTransaction}
                      >
                        Adicionar transação
                      </Button>
                    </Stack>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {filteredTransactions.length > 0 && (
            <tfoot>
              <tr className="fw-bold">
                <td className="text-end" colSpan={tFootSpan}>
                  Total
                </td>
                <td colSpan={2}>
                  <ColoredCurrency value={totalValue} />
                </td>
              </tr>
            </tfoot>
          )}
        </Table>
      </Card.Body>
    </Card>
  );
};

export default memo(TransactionsTable);
