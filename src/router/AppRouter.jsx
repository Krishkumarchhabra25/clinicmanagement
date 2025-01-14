
import {HashRouter as Router,Route,Routes} from "react-router-dom"
import * as routesKey from "../constants/routes"
import * as pages from "../pages/index"

const AppRouter = () => {
  return (
    <Router>
       <Routes>
       <Route path={routesKey.ADMINLOGIN} element={<pages.AdminLogin />  } />
        <Route path={routesKey.DASHBOARD} element={<pages.Dashboard />} />
        <Route path={routesKey.AVAILABILITY} element={<pages.Availability />} />
        <Route path={routesKey.APPOINTMENTS} element={<pages.Appointments />} />
        <Route path={routesKey.PASSWORDS} element={<pages.Password />} />
        <Route path={routesKey.PATIENTRECORD} element={<pages.PatientRecord />} />
        <Route path={routesKey.PROFILESETTING} element={<pages.ProfileSetting />} />
        <Route path={routesKey.PATIENTRECORDDETAILS} element={<pages.PatientRecordDetails />} />
       
       </Routes>
    
    </Router>
  )
}

export default AppRouter
