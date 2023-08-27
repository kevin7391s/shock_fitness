import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import { useRouter } from "next/router";

function Footer() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const iconStyle = {
    color: "white", // change the color of icons
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="fixed bottom-0 w-full h-20"
      style={{ backgroundColor: "#424242" }}
    >
      <BottomNavigationAction
        style={iconStyle}
        label="Home"
        icon={<HomeIcon />}
        onClick={() => handleNavigation("/home")}
      />
      <BottomNavigationAction
        style={iconStyle}
        label="Search"
        icon={<SearchIcon />}
        onClick={() => handleNavigation("/search")}
      />
      <BottomNavigationAction
        style={iconStyle}
        label="Profile"
        icon={<AccountCircleIcon />}
        onClick={() => handleNavigation("/profile")}
      />
      <BottomNavigationAction
        style={iconStyle}
        label="Friends"
        icon={<GroupIcon />}
        onClick={() => handleNavigation("/friends")}
      />
    </BottomNavigation>
  );
}

export default Footer;
