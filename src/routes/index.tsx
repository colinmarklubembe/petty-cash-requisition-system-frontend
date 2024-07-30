import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  HomePage,
  Dashboard,
  SignupPage,
  LoginPage,
  CompaniesPage,
  PettyFundsPage,
  ApprovalsPage,
  TransactionsPage,
  RequisitionsPage,
} from "../pages";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/requisitions" element={<RequisitionsPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/funds" element={<PettyFundsPage />} />
      <Route path="/approvals" element={<ApprovalsPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
