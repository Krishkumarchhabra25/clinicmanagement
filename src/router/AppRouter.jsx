
import {HashRouter as Router,Route,Routes, Navigate} from "react-router-dom"
import * as routesKey from "../constants/routes"
import * as pages from "../pages/index"
import AuthCheck from "../auth/AuthCheck"
import PublicRoute from "../auth/PublicRoute"

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      {/* Public Routes: For non-authenticated users */}
      <Route element={<PublicRoute />}>
        <Route path={routesKey.ADMINLOGIN} element={<pages.AdminLogin />} />
        <Route path={routesKey.ADMINCHNAGEPASSWORD} element={<pages.AdminChangePassword />} />
      </Route>

      {/* Protected Routes: Only accessible when logged in */}
      <Route element={<AuthCheck />}>
        <Route path={routesKey.DASHBOARD} element={<pages.Dashboard />} />
        <Route path={routesKey.AVAILABILITY} element={<pages.Availability />} />
        <Route path={routesKey.APPOINTMENTS} element={<pages.Appointments />} />
        <Route path={routesKey.PASSWORDS} element={<pages.Password />} />
        <Route path={routesKey.PATIENTRECORD} element={<pages.PatientRecord />} />
        <Route path={routesKey.PROFILESETTING} element={<pages.ProfileSetting />} />
        <Route path={routesKey.PATIENTRECORDDETAILS} element={<pages.PatientRecordDetails />} />
      </Route>

      {/* If no route matches, redirect to login */}
      <Route path="*" element={<Navigate to={routesKey.ADMINLOGIN} />} />
    </Routes>
  </Router>
  )
}

export default AppRouter
