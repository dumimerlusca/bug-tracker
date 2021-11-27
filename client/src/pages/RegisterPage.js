import React, { Fragment } from 'react';
import Header from '../components/Header';
import Register from '../components/auth/Register'


const RegisterPage = () => {

  return (
    <Fragment>
      <Header />
      <main className="d-flex align-items-center justify-content-center bg-primary" style={{ minHeight: "100vh" }}>
        <Register />
      </main>
    </Fragment>
  )
}

export default RegisterPage
