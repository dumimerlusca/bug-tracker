import React, { Fragment } from 'react';
import Header from '../components/Header';

const Login = () => {
  return (
    <Fragment>
      <Header />
      <main className="d-flex align-items-center justify-content-center bg-primary" style={{ minHeight: "100vh" }}>
        <form action="" className="w-100 bg-red px-2" style={{ maxWidth: '500px' }}>
          <h1>Login</h1>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input className="form-control" type="email" />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input className="form-control" type="password" />
          </div>
          <input type="submit" className="btn btn-secondary mt-3" />
        </form>
      </main>
    </Fragment>
  )
}

export default Login
