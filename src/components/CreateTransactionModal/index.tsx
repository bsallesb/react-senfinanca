import { memo } from 'react';

import { Modal } from 'react-bootstrap';

import TransactionForm from 'components/TransactionForm';

interface ICreateTransactionModalProps {
  title: string;
  show: boolean;
  onHide(): void;
}

const CreateTransactionModal: React.FC<ICreateTransactionModalProps> = ({
  title,
  show,
  onHide,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body>
        <h2 className="fs-4 mb-4">{title}</h2>
        <TransactionForm onSuccess={onHide} onCancel={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default memo(CreateTransactionModal);
