import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";

// Define the type for props
interface Props {
  senderId: string;
  receiverId: string;
}

const AcceptFriendRequest: React.FC<Props> = ({ senderId, receiverId }) => {
  const handleAccept = async () => {
    // Get references to the friendship document and both user documents
    const friendshipRef = doc(
      firestore,
      "friendships",
      `${senderId}_${receiverId}`
    );
    const senderRef = doc(firestore, "users", senderId);
    const receiverRef = doc(firestore, "users", receiverId);

    // Update the friendship status to 'friends'
    await updateDoc(friendshipRef, { status: "friends" });

    // Update both users to add each other as friends and remove from pending requests
    await updateDoc(senderRef, {
      friends: arrayUnion(receiverId),
      pendingRequests: arrayRemove(receiverId),
    });

    await updateDoc(receiverRef, {
      friends: arrayUnion(senderId),
      pendingRequests: arrayRemove(senderId),
    });

    // Here, delete notification
  };

  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleAccept}
    >
      Accept
    </button>
  );
};

export default AcceptFriendRequest;
