import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import ManageRoles from './pages/ManageRoles';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} >
          <Route path="/projects/*" element={<Projects />} />

          <Route path="/manageUsers" element={<ManageRoles />} />
          <Route path="/tickets" element={<Tickets />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
