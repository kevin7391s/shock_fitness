import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/userContext";
import { fetchNotifications } from "@/friendshipUtils/fetchNotifications";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface Notification {
  id: string;
  content: string;
  status: string;
  type: string;
  userId: string;
}

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const currentUser = useContext(UserContext);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchAndSetNotifications = async () => {
      if (currentUser) {
        const userNotifications = await fetchNotifications(currentUser.uid);
        setNotifications(userNotifications);
      }
    };
    fetchAndSetNotifications();
  }, [currentUser]);

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
          {notifications.length === 0 ? (
            <p className="mt-5 ml-5 text-lg text-white">No new notifications</p>
          ) : (
            notifications.map((notification, index) => (
              <p className="mt-5 ml-5 text-lg text-white" key={index}>
                {notification.content}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
