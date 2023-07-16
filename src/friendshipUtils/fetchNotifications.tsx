import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";

interface Notification {
  id: string;
  content: string;
  status: string;
  type: string;
  userId: string;
  senderId: string;
  receiverId: string;
}

export const fetchNotifications = async (userId: string) => {
  const notificationsRef = collection(firestore, "notifications");
  const q = query(notificationsRef, where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  const notifications: Notification[] = [];
  querySnapshot.forEach((doc) => {
    notifications.push({ ...doc.data(), id: doc.id } as Notification);
  });

  return notifications;
};
