import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth/AuthContext';
import { AlertProvider } from './context/alert/AlertContext';
import { UsersProvider } from './context/users/UsersContext';
import { ProjectsProvider } from './context/projects/ProjectsContext';
import { TicketsProvider } from './context/tickets/TicketsContext'
import { UiProvider } from './context/ui/UiContext';


ReactDOM.render(
  <React.StrictMode>
    <UiProvider>
      <AlertProvider>
        <AuthProvider>
          <UsersProvider>
            <ProjectsProvider>
              <TicketsProvider>
                <App />
              </TicketsProvider>
            </ProjectsProvider>
          </UsersProvider>
        </AuthProvider>
      </AlertProvider>
    </UiProvider>
  </React.StrictMode >,
  document.getElementById('root')
);


