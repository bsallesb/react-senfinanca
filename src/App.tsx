import 'bootstrap/dist/css/bootstrap.min.css';
import { TransactionsProvider } from 'context/TransactionContext';

import Home from 'pages/Home';

import GlobalStyles from 'styles/GlobalStyles';

const App: React.FC = () => (
  <TransactionsProvider>
    <Home />
    <GlobalStyles />
  </TransactionsProvider>
);

export default App;
