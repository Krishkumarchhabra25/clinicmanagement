import * as routesKey from "../../constants/routes"
import { Link, useLocation, useNavigate  } from "react-router-dom";
import PasswordIcon from "../../assets/passwords.svg"
import PatientRecord from "../../assets//patientrecord.svg"
import ProfileSettings from "../../assets/profilesettings.svg"
import AppointmentsIcon from "../../assets//calendar_clock.svg"
import AvailabilityIcon from "../../assets/availability.svg"
import DashboardIcon from "../../assets/dashboard.png"
import { useDispatch, useSelector } from "react-redux";
import {logoutUser} from "../../redux/slices/authSlice"
import LogoutIcon from "../../assets/Nav-Links-Icons.png"; // add an icon for logout if available
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import starIcon from "../../assets/starframe.png"
import useAuth from "../../hooks/useAuth";
import profilephoto from "../../assets/Vector.png"
const Navigation = () => {
  const { admin } = useSelector((state) => state.auth);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Define your menu items and add a "permission" property where needed
  const Adminmenus = [
    { id: 1, title: "Dashboard", link: routesKey.DASHBOARD, icon: DashboardIcon },
    {
      id: 14,
      title: "Patient Record",
      link: routesKey.PATIENTRECORD,
      icon: PatientRecord,
      // Only show if the user has permission to view patients
      permission: admin?.permissions?.patients?.view,
    },
 /*    {
      id: 6,
      title: "Appointments",
      link: routesKey.APPOINTMENTS,
      icon: AppointmentsIcon,
      // Show if the user has permission to create or edit appointments
      permission: admin?.permissions?.appointments?.create || admin?.permissions?.appointments?.edit,
    }, */
    {
      id: 100,
      title: "Availability",
      link: routesKey.AVAILABILITY,
      icon: AvailabilityIcon,
      // Only show if the user can edit availability
      permission: admin?.permissions?.availability?.edit,
    },
    // "Password" and "Profile Setting" are always visible
    /* { id: 15, title: "Password", link: routesKey.PASSWORDS, icon: PasswordIcon }, */
    { id: 16, title: "Profile Setting", link: routesKey.PROFILESETTING, icon: ProfileSettings },
  ];

  // Filter out menu items that require a permission which is false
  const filteredMenus = Adminmenus.filter(
    (menu) => menu.permission === undefined || menu.permission
  );

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("name");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
    window.location.reload(); // Forces a fresh state

  };

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
          src={profilephoto}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-white text-lg font-semibold mt-2">{username}</p>
      <p className="text-white text-sm font-medium">{role}</p>
    </div>

    {/* Menu Items */}
    <div className="flex flex-col flex-grow justify-start items-start w-full py-4">
      {filteredMenus.map((menu) => {
        // Check if the current location matches the menu link
        const isActive = location.pathname === menu.link;
        return (
          <Link
            to={menu.link || "#"}
            key={menu.id}
            className={`flex items-center w-full gap-4 px-4 py-2.5 rounded-lg hover:bg-blue-200 ${
              isActive ? "text-orange-500" : "text-black"
            }`}
          >
            {menu.icon && (
              <img
                src={menu.icon}
                alt={`${menu.title} Icon`}
                className="w-6 h-6"
                // Apply a CSS filter to change the icon color when active
                style={
                  isActive
                    ? {
                        filter:
                          "invert(42%) sepia(100%) saturate(5000%) hue-rotate(10deg) brightness(100%) contrast(101%)",
                      }
                    : {}
                }
              />
            )}
            <p className="text-[18px]" style={{ fontFamily: "Outfit-400" }}>
              {menu.title}
            </p>
            {isActive && (
              <img
                src={starIcon}
                alt="Active star"
                className="w-[48px] h-[18px] ml-auto"
              />
            )}
          </Link>
        );
      })}
    </div>

    {/* Logout Button at the bottom */}
    <div className="mt-auto p-4">
      <button
        onClick={handleLogout}
        className="flex items-center w-full gap-4 px-4 py-2.5 rounded-lg text-black hover:bg-blue-200"
      >
        {LogoutIcon && (
          <img src={LogoutIcon} alt="Logout Icon" className="w-6 h-6" />
        )}
        <p className="text-[18px]" style={{ fontFamily: "Outfit-400" }}>
          Logout
        </p>
      </button>
    </div>
  </div>
  );
};

export default Navigation;