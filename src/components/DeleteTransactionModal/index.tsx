import { memo, useCallback } from 'react';

import { Button, Col, Modal, Row, Stack } from 'react-bootstrap';

import { useTransactions } from 'context/TransactionContext';

import ColoredCurrency from 'components/ColoredCurrency';

import { timestampToDate } from 'helpers';

import {
  TransactionType,
  TRANSACTION_TYPE_EXPENSE,
  TRANSACTION_TYPE_REVENUE,
} from 'types/transaction';

interface IDeleteTransactionModalProps {
  transaction: TransactionType;
  show: boolean;
  onSuccess(): void;
  onHide(): void;
}

const DeleteTransactionModal: React.FC<IDeleteTransactionModalProps> = ({
  transaction,
  show,
  onHide,
  onSuccess,
}) => {
  const { deleteTransaction } = useTransactions();

  const handleDeleteTransaction = useCallback(() => {
    deleteTransaction(transaction?.id);
    onSuccess();
  }, [deleteTransaction, onSuccess, transaction?.id]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <h2 className="fs-4 mb-4">
          Exlcuir{' '}
          {transaction.type === TRANSACTION_TYPE_REVENUE
            ? 'receita'
            : 'despesa'}
        </h2>
        <Row className="row-cols-2 g-3 mb-4">
          <Col>
            <h3 className="fs-7 fw-normal text-muted">Título</h3>
            <p>{transaction.title}</p>
          </Col>
          <Col>
            <h3 className="fs-7 fw-normal text-muted">Valor</h3>
            <p>
              <ColoredCurrency
                value={transaction.value}
                positive={transaction.type === TRANSACTION_TYPE_REVENUE}
                negative={transaction.type === TRANSACTION_TYPE_EXPENSE}
              />
            </p>
          </Col>
          <Col>
            <h3 className="fs-7 fw-normal text-muted">Categoria</h3>
            <p>{transaction.category}</p>
          </Col>
          <Col>
            <h3 className="fs-7 fw-normal text-muted">Data</h3>
            <p>{timestampToDate(transaction.created_at)}</p>
          </Col>
        </Row>
        <Stack className="justify-content-end" direction="horizontal" gap={3}>
          <Button variant="none" onClick={onHide}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDeleteTransaction}
          >
            Excluir
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default memo(DeleteTransactionModal);
