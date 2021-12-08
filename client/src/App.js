import './App.css';
import './Media.css'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import ManageRoles from './pages/ManageRoles';
import AdminOnly from './components/routing/AdminOnly';
import Home from './pages/Home';
import DashboardHome from './components/DashboardHome';
import UserProfile from './pages/UserProfile';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} >
          <Route path="" element={<DashboardHome />} />
          <Route path="projects/*" element={<Projects />} />
          <Route path="manageRoles/*" element={<AdminOnly> <ManageRoles /> </AdminOnly>} />
          <Route path="tickets/*" element={<Tickets />} />
          <Route path="userProfile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
