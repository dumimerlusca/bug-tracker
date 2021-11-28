import React, { useState, useEffect } from 'react'
import useAuthContext from '../../context/auth/AuthContext';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, error, clearErrors, isAuthenticated } = useAuthContext();
  const { setAlert, showAlert } = useAlertContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setAlert(error.message, error.type);
      clearErrors();
    }
  }, [error])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === "" || password.trim() === "" || password2.trim() === "") {
      setAlert('Please fill out all the fields', 'danger')
      return;
    }

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
      return;
    }
    const user = {
      name,
      email,
      password
    }
    register(user);
  }

  const onChange = (target, value) => {
    switch (target.name) {
      case 'name': { setName(value); break }
      case 'email': { setEmail(value); break }
      case 'password': { setPassword(value); break }
      case 'password2': { setPassword2(value); break }
      default: { return }
    }
  }

  return (
    <form onSubmit={(e) => { onSubmit(e) }} className="form">
      <h1 className="text-3xl font-semibold mb-7 text-center">Register</h1>

      {showAlert && <Alert />}

      <div className="mb-2">
        <label htmlFor="name" className="form_label">Name</label>
        <input onChange={(e) => onChange(e.target, e.target.value)} value={name} className="form_input" name="name" id="name" type="text" />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form_label">Email</label>
        <input onChange={(e) => onChange(e.target, e.target.value)} value={email} className="form_input" name="email" id="email" type="text" />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form_label">Password</label>
        <input onChange={(e) => onChange(e.target, e.target.value)} value={password} className="form_input" name="password" id="password" type="password" />
      </div>
      <div className="mb-2">
        <label htmlFor="password2" className="form_label">Confirm password</label>
        <input onChange={(e) => onChange(e.target, e.target.value)} value={password2} className="form_input" name="password2" id="password2" type="password" />
      </div>
      <input type="submit" className="mt-5 py-1 text-center w-full hover:opacity-75 bg-gray-900 text-white" />
    </form>
  )
}

export default Register
