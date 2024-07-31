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
  SettingsPage,
  UserManagementPage,
  ReportsPage,
  NotFoundPage,
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
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/users" element={<UserManagementPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
