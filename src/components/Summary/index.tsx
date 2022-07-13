import { memo } from 'react';

import { Col, Row, Table, Card } from 'react-bootstrap';

import { useTransactions } from 'context/TransactionContext';

import ColoredCurrency from 'components/ColoredCurrency';

import SummaryCard from './SummaryCard';

const Summary: React.FC = () => {
  const { totalBalance, totalRevenue, totalExpense } = useTransactions();

  return (
    <>
      <Row className="g-3 d-none d-lg-flex">
        <Col className="d-flex col-12 col-lg-4">
          <SummaryCard title="Saldo total" value={totalBalance} />
        </Col>
        <Col className="d-flex col-12 col-md-6 col-lg-4">
          <SummaryCard
            title="Total de receitas"
            value={totalRevenue}
            positive
          />
        </Col>
        <Col className="d-flex col-12 col-md-6 col-lg-4">
          <SummaryCard
            title="Total de despesas"
            value={totalExpense}
            negative
          />
        </Col>
      </Row>
      <Card className="d-lg-none">
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Saldo total</th>
                <th>Receitas</th>
                <th>Despesas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ColoredCurrency value={totalBalance} />
                </td>
                <td>
                  <ColoredCurrency value={totalRevenue} positive />
                </td>
                <td>
                  <ColoredCurrency value={totalExpense} negative />
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default memo(Summary);
