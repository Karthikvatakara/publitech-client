import React, { useState } from 'react'
import publiTech from "../../assets/publitechwhitelogo.png"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppState, RootState } from '../../redux/store'
import { logout } from "../../redux/actions/user/userActions"

function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppState>();
    
    const toggleNavbar = () => {
        setIsOpen(!isOpen)
        console.log(isOpen);
    }

    const handleLogout = () => {
        console.log("Logging out");
        dispatch(logout());
    }

    return (
        <>
            <header className='bg-darkBlue lg:flex'>
                <nav className='flex lg:justify-between items-center px-10 h-16 w-full'>
                    <img src={publiTech} alt="" className='w-1/5 ms-0 hover:scale-75 hover:m-2 cursor-pointer duration-300' />

                    <div className={`absolute lg:static top-[64px] bg-darkBlue text-white gap-72 w-full lg:w-auto flex-col items-center left-0 text-lg font-semibold py-2 lg:py-0 ${isOpen ? "block" : "hidden"} lg:flex lg:flex-row lg:justify-between`}>
                        <ul className="flex flex-col items-center gap-8 lg:flex-row">
                            <Link to={"/"}>Home</Link>
                            <li>Courses</li>
                             <Link to={"/apply"}><li>Teach with us</li></Link>
                            <li>About Us</li>
                        </ul>

                        <div className='flex flex-col items-center gap-8 pt-5 pb-4 lg:flex-row'>
                            <svg viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
                                <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                            </svg>
                            <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
                                <path d="M0 1.5A.5.5 0 01.5 1H2a.5.5 0 01.485.379L2.89 3H14.5a.5.5 0 01.491.592l-1.5 8A.5.5 0 0113 12H4a.5.5 0 01-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 01-.5-.5zM5 12a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-7 1a1 1 0 110 2 1 1 0 010-2zm7 0a1 1 0 110 2 1 1 0 010-2z" />
                            </svg>
                            {
                                !user ?
                                    <>
                                        <Link to={"/login"}>login</Link>
                                        <Link to={"/signup"}>signup</Link>
                                    </>
                                    :
                                    <>
                                        <button onClick={handleLogout}>logout</button>
                                    </>
                            }

                        </div>
                    </div>

                    <div className='lg:hidden w-full flex justify-end'>
                        <button onClick={toggleNavbar}>
                            <svg viewBox="0 0 448 512" fill="white" height="2em" width="2em">
                                <path d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
