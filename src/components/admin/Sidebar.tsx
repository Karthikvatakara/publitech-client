import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user/userActions';
import { AppState, RootState } from '../../redux/store';
import toast from 'react-hot-toast';
import { linksConfig } from './linksConfig';
import emptyImage from "../../assets/profiles/emptyUser.png";
import StudentNavbar from '../common/StudentNavbar';

type Role = 'admin' | 'instructor' | 'student';

interface SidebarProps {
  role: Role;
}

const Layout: React.FC<SidebarProps> = ({ role }) => {
  const dispatch = useDispatch<AppState>();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user: any = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully");
  }

  const links = linksConfig[role];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      {role === "student" ? (
        <div className="fixed top-0 left-0 right-0 z-10">
        <StudentNavbar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
      </div>
      ) : (
        <nav className="bg-darkBlue shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10 ">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-200 focus:outline-none mr-4"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="text-xl font-bold text-white">PubliTech Edu</h1>
          </div>
          <div className="flex items-center">
            <button className="text-gray-600 mx-2">
              <FontAwesomeIcon icon={faBell} className='text-white' />
            </button>
            <button className="text-gray-600 mx-2">
              <FontAwesomeIcon icon={faEnvelope} className='text-white'/>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ml-4">
              <img 
                src={user?.user?.profile?.avatar || emptyImage}
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </nav>
      )}

      {/* Main content area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className={`bg-[#300370] text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} shadow-lg fixed left-0 top-16 bottom-0 ${role === 'student' ? '' : 'overflow-y-auto'}`}>
          <nav className="flex-grow py-4 font-bold">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className={`flex items-center py-3 px-4 transition-colors duration-200
                  ${location.pathname === link.to
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <FontAwesomeIcon icon={link.icon} className={`${isCollapsed ? 'text-xl' : 'mr-3'}`} />
                {!isCollapsed && <span className="text-sm">{link.label}</span>}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-opacity-20 border-white">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className={`${isCollapsed ? 'mr-0' : 'mr-2'}`} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className={`flex-1 p-6 overflow-y-auto ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;