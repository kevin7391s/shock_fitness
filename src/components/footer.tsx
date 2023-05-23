import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Footer() {
  const [value, setValue] = React.useState(0);

  const iconStyle = {
    color: "white", // change the color of icons
  };
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="fixed bottom-0 w-full h-24"
      style={{ backgroundColor: "#424242" }}
    >
      <BottomNavigationAction
        style={iconStyle}
        label="Home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        style={iconStyle}
        label="Search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        style={iconStyle}
        label="Profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

export default Footer;
