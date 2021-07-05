import React from 'react';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

import './App.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com'
});

const COUNTRIES_LIST = gql`
  {
    countries {
      code
      continent {
        name
      }
      emoji
      name
    }
  continents {
    name
  }
}
`;

const App = () => {
  const { data, loading, error } = useQuery(COUNTRIES_LIST, {client});
  console.log(data, loading, error);
  if (error) throw new Error(`${error.message}`)
  return (
    <>
      <h1>App</h1>
    </>
  );
}

export default App;
