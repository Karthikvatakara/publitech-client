import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import { UserEntity } from '../../interface/UserEntity';
import emptyImage from "../../assets/profiles/emptyUser.png";

function SideDrawer() {
  const { user } = useSelector((state: RootState) => state.user)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<UserEntity[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/api/course/usersforChat`, config);
      setUsersList(response?.data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === "") {
      setError("Search field cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/api/course/searchUsers?search=${search}`, config);
      setUsersList(response?.data?.data);
    } catch (error) {
      console.error("Error searching users:", error);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center bg-white w-full p-2 border-b-2">
        <button 
          className="flex items-center text-gray-700 hover:bg-gray-300 px-3 py-2 rounded-md transition duration-300 ease-in-out"
          onClick={toggleDrawer}
        >
          <FaSearch className="mr-2 text-darkBlue text-lg" />
          <span className="hidden sm:inline text-darkBlue font-semibold text-sm md:text-base">Search User</span>
        </button>
      </div>

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-full sm:w-80 md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Search Users</h2>
            <button 
              onClick={toggleDrawer}
              className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSearch} className="flex flex-col pb-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Search by name or email"
                className={`flex-grow border ${error ? 'border-red-500' : 'border-gray-300'} rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-darkBlue`}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (error) setError("");
                }}
              />
              <button 
                type="submit"
                className="bg-darkBlue text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Go
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </form>
          <div className="mt-4 flex-grow overflow-y-auto">
            {loading ? (
              <p className="text-gray-500">Loading users...</p>
            ) : usersList.length > 0 ? (
              usersList.map((user) => (
                <div key={user._id} className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <img 
                    src={typeof user?.profile?.avatar === "string" ? user?.profile?.avatar : emptyImage}
                    // alt={`${user.username}'s avatar`} 
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <span className="text-gray-800 font-medium">{user.username}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}

export default SideDrawer;