import React, { useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Use effect');
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (accessToken === 'null') {
      console.log('navigate');
      navigate('/login')
    }
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
