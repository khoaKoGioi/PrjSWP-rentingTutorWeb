import React from "react";
import Logo from "../assets/logoNav.png";
import NavListRegister from "./Navigation/NavListRegister.jsx";

import {
  Button,
  Input,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 text-lg text-white font-extrabold"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-2">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center text-lg gap-2 py-2 pr-4 font-extrabold">
          Home
        </ListItem>
      </Typography>

      <Typography
        as="a"
        href="/ClassList"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center text-lg gap-2 py-2 pr-4 font-extrabold">
          Choose your classes
        </ListItem>
      </Typography>

      <NavListMenu />

      <Typography
        as="a"
        href="/login"
        variant="small"
        color="white"
        className="font-medium"
      >
        <ListItem className="flex items-center text-lg gap-2 py-2 pr-4 font-extrabold bg-white">
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent">
            Login
          </span>
        </ListItem>
      </Typography>

      <div>
        <NavListRegister />
      </div>
    </List>
  );
}

export function MegaMenuWithHover() {
  const [openNav, setOpenNav] = React.useState(false);

  const theme = {
    select: {
      styles: {
        base: {
          input: {
            borderWidth: "placeholder-shown:border",
            borderColor:
              "placeholder-shown:border-white placeholder-shown:border-t-white",
            floated: {
              borderWidth: "border focus:border-10", // Adjusted focus border width
              borderColor: "border-t-transparent focus:border-t-transparent",
            },
          },
        },
      },
    },
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="block shadow-md backdrop-saturate-200 backdrop-blur-2xl text-white w-full fixed top-0 left-0 right-0 px-0 py-0 bg-orange-300  z-50">
      <div className="flex items-center justify-between text-white py-2 px-4">
        <a href="/">
          <img className="h-16 min-w-11 ml-6" src={Logo} />
        </a>

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

        <div className="hidden lg:block">
          <NavList />
        </div>
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
        <NavList />
      </Collapse>
    </div>
  );
}
