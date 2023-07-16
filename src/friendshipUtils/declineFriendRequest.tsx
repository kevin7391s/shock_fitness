import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";

interface Props {
  senderId: string;
  receiverId: string;
}

const DeclineFriendRequest: React.FC<Props> = ({ senderId, receiverId }) => {
  const handleDecline = async () => {
    // Get references to the friendship document and the receiver's user document
    const friendshipRef = doc(
      firestore,
      "friendships",
      `${senderId}_${receiverId}`
    );
    const receiverRef = doc(firestore, "users", receiverId);

    // Update the friendship status to 'declined'
    await updateDoc(friendshipRef, { status: "declined" });

    // Update the receiver to remove the sender from pending requests
    await updateDoc(receiverRef, {
      pendingRequests: arrayRemove(senderId),
    });

    //delete the notification document
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleDecline}
    >
      Decline
    </button>
  );
};

export default DeclineFriendRequest;
