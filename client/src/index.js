import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth/AuthContext';
import { AlertProvider } from './context/alert/AlertContext';
import { UsersProvider } from './context/users/UsersContext';

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode >,
  document.getElementById('root')
);


