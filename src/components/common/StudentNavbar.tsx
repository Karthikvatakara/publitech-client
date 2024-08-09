import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChalkboardTeacher, faBook, faInfoCircle, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import emptyImage from "../../assets/profiles/emptyUser.png";

interface StudentNavbarProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

const StudentNavbar: React.FC<StudentNavbarProps> = ({ toggleSidebar, isCollapsed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user: any = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: "/", icon: faHome, label: "Home" },
    { to: "/apply", icon: faChalkboardTeacher, label: "Apply to Teach" },
    { to: "/courses", icon: faBook, label: "Courses" },
    { to: "/student/about-us", icon: faInfoCircle, label: "About Us" },
  ];

  return (
    <nav className="bg-darkBlue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-white p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="ml-4 text-xl font-bold text-white">PubliTech Edu</h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.to} 
                className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                <img 
                  src={user?.user?.profile?.avatar || emptyImage}
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <span>{user?.user?.name }</span>
              </button>
              <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
                {/* Add more dropdown items here */}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.to} 
                className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-indigo-500">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img 
                  src={user?.user?.profile?.avatar || emptyImage}
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.user?.name || 'Student'}</div>
                <div className="text-sm font-medium text-indigo-300">{user?.user?.email || 'student@example.com'}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link 
                to="/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
              {/* Add more mobile menu items here */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;