import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile'
import SingleProperty from './pages/SingleProperty';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='page-container'>
            <Header />
          <div className='spacer'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<SingleProperty />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
            <Footer />
        </div>
      </Router>
    </ApolloProvider>


  );
}

export default App;
