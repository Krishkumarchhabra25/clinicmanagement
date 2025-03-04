import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import * as routesKey from "../constants/routes";
import * as pages from "../pages/index";
import RequireAuth from "../auth/ProtectorRouter";
import PublicRoute from "../auth/PublicRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path={routesKey.ADMINLOGIN}
          element={
            <PublicRoute>
              <pages.AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path={routesKey.ADMINCHNAGEPASSWORD}
          element={
            <PublicRoute>
              <pages.AdminChangePassword />
            </PublicRoute>
          }
        />
        <Route
          path={routesKey.RESETPASSWORD}
          element={
            <PublicRoute>
              <pages.ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path={routesKey.DASHBOARD}
          element={
            <RequireAuth>
              <pages.Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.AVAILABILITY}
          element={
            <RequireAuth>
              <pages.Availability />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.APPOINTMENTS}
          element={
            <RequireAuth>
              <pages.Appointments />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.PASSWORDS}
          element={
            <RequireAuth>
              <pages.Password />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.PATIENTRECORD}
          element={
            <RequireAuth>
              <pages.PatientRecord />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.PROFILESETTING}
          element={
            <RequireAuth>
              <pages.ProfileSetting />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.PATIENTRECORDDETAILS}
          element={
            <RequireAuth>
              <pages.PatientRecordDetails />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.RESETPASSWORDAfterLogin}
          element={
            <RequireAuth>
              <pages.ResetPasswordAfterLogin />
            </RequireAuth>
          }
        />
        <Route
          path={routesKey.CHANGESUPPORTPASSWORD}
          element={
            <RequireAuth>
              <pages.SupportChnagePassword />
            </RequireAuth>
          }
        />

        {/* Catch-all Route */}
        <Route
          path="*"
          element={<Navigate to={routesKey.ADMINLOGIN} replace />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;