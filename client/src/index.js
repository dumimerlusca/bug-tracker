import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth/AuthContext';
import { AlertProvider } from './context/alert/AlertContext';
import { UsersProvider } from './context/users/UsersContext';
import { ProjectsProvider } from './context/projects/ProjectsContext';


ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <UsersProvider>
          <ProjectsProvider>
            <App />
          </ProjectsProvider>
        </UsersProvider>
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode >,
  document.getElementById('root')
);


