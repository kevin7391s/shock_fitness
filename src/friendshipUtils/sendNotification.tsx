import { auth, firestore } from "../lib/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const sendNotification = async (
  userId: string,
  type: string,
  content: string
) => {
  const notificationsRef = collection(firestore, "notifications");

  await addDoc(notificationsRef, {
    userId,
    type,
    content,
    status: "unread",
    timestamp: serverTimestamp(),
  });
};
