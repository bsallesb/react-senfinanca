import { memo, useCallback, useState } from 'react';

import { Alert, Button, Container, Stack } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';

import { useTransactions } from 'context/TransactionContext';

import CreateTransactionModal from 'components/CreateTransactionModal';
import DeleteTransactionModal from 'components/DeleteTransactionModal';
import Filters from 'components/Filters';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Summary from 'components/Summary';
import TransactionsTable from 'components/TransactionsTable';
import UpdateTransactionModal from 'components/UpdateTransactionModal';

import { TransactionType } from 'types/transaction';

const Home: React.FC = () => {
  const [showCreateTransactionModal, setShowCreateTransactionModal] =
    useState(false);

  const [transactionToUpdate, setTransactionToUpdate] =
    useState<TransactionType | null>(null);

  const [transactionToDelete, setTransactionToDelete] =
    useState<TransactionType | null>(null);

  const { error } = useTransactions();

  const handleShowCreateTransactionModal = useCallback(
    () => setShowCreateTransactionModal(true),
    [],
  );

  const handleHideCreateTransactionModal = useCallback(
    () => setShowCreateTransactionModal(false),
    [],
  );

  const handleShowUpdateTransactionModal = useCallback(
    (transaction: TransactionType) => setTransactionToUpdate(transaction),
    [],
  );

  const handleHideUpdateTransactionModal = useCallback(
    () => setTransactionToUpdate(null),
    [],
  );

  const handleShowDeleteTransactionModal = useCallback(
    (transaction: TransactionType) => setTransactionToDelete(transaction),
    [],
  );

  const handleHideDeleteTransactionModal = useCallback(
    () => setTransactionToDelete(null),
    [],
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container as="main" className="flex-grow-1">
        <Stack direction="horizontal">
          <Header />
          <div className="text-end ms-auto">
            <Button
              variant="primary"
              onClick={handleShowCreateTransactionModal}
            >
              <span className="d-md-none">
                <TbPlus size={22} />
              </span>
              <span className="d-none d-md-inline">Nova transação</span>
            </Button>
          </div>
        </Stack>

        {error && <Alert variant="danger">{error}</Alert>}

        <div className="mb-4">
          <Summary />
        </div>
        <div className="mb-4">
          <Filters />
        </div>
        <TransactionsTable
          onClickToAddNewTransaction={handleShowCreateTransactionModal}
          onClickToEditTransaction={handleShowUpdateTransactionModal}
          onClickToDeleteTransaction={handleShowDeleteTransactionModal}
        />
        {showCreateTransactionModal && (
          <CreateTransactionModal
            title="Nova transação"
            show
            onHide={handleHideCreateTransactionModal}
          />
        )}
        {transactionToUpdate && (
          <UpdateTransactionModal
            title="Editar transação"
            transaction={transactionToUpdate}
            show
            onHide={handleHideUpdateTransactionModal}
          />
        )}
        {transactionToDelete && (
          <DeleteTransactionModal
            transaction={transactionToDelete}
            show
            onHide={handleHideDeleteTransactionModal}
            onSuccess={handleHideDeleteTransactionModal}
          />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default memo(Home);
