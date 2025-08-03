import { ApolloProvider } from '@apollo/client';
import AppRoutes from './AppRoutes';
import client from './lib/apollo';
import './lib/i18n';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  );
}

export default App;
