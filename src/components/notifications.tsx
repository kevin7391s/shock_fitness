import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <NotificationsIcon
          className={`h-6 w-6 cursor-pointer ${
            open ? "text-cyan-400" : "text-black"
          }`}
          onClick={handleOpen}
        />
      </div>
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 h-48 rounded-md shadow-lg bg-gray-800">
          <p className="mt-5 ml-5 text-lg text-white"> No new notifications</p>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
