import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './App.css';
import { UserList } from './components/UserList';
import GlobalState from './context/GlobalState';

library.add(fab, faCheck, faTimes);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalState>
        <div className='App'>
          <header className='App-header'>
            <UserList />
          </header>
        </div>
      </GlobalState>
    </ApolloProvider>
  );
}

export default App;
