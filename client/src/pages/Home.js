import React, { useEffect } from 'react';
import useAuthContext from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <div>
      <Header />
      Home
    </div>
  )
}

export default Home
