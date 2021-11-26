import React, { Fragment, useState } from 'react';
import Header from '../components/Header';
import useAuthContext from '../context/auth/AuthContext';
import useAlertContext from '../context/alert/AlertContext';
import Alert from '../components/Alert';

const Register = () => {
  const { register } = useAuthContext();
  const { setAlert, showAlert } = useAlertContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === "" || password.trim() === "" || password2.trim() === "") {
      setAlert('danger', 'Please fill out all the fields')
      return;
    }

    if (password !== password2) {
      setAlert('danger', 'Passwords do not match')
      return;
    }
    register();
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
    <Fragment>
      <Header />
      <main className="d-flex align-items-center justify-content-center bg-primary" style={{ minHeight: "100vh" }}>
        <form onSubmit={(e) => { onSubmit(e) }} className="w-100 bg-red px-2" style={{ maxWidth: '500px' }}>
          <h1>Register</h1>

          {showAlert && <Alert />}

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Name</label>
            <input onChange={(e) => onChange(e.target, e.target.value)} value={name} className="form-control" name="name" id="name" type="text" />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input onChange={(e) => onChange(e.target, e.target.value)} value={email} className="form-control" name="email" id="email" type="email" />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e) => onChange(e.target, e.target.value)} value={password} className="form-control" name="password" id="password" type="password" />
          </div>
          <div className="mb-2">
            <label htmlFor="password2" className="form-label">Confirm password</label>
            <input onChange={(e) => onChange(e.target, e.target.value)} value={password2} className="form-control" name="password2" id="password2" type="password" />
          </div>
          <input type="submit" className="btn btn-secondary mt-3" />
        </form>
      </main>
    </Fragment>
  )
}

export default Register
