import React, { useState, useEffect } from 'react';
import useAlertContext from '../../context/alert/AlertContext';
import useAuthContext from '../../context/auth/AuthContext';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAlert, showAlert } = useAlertContext();
  const { login, isAuthenticated, error, clearErrors } = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (error) {
      setAlert(error.message, error.type);
      clearErrors();
    }
  }, [error])

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
      setAlert('Please enter email and password', 'danger');
      return;
    }
    const user = { email, password }
    login(user)
  }


  return (
    <form onSubmit={(e) => { onSubmit(e) }} className="w-100 bg-red px-2" style={{ maxWidth: '500px' }}>
      <h1>Login</h1>

      {showAlert && <Alert />}

      <div className="mb-2">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          onChange={(e) => { onChange(e) }}
          name="email"
          value={email}
          className="form-control"
          type="email" />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">Password</label>
        <input onChange={(e) => { onChange(e) }}
          name="password"
          value={password}
          className="form-control"
          type="password" />
      </div>
      <input type="submit" className="btn btn-secondary mt-3" />
    </form>
  )
}

export default Login
