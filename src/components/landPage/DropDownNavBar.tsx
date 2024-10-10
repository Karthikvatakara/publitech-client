import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user/userActions';
import { AppState } from '../../redux/store';
import {  useNavigate } from 'react-router-dom';
import emptyImage from "../../assets/profiles/emptyUser.png";
import { UserEntity } from '../../interface/UserEntity';

interface Props {
  user: UserEntity; 
}

const AccountMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppState>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  const navigateToStudentDashboard = () => {
    navigate("/student");
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center w-full bg-darkBlue rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
          id="menu-button"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <img
            src={typeof user?.profile?.avatar === "string" ? user?.profile?.avatar : emptyImage}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              console.error('Error loading image:', user?.profile?.avatar);
              e.currentTarget.src = emptyImage; 
            }}
          />
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              className="text-darkBlue font-bold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 duration-300"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={navigateToStudentDashboard}
            >
              Profile
            </button>
            <button
              type="button"
              className="text-darkBlue font-bold block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 duration-300"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;