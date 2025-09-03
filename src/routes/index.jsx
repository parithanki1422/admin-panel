import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from "../features/dashboard/DashboardPage";
import ProjectsPage from "../features/dashboard/ProjectsPage";
import EstimatesPage from "../features/dashboard/EstimatesPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPassword";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage /> } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="estimates" element={<EstimatesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
