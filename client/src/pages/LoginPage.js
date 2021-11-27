import React, { Fragment } from 'react';
import Header from '../components/Header';
import Login from '../components/auth/Login';


const LoginPage = () => {

  return (
    <Fragment>
      <Header />
      <main className="d-flex align-items-center justify-content-center bg-primary" style={{ minHeight: "100vh" }}>
        <Login />
      </main>
    </Fragment>
  )
}

export default LoginPage
