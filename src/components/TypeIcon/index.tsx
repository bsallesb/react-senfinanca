import { memo } from 'react';

import { BsBoxArrowInDown, BsBoxArrowUp } from 'react-icons/bs';

import { TRANSACTION_TYPE_REVENUE } from 'types/transaction';

interface ITypeIconProps {
  type: 'revenue' | 'expense';
}

const TypeIcon: React.FC<ITypeIconProps> = ({ type }) => {
  return type === TRANSACTION_TYPE_REVENUE ? (
    <BsBoxArrowInDown size={22} color="green" />
  ) : (
    <BsBoxArrowUp size={22} color="red" />
  );
};

export default memo(TypeIcon);
