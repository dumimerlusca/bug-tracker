import React, { useEffect, Fragment } from 'react';
import Header from '../components/Header';
import useAuthContext from '../context/auth/AuthContext';

const Home = () => {
  const { loadUser } = useAuthContext();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Header />
      <h1>
        Home page
      </h1>
    </Fragment>
  )
}

export default Home
