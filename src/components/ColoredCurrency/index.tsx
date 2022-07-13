import { memo, useMemo } from 'react';

import { formatCurrency } from 'helpers';

interface IColoredCurrencyProps {
  value: number;
  positive?: boolean;
  negative?: boolean;
}

const ColoredCurrency: React.FC<IColoredCurrencyProps> = ({
  value,
  positive = false,
  negative = false,
}) => {
  const formattedValue = useMemo(() => formatCurrency(value), [value]);

  const colorClassName = useMemo(() => {
    if (positive) return 'success';
    if (negative) return 'danger';
    return value > 0 ? 'success' : 'danger';
  }, [value, positive, negative]);

  return <span className={`text-${colorClassName}`}>{formattedValue}</span>;
};

export default memo(ColoredCurrency);
