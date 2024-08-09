import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, RootState } from '../../redux/store';
import { logout } from "../../redux/actions/user/userActions";
import publiTech from "../../assets/publitechwhitelogo.png";
import emptyImage from "../../assets/profiles/emptyUser.png";
import toast from 'react-hot-toast';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppState>();
    const navigate = useNavigate();

    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        dispatch(logout());
        setDropdownOpen(false);
        toast.success("Logout successfully");
    };

    const navigateToStudentDashboard = () => {
        navigate("/student");
        setDropdownOpen(false);
    };

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            if (dropdownOpen && !(e.target as Element).closest('#user-menu-button')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [dropdownOpen]);

    return (
        <nav className="bg-darkBlue">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-32 w-28 " src={publiTech} alt="PubliTech" />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link to="/courses" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Courses</Link>
                                <Link to="/apply" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Teach with us</Link>
                                <Link to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* <button className="p-1 rounded-full text-white hover:text-gray-300 focus:outline-none">
                                <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6">
                                    <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                                </svg>
                            </button>
                            <button className="ml-3 p-1 rounded-full text-white hover:text-gray-300 focus:outline-none">
                                <svg fill="currentColor" viewBox="0 0 16 16" className="h-6 w-6">
                                    <path d="M0 1.5A.5.5 0 01.5 1H2a.5.5 0 01.485.379L2.89 3H14.5a.5.5 0 01.491.592l-1.5 8A.5.5 0 0113 12H4a.5.5 0 01-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 01-.5-.5zM5 12a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-7 1a1 1 0 110 2 1 1 0 010-2zm7 0a1 1 0 110 2 1 1 0 010-2z" />
                                </svg>
                            </button> */}
                            {!user ? (
                                <div className="ml-3 flex items-center">
                                    <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link to="/signup" className="ml-2 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
                                </div>
                            ) : (
                                <div className="ml-3 relative">
                                    <div>
                                        <button
                                            type="button"
                                            className="max-w-xs bg-darkBlue rounded-full flex items-center text-sm focus:outline-none"
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                            onClick={toggleDropdown}
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            {console.log(user?.profile?.avatar)}
                                            <img className="h-8 w-8 rounded-full" src={typeof user?.profile?.avatar === "string" ? user?.profile?.avatar : emptyImage} alt="" />
                                        </button>
                                    </div>
                                    {dropdownOpen && (
                                        <div className=" font-semibold origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="user-menu-item-0" onClick={navigateToStudentDashboard}>Your Profile</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="user-menu-item-2" onClick={handleLogout}>Sign out</a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleNavbar}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/courses" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Courses</Link>
                        <Link to="/apply" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Teach with us</Link>
                        <Link to="/about" className="text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        {user ? (
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={typeof user?.profile?.avatar === "string" ? user?.profile?.avatar : emptyImage} alt="" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-3 px-2 space-y-1">
                                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700">Login</Link>
                                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700">Signup</Link>
                            </div>
                        )}
                        <div className="mt-3 px-2 space-y-1">
                            {user && (
                                <>
                                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700" onClick={navigateToStudentDashboard}>Your Profile</a>
                                    <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700" onClick={handleLogout}>Sign out</a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;