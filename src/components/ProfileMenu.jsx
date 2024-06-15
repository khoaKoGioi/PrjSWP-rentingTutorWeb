import React, { useState, useContext } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import AuthContext from "../contexts/JWTAuthContext"; // Import your authentication context

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    action: "logout", // Add action type for logout
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Assuming you have a user object with an avatar property in your AuthContext

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (action) => {
    if (action === "logout") {
      logout(); // Call your logout function here
    }
    closeMenu(); // Always close the menu after handling action
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Typography variant="small" color="gray" className="font-normal">
            Hi, {user ? user.username : "Guest"} {/* Display username */}
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
          {user && user.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="border border-gray-900 p-0.5 h-8 w-8 rounded-full"
            />
          ) : (
            <UserCircleIcon className="h-8 w-8 rounded-full border border-gray-900 p-0.5" />
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, action }, key) => (
          <MenuItem
            key={label}
            onClick={() => handleMenuItemClick(action)}
            className={`flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10`}
          >
            {React.createElement(icon, {
              className: `h-4 w-4`,
              strokeWidth: 2,
            })}
            <Typography
              as="span"
              variant="small"
              className="font-normal"
              color={"inherit"}
            >
              {label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
