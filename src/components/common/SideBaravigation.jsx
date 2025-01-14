import * as routesKey from "../../constants/routes"
import { Link  } from "react-router-dom";
import PasswordIcon from "../../assets/passwords.svg"
import PatientRecord from "../../assets//patientrecord.svg"
import ProfileSettings from "../../assets/profilesettings.svg"
import AppointmentsIcon from "../../assets//calendar_clock.svg"
import AvailabilityIcon from "../../assets/availability.svg"
import DashboardIcon from "../../assets/DashboardIcon.svg"

const Navigation = () => {
    let Adminmenus = [
      { id: 1, title: "Dashboard", link: routesKey.DASHBOARD , icon:DashboardIcon  },
      { id: 14, title: " Patient Record", link: routesKey.PATIENTRECORD, icon:PatientRecord  },
      { id: 6, title: " Appointments", link: routesKey.APPOINTMENTS, icon:AppointmentsIcon   },
      { id: 100, title: " Availability", link: routesKey.AVAILABILITY, icon: AvailabilityIcon  },
      { id: 15, title: "Password", link: routesKey.PASSWORDS, icon:PasswordIcon },
      { id: 16, title: "Profile Setting", link: routesKey.PROFILESETTING, icon:ProfileSettings  },
    ];
  
    return (
        <div className="flex flex-col h-[100vh] w-[306px] bg-white">
        {/* Profile Section */}
        <div
          className="flex flex-col justify-center items-center py-6"
          style={{
            background: `linear-gradient(180deg, #FF7B54 0%, #F9AD95 80%, #FED4CA 100%)`,
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img
              src="https://via.placeholder.com/64"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white text-lg font-semibold mt-2">Dr. Random Person</p>
          <p className="text-white text-sm font-medium">Admin</p>
        </div>
      
        {/* Menu Items */}
        <div className="flex flex-col justify-start items-start w-full py-4">
          {Adminmenus.map((menu) => (
            <Link
              to={menu.link || "#"}
              key={menu.id}
              className="flex items-center w-full gap-4 px-4 py-2.5 rounded-lg text-black hover:bg-blue-200"
            >
              <div>
                {menu.icon && <img src={menu.icon} alt={`${menu.title} Icon`} className="w-6 h-6" />}
              </div>
              <p className="text-[18px] " style={{ fontFamily: 'Outfit-400' }}>{menu.title}</p>
            </Link>
          ))}
          
        </div>
      </div>
      
    );
  };
  
  export default Navigation;
  