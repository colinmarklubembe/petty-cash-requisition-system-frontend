import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Signup from "../pages/SignupPage";
import RequisitionsPage from "../pages/RequisitionsPage";
import Login from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import CompaniesPage from "../pages/CompaniesPage";
import PettyFundsPage from "../pages/PettyFundsPage";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/requisitions" element={<RequisitionsPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/funds" element={<PettyFundsPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
