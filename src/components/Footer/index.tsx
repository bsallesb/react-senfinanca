import { memo } from 'react';

const Footer: React.FC = () => (
  <footer className="p-4 text-center">
    <p className="m-0">
      by{' '}
      <a
        href="https://www.linkedin.com/in/brenosales/"
        target="_blank"
        rel="noreferrer"
      >
        Breno Sales
      </a>
    </p>
  </footer>
);
export default memo(Footer);
