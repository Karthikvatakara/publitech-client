import { FC, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBook,
  faClipboard,
  faUserGraduate,
  faUser,
  faCog,
  faChalkboardTeacher,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import publitech from "../../assets/publitechwhitelogo.png";
import { Link } from "react-router-dom";

const SideNavbarAdmin: FC = () => {
  return (
    <div className="flex flex-col mt-10 space-y-4 w-full">
      <Link
        to="/"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
        <span>Dashboard</span>
      </Link>
      <Link
        to="/instructors"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
        <span>Instructors</span>
      </Link>
      <Link
        to="/courses"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faBook} className="mr-2" />
        <span>Courses</span>
      </Link>
      <Link
        to="/assignments"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faClipboard} className="mr-2" />
        <span>Assignments</span>
      </Link>
      <Link
        to="/students"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
        <span>Students</span>
      </Link>
      <Link
        to="/admin/requests"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
        <span>Requests</span>
      </Link>
      <Link
        to="/profile"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        <span>Profile</span>
      </Link>
      <Link
        to="/settings"
        className="w-full flex flex-row items-center justify-center px-3 py-3 rounded-md text-md font-bold hover:border-2 hover:border-white hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-darkBlue"
      >
        <FontAwesomeIcon icon={faCog} className="mr-2" />
        <span>Settings</span>
      </Link>
    </div>
  );
};

export const SmallDeviceNavbar: FC = () => {
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const toggleSideNavbar = () => {
    setShowSideNavbar(!showSideNavbar);
  };
  return (
    <div className="lg:hidden p-5 shadow-lg z-10 flex items-center justify-between">
      <div className="w-7 flex items-center cursor-pointer opacity-70 hover:opacity-100">
        <img src={publitech} alt="Publitech Logo" />
      </div>
      <div
        className="text-xl text-gray-500 active:text-black"
        onClick={toggleSideNavbar}
      >
        <GiHamburgerMenu />
      </div>

      {showSideNavbar && (
        <div
          className="absolute top-0 left-0 h-screen w-full bg-gray-800 bg-opacity-40"
          onClick={toggleSideNavbar}
        >
          <div
            className="h-full w-fit bg-gray-100 px-5 py-3 flex-shrink-0 border-r border-r-gray-300 shadow-lg pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            <SideNavbarAdmin />
          </div>
        </div>
      )}
    </div>
  );
};
