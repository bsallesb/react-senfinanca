import { memo } from 'react';

import { Container } from 'react-bootstrap';

const Header: React.FC = () => (
  <header>
    <Container className="py-3">
      <h1>
        <span className="text-primary">Sen</span>Finança
      </h1>
    </Container>
  </header>
);
export default memo(Header);
