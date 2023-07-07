import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";

interface Notification {
  id: string; // the id of the notification document
  receiver: string; // the id of the user who is to receive this notification
  sender: string; // the id of the user who sent this notification
  type: "friend_request"; // the type of the notification
  status: "pending" | "accepted" | "declined"; // the status of the notification
}

export const fetchNotifications = async (userId: string) => {
  const notificationsRef = collection(firestore, "notifications");
  const q = query(notificationsRef, where("receiver", "==", userId));

  const querySnapshot = await getDocs(q);
  const notifications: Notification[] = [];
  querySnapshot.forEach((doc) => {
    notifications.push({ ...doc.data(), id: doc.id } as Notification);
  });

  return notifications;
};
