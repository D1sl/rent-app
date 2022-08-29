import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    </ApolloProvider>


  );
}

export default App;
