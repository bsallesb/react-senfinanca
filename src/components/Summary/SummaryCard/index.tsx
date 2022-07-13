import { memo } from 'react';

import { Card } from 'react-bootstrap';

import ColoredCurrency from 'components/ColoredCurrency';

interface ISummaryCardProps {
  title: string;
  value: number;
  positive?: boolean;
  negative?: boolean;
}

const SummaryCard: React.FC<ISummaryCardProps> = ({
  title,
  value,
  positive = false,
  negative = false,
}) => {
  return (
    <Card className="d-flex w-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{title}</Card.Title>
        <p className="text-center fs-2 m-0 mt-auto">
          <ColoredCurrency
            value={value}
            positive={positive}
            negative={negative}
          />
        </p>
      </Card.Body>
    </Card>
  );
};

export default memo(SummaryCard);
