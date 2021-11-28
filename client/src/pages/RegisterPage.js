import React, { Fragment } from 'react';
import Header from '../components/Header';
import Register from '../components/auth/Register'


const RegisterPage = () => {

  return (
    <Fragment>
      <main className="">
        <Header />
        <div className="form_container">
          <Register />
        </div>
      </main>
    </Fragment>
  )
}

export default RegisterPage
