import { auth, firestore } from "../lib/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

// sender and receiver are the userIds of the two users
const addFriend = async (sender: string, receiver: string) => {
  // get reference to the friendship document
  const friendshipRef = doc(firestore, "friendships", `${sender}_${receiver}`);

  // get the friendship document
  const friendshipDoc = await getDoc(friendshipRef);

  if (friendshipDoc.exists()) {
    const status = friendshipDoc.data().status;

    if (status === "friends" || status === "pending") {
      // can't send another friend request
      return;
    }
  }
  // if the code reaches here, it means a friend request can be sent
  // create or update the friendship document to reflect the new status
  await setDoc(friendshipRef, {
    status: "pending",
    sender,
    receiver,
  });
};
