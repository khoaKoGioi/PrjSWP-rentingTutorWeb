import React, { useState, useEffect } from "react";
import Logo from "../assets/logoNav.png";
import NavList from "./NavList";
import { Link } from "react-router-dom";
import { Button, Input, Collapse, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function MegaMenuWithHover() {
  const [openNav, setOpenNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true'); // Retrieve login status from localStorage

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Update login state to true
    localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Update login state to false
    localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="block shadow-md backdrop-saturate-200 backdrop-blur-2xl text-white w-full fixed top-0 left-0 right-0 px-0 py-0 bg-orange-300  z-50">
      <div className="flex items-center justify-between text-white py-2 px-4">
        <Link to="/">
          <img className="h-16 min-w-11 ml-6" src={Logo} alt="Logo" />
        </Link>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="blue-gray"
            labelProps={{
              className: "before:content-none after:content-none", // Add your class here for label styling
            }}
            className="pr-20 border-white blue-gray bg-white focus:!border-transparent"
            containerProps={{
              className: "min-w-[500px] border-white",
            }}
          />

          <Button
            size="sm"
            color="blue"
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-800 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none !absolute right-1 top-1 rounded "
          >
            Search
          </Button>
        </div>

        {/* Pass isLoggedIn state to NavList */}
        <NavList isLoggedIn={isLoggedIn} />

        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {/* Pass isLoggedIn state to NavList */}
        <NavList isLoggedIn={isLoggedIn} />
      </Collapse>
    </div>
  );
}

export default MegaMenuWithHover;
