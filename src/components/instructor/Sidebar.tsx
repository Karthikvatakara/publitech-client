import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBook, faClipboard, faUserGraduate, faUser, faCog, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import publitech from "../../assets/publitechwhitelogo.png";

function Sidebar() {
  return (
    <>
      <div className='flex min-h-screen'>
        <div className='w-72 bg-darkBlue text-white items-center py-6'>
          <img src={publitech} alt="Publitech Logo" className='w-48 mb-6 cursor-pointer hover:scale-110 duration-300' />
          <nav className='flex flex-col mt-10 space-y-2 w-full'>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:border-darkBlue hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              Dashboard
            </a>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" /> {/* Instructors icon */}
              Instructors
            </a>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Courses
            </a>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faClipboard} className="mr-2" />
              Assignments
            </a>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
              Students
            </a>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </a>
            <a href="#" className="w-full text-center text-gray-300 flex items-center justify-center px-3 py-2 rounded-md text-md font-bold hover:border-2 hover:scale-90 duration-300 hover:bg-white hover:text-darkBlue">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </a>
          </nav>
        </div>
        
      </div>
    </>
  );
}

export default Sidebar;
