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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/requisitions"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE", "EMPLOYEE"]}>
              <RequisitionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE", "EMPLOYEE"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/companies"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "EMPLOYEE"]}
              page="companies"
            >
              <CompaniesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funds"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE", "EMPLOYEE"]}>
              <PettyFundsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE", "EMPLOYEE"]}>
              <TransactionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "FINANCE", "EMPLOYEE"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
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
};

export default AppRoutes;
