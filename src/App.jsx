import React from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

import './App.css';

import Header from './components/Header';
import TableContent from './components/Table';
import Spinner from './components/Spinner';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://countries.trevorblades.com',
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
  const { data, loading, error } = useQuery(COUNTRIES_LIST, { client });

  if (error) throw new Error(`${error.message}`);
  return (
    <div className="main-wrapper">
      <Header />
      {data && !loading ? (
        <TableContent countriesData={data.countries} continentsData={data.continents} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default App;
