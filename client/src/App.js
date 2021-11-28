import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthContext from './context/auth/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import ManageUsers from './pages/ManageUsers';

function App() {

  const { loadUser } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute> <Projects /> </PrivateRoute>} />
        <Route path="/manageUsers" element={<PrivateRoute> <ManageUsers /> </PrivateRoute>} />
        <Route path="/tickets" element={<PrivateRoute> <Tickets /> </PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
