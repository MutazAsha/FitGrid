import React, { useEffect, useState } from "react";
import fit from "../../Images/fit.png";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import classNames from 'classnames';


const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [user, setUser] = useState(null); // Updated initialization
  const [cookie] = useCookies(["token", "role_id"]);
  const [role, setRole] = useState(false);

  useEffect(() => {
    setUser(cookie.user_id);
    setRole(cookie.role_id);
  }, [cookie]);

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  // Add state to track the current active page
const currentPath = window.location.pathname;

// Function to determine if the link is active
const isActive = (path) => {
  return currentPath === path;
};

// Apply the active class conditionally
const getLinkClass = (path) => {
  return `block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive(path) ? 'active-link-class' : ''}`;
};

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-[#f5f5f5]">
      <nav className="max-w-screen h-[6rem] flex flex-wrap items-center justify-between mx-auto p-4 bg-[#f5f5f5]">
        <Link to="/" className="flex items-center ">
          <img src={fit} className="mr-3 h-20" alt="CraftVine Logo" />
        </Link>
        <div class="flex md:order-2">
  {user ? (
    <>
      {role === "trainer" ? (
        <Link to="/AccountTrainers">
          <img
            className="rounded-full h-10 w-10 ml-3 hidden md:block"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile"
          />
        </Link>
      ) : (
        <Link to="/Account">
          <img
            className="rounded-full h-10 w-10 ml-3 hidden md:block"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile"
          />
        </Link>
      )}
    </>
  ) : (
    <Link to="/login">
      <button className="bg-red-700 hover:bg-black rounded-full text-white h-10 px-4 hidden md:block">
        Signin | Signup
      </button>
    </Link>
  )}
</div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="block text-black hover:text-red-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMenuOpened ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
         
          <ul className="flex flex-col   font-medium border border-gray-100 rounded-lg bg-[#f5f5f5] md:flex-row md:space-x-8  md:border-0 md:bg-[#f5f5f5] dark:bg-[#f5f5f5] md:dark:bg-[#f5f5f5] ">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-black bg-[#f5f5f5] rounded md:bg-transparent md:text-black md:p-0 md:dark:text-black text-center"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
  <Link
    to="/about"
    className={classNames(
      'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0',
      'text-gray-900 dark:text-black md:dark:text-black text-center',
      { 'md:hover:text-black dark:hover:text-black': !isActive("/about") },
      { 'md:hover:text-black dark:hover:text-black': isActive("/about") }
    )}
  >
    About
  </Link>
</li>

            <li>
              <Link
                to="/trainers"
                className={classNames(
                  'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0',
                  'text-gray-900 dark:text-black md:dark:text-black text-center',
                  { 'md:hover:text-black dark:hover:text-black': !isActive("/trainers") },
                  { 'md:hover:text-black dark:hover:text-black': isActive("/trainers") }
                )}
              >
                Trainers
              </Link>
            </li>
            <li>
              <Link
                to="/Exercises"
                className={classNames(
                  'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0',
                  'text-gray-900 dark:black md:dark:text-black text-center',
                  { 'md:hover:text-black dark:hover:text-white': !isActive("/Exercises") },
                  { 'md:hover:text-gray-600 dark:hover:text-[#89B9AD]': isActive("/Exercises") }
                )}
              >
                Workout
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={classNames(
                  'block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0',
                  'text-gray-900 dark:text-black md:dark:text-black text-center',
                  { 'md:hover:text-black dark:hover:text-white': !isActive("/contact") },
                  { 'md:hover:text-gray-600 dark:hover:text-[#89B9AD]': isActive("/contact") }
                )}
              >
                Contact
              </Link>
            </li>
            <li>
            <div className="flex justify-center">
            <div className="relative mt-3 md:hidden"></div>
            {(!user || !role) && (
              <Link to="/login" className="md:hidden self-start">
                <button className="bg-red-700 rounded-full text-white h-10 my-3 px-4">
                  Signin | Signup
                </button>
              </Link>
            )}
          </div>
          </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};



export default Navbar;
