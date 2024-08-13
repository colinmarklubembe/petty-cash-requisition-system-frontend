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
  UnauthorizedPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../pages";
import { ProtectedRoute } from "../validators";

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
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/approvals"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "FINANCE"]}>
            <ApprovalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "FINANCE"]}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
