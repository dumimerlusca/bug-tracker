import React, { Fragment } from 'react';
import Header from '../components/Header';
import Login from '../components/auth/Login';


const LoginPage = () => {

  return (
    <Fragment>
      <main className="">
        <Header />
        <div className="form_container">
          <Login />
        </div>
      </main>
    </Fragment>
  )
}

export default LoginPage
