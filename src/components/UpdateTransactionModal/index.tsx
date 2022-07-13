import { memo } from 'react';

import { Modal } from 'react-bootstrap';

import TransactionForm from 'components/TransactionForm';

import { TransactionType } from '../../types/transaction';

interface IUpdateTransactionModalProps {
  title: string;
  transaction: TransactionType;
  show: boolean;
  onHide(): void;
}

const UpdateTransactionModal: React.FC<IUpdateTransactionModalProps> = ({
  title,
  transaction,
  show,
  onHide,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <h2 className="fs-4 mb-4">{title}</h2>
        <TransactionForm
          transaction={transaction}
          onSuccess={onHide}
          onCancel={onHide}
        />
      </Modal.Body>
    </Modal>
  );
};

export default memo(UpdateTransactionModal);
