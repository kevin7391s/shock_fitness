import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";

export const sendNotification = async (
  senderId: string,
  receiverId: string,
  type: string
) => {
  // fetch the sender's user document
  const senderRef = doc(firestore, "users", senderId);
  const senderDoc = await getDoc(senderRef);

  if (!senderDoc.exists()) {
    throw new Error("Sender not found");
  }

  const senderData = senderDoc.data();

  if (!senderData) {
    throw new Error("Sender data not found");
  }

  const senderUsername = senderData.username;

  // create the notification document
  const notificationRef = doc(collection(firestore, "notifications"));
  await setDoc(notificationRef, {
    userId: receiverId,
    content: `${senderUsername} sent you a friend request.`,
    status: "unread",
    timestamp: new Date(),
    type,
  });
};
