import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Popup from './components/Popup';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile'
import SingleProperty from './pages/SingleProperty';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewProperty from './pages/NewProperty';
import Home2 from './pages/Home2';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Popup />
      <Router>
        <div className='page-container'>
          <Header />
          <div className='spacer'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<SingleProperty />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/Home2" element={<Home2 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/list-your-property" element={<NewProperty />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider >


  );
}

export default App;
