import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Notifications() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <NotificationsIcon
        onClick={handleOpen}
        style={{ color: "white", marginRight: "1em" }}
      />
      {open && (
        <div className="dropdown">
          <ul>
            <li>Notification 1</li>
            <li>Notification 2</li>
            <li>Notification 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notifications;
