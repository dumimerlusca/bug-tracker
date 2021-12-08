import React, { useState, useEffect } from 'react';
import useAlertContext from '../../context/alert/AlertContext';
import useAuthContext from '../../context/auth/AuthContext';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAlert } = useAlertContext();
  const { login, isAuthenticated, alert, clearAlerts, loading } = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line
  }, [isAuthenticated, loading])

  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }
    // eslint-disable-next-line
  }, [alert])

  const onChange = (e) => {
    switch (e.target.name) {
      case 'email': { setEmail(e.target.value); break }
      case 'password': { setPassword(e.target.value); break }
      default: return
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setAlert({ message: 'Please enter email and password', type: 'danger' });
      return;
    }
    const user = { email, password }
    login(user)
  }

  const loginAsDemoAdmin = () => {
    const user = {
      email: 'adminDemo@gmail.com',
      password: '123456'
    }
    console.log('Login')
    login(user)
  }


  return (
    <form onSubmit={(e) => { onSubmit(e) }} className="form">
      <h1 className="text-3xl font-semibold mb-7 text-center">Login</h1>

      <Alert />

      <div className="mb-2">
        <label htmlFor="email" className="form_label">Email</label>
        <input
          onChange={(e) => { onChange(e) }}
          name="email"
          value={email}
          className="form_input"
          type="email" />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form_label">Password</label>
        <input onChange={(e) => { onChange(e) }}
          name="password"
          value={password}
          className="form_input"
          type="password" />
      </div>
      <div>
        <h3>Login as demo
          <button className="my-3 ml-3 text-blue-600 font-bold
          hover:opacity-75 transition-opacity"
            onClick={loginAsDemoAdmin}
            type="button">
            admin
          </button>
        </h3>
      </div>
      <input type="submit" className="mt-5 py-1 text-center w-full hover:opacity-75 bg-gray-900 text-white" />
    </form>
  )
}

export default Login
