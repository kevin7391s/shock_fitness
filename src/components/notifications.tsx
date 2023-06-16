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
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              role="menuitem"
            >
              Notification 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              role="menuitem"
            >
              Notification 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
              role="menuitem"
            >
              Notification 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
